import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import ButtonLoader from '../Layout/ButtonLoader'
import Loader from '../Layout/Loader'
import { clearError } from '../../store/actions/roomAction'
import { newReviews, checkReviewAvailable } from '../../store/actions/roomAction'
import { NEW_REVIEW_RESET } from '../../store/actioTypes/roomTypes'
import { useRouter } from 'next/router'

const NewReview = () => {

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const router = useRouter()
    // newReview
    const { success, error, loading } = useSelector(state => state.newReview)
    const { reviewAvilable } = useSelector(state => state.checkReview)

    const { id } = router.query

    useEffect(() => {
        if (id !== undefined) {
            dispatch(checkReviewAvailable(id))
        }
        if (error) {
            toast.error(error)
            dispatch(clearError())
        }

        if (success) {
            toast.success("Review is posted")
            dispatch({ type: NEW_REVIEW_RESET })
            router.push(`/room/${id}`)
        }
    }, [dispatch, success, error, id])

    const submitHandler = () => {
        const reviewData = {
            rating, comment, roomId: id
        }

        dispatch(newReviews(reviewData))
    }

    function setUserRatings() {

        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings)
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('red')

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('red')
                    }

                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('light-red')

                    } else {
                        star.classList.remove('light-red')
                    }

                }

                if (e.type === 'mouseout') {
                    star.classList.remove('light-red')
                }

            })
        }

    }
    return (
        <>
            {reviewAvilable &&
                <button
                    id="review_btn"
                    type="button"
                    className="btn btn-primary mt-4 mb-5"
                    data-toggle="modal"
                    data-target="#ratingModal"
                    onClick={setUserRatings}
                >
                    Submit Your Review
                </button>
            }

            <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">

                            <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>

                        </div>
                        <div className="modal-body">
                            <ul className="stars">
                                <li className="star"><i className="fa fa-star"></i></li>
                                <li className="star"><i className="fa fa-star"></i></li>
                                <li className="star"><i className="fa fa-star"></i></li>
                                <li className="star"><i className="fa fa-star"></i></li>
                                <li className="star"><i className="fa fa-star"></i></li>
                            </ul>

                            <textarea name="review" id="review" className="form-control mt-3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>

                            <button
                                className="btn my-3 float-right review-btn px-4 text-white"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={submitHandler}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewReview
