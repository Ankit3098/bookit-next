/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Carousel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import { clearError } from '../../store/actions/roomAction'
import RoomFeatures from './RoomFeatures'

const RoomDetails = () => {

    const dispatch = useDispatch()
    const { room, error } = useSelector(state => state.roomDetails)


    useEffect(() => {

        if (error) {
            toast.error(error)
            dispatch(clearError())
        }
    }, [dispatch, error])

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
                {/* "pricePerNight": 85,
        "internet": true,
        "breakfast": true,
        "airConditioned": true,
        "petsAllowed": true,
        "roomCleaning": false,
        "ratings": 0,
        "numOfReviews": 0,
        "_id": "60d96a3af931be2b3c767070",
        "name": "Downtown Portsmouth Private Getaway! Hot Tub",
        "description": "Absolutely the best location in Portsmouth! Beautifully furnished, this spacious and private home is perfectly suited for taking in all of the must-see sights and historic landmarks that make this vibrant city so unique. Situated near the banks of the Piscataqua River just minutes away from Strawbery Banke Museum, Prescott Park, USS Albacore Museum, Market Square and more!",
        "address": "3747 Parkway Street, Apple Valley, CA, 92307",
        "guestCapacity": 3,
        "numOfBeds": 2,
        "images": [
            {
                "_id": "60d96a3af931be2b3c767071",
                "public_id": "bookit/rooms/4_sju0ql",
                "url": "https://res.cloudinary.com/bookit/image/upload/v1618590765/bookit/rooms/4_sju0ql.jpg"
            }
        ],
        "category": "King",
        "reviews": [], */}
                <div className="row my-5">
                    <div className="col-12 col-md-6 col-lg-8">
                        <h3>Description</h3>
                        <p>{room.description}</p>
                        <RoomFeatures room={room} />
                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="booking-card shadow-lg p-4">
                            <p className='price-per-night'><b>${room.pricePerNight}</b> / night</p>

                            <button className="btn btn-block py-3 booking-btn">Pay</button>

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
