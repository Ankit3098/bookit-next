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
import getStripe from '../../utils/getStripe'
import NewReview from '../review/NewReview'
import ListReview from '../review/ListReview'

const RoomDetails = () => {

    const [checkInDate, setCheckInDate] = useState()
    const [checkOutDate, setCheckOutDate] = useState()
    const [daysOfStay, setDaysOfStay] = useState()
    const [paymentLoading, setPaymentLoading] = useState(false)

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

        return () => {
            dispatch({ type: CHECK_BOOKING_RESET })
        }
    }, [dispatch, error, id])


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

    const bookRoom = async (id, pricePerNight) => {

        setPaymentLoading(true);

        const amount = pricePerNight * daysOfStay;


        try {

            const link = `/api/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`

            const { data } = await axios.get(link, { params: { amount } })

            const stripe = await getStripe();

            // Redirect to checkout
            stripe.redirectToCheckout({ sessionId: data.session.id })

            setPaymentLoading(false);

        } catch (error) {
            setPaymentLoading(false);
            toast.error(error.message)
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
                                <button onClick={() => bookRoom(room._id, room.pricePerNight)} disabled={bookiLoading || paymentLoading ? true : false} className="btn btn-block py-3 booking-btn">Pay - ${daysOfStay * room.pricePerNight}</button>
                            }


                        </div>
                    </div>
                </div>

                <NewReview />

                {room.reviews && room.reviews.length > 0 ?
                    <ListReview reviews={room.reviews} /> :
                    <p><b>No Reviews.</b></p>
                }
            </div>




        </>
    )
}

export default RoomDetails
