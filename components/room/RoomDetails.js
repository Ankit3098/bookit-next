/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Carousel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

import { clearError } from '../../store/actions/roomAction'
import { checkBooking, getBookedDates } from '../../store/actions/bookingAction'
import { CHECK_BOOKING_RESET } from '../../store/actioTypes/bookingTypes'
import RoomFeatures from './RoomFeatures'

const RoomDetails = () => {

    const [checkInDate, setCheckInDate] = useState()
    const [checkOutDate, setCheckOutDate] = useState()
    const [daysOfStay, setDaysOfStay] = useState()

    const dispatch = useDispatch()
    const router = useRouter()
    const { room, error } = useSelector(state => state.roomDetails)
    const { dates } = useSelector(state => state.bookedDates)
    const { user } = useSelector(state => state.loadUser)
    const { avaibale, loading: bookiLoading } = useSelector(state => state.checkBooking)

    const excludedDates = []
    dates.forEach(date => {
        excludedDates.push(new Date(date))
    })

    const { id } = router.query

    useEffect(() => {
        dispatch(getBookedDates(id))
        if (error) {
            toast.error(error)
            dispatch(clearError())
        }
    }, [dispatch, error])

    const newBookingHandler = async () => {
        const bookingData = {
            room: router.query.id,
            checkInDate,
            checkOutDate,
            daysOfStay,
            amountPaid: 98,
            paymentInfo: {
                id: "STRIPE_PAYMENT_ID",
                status: "STRIPE_PAYMENT_STATUS"
            }
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = axios.post('/api/bookings', bookingData, config)
        } catch (error) {
            console.log(error.response);
        }
    }

    const onChange = (dates) => {
        const [checkInDate, checkOutDate] = dates

        setCheckInDate(checkInDate)
        setCheckOutDate(checkOutDate)

        if (checkInDate && checkOutDate) {
            const days = Math.floor(((new Date(checkOutDate) - new Date(checkInDate)) / 86400000) + 1)
            setDaysOfStay(days)
            dispatch(checkBooking(id, checkInDate.toISOString(), checkOutDate.toISOString()))

        }


    }

    return (
        <>
            <Head>
                <title>{room.name} - BookIT</title>
            </Head>
            <div className="container container-fluid">
                <h2 className='mt-5'>{room.name}</h2>
                <p>{room.address}</p>
                <div className="ratings mt-auto mb-3">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(room.ratings / 5) * 100}%` }}></div>
                    </div>
                    <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
                </div>

                <Carousel hover='pause'>
                    {
                        room.images && room.images.length > 0 && room.images.map(image => (
                            <Carousel.Item key={image.public_id}>
                                <div style={{ width: "100%", height: "440px" }} >
                                    <Image
                                        className='d-block m-auto'
                                        src={image.url}
                                        alt={room.name}
                                        layout='fill'
                                    />
                                </div>
                            </Carousel.Item>
                        ))
                    }
                </Carousel>
                <div className="row my-5">
                    <div className="col-12 col-md-6 col-lg-8">
                        <h3>Description</h3>
                        <p>{room.description}</p>
                        <RoomFeatures room={room} />
                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="booking-card shadow-lg p-4">
                            <p className='price-per-night'><b>${room.pricePerNight}</b> / night</p>
                            <hr />
                            <p className="mt-5 mb-3">
                                Pick Check IN & check Out Date
                                </p>
                            <DatePicker
                                className='w-100'
                                selected={checkInDate}
                                onChange={onChange}
                                startDate={checkInDate}
                                endDate={checkOutDate}
                                minDate={Date.now()}
                                excludeDates={excludedDates}
                                selectsRange
                                inline
                            />
                            {avaibale === true &&
                                <div className="alert alert-success my-3 font-weight-bold">Room is Available. book now</div>
                            }

                            {avaibale === false &&
                                <div className="alert alert-danger my-3 font-weight-bold">Room is not Available. Try different dates.</div>
                            }

                            {avaibale && !user &&
                                <div className="alert alert-danger my-3 font-weight-bold">Login to book room.</div>
                            }
                            {avaibale && user &&
                                <button onClick={newBookingHandler} className="btn btn-block py-3 booking-btn">Pay</button>
                            }


                        </div>
                    </div>
                </div>


                <div className="reviews w-75">
                    <h3>Reviews:</h3>
                    <hr />
                    <div className="review-card my-3">
                        <div className="rating-outer">
                            <div className="rating-inner"></div>
                        </div>
                        <p className="review_user">by John</p>
                        <p className="review_comment">Good Quality</p>

                        <hr />
                    </div>

                    <div className="review-card my-3">
                        <div className="rating-outer">
                            <div className="rating-inner"></div>
                        </div>
                        <p className="review_user">by John</p>
                        <p className="review_comment">Good Quality</p>

                        <hr />
                    </div>
                </div>
            </div>




        </>
    )
}

export default RoomDetails
