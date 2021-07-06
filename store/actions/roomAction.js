import axios from 'axios'
import absoluteUrl from 'next-absolute-url'
import * as ACTION_TYPE from '../actioTypes/roomTypes'

export const getAllRooms = (req, currentPage = 1, location = '', guest, category) => async (dispatch) => {
    try {
        const { origin } = absoluteUrl(req);
        let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`

        if (guest) link = link.concat(`&guestCapacity=${guest}`)
        if (category) link = link.concat(`&category=${category}`)

        const { data } = await axios.get(link)

        dispatch({
            type: ACTION_TYPE.ALL_ROOMS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ACTION_TYPE.ALL_ROOMS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getRoomDetails = (req, id) => async (dispatch) => {
    try {
        const { origin } = absoluteUrl(req);

        let url;
        if (req) {
            url = `${origin}/api/rooms/${id}`
        } else {
            url = `/api/rooms/${id}`
        }

        const { data } = await axios.get(url)

        dispatch({
            type: ACTION_TYPE.ROOM_DETAILS_SUCCESS,
            payload: data.room
        })


    } catch (error) {
        dispatch({
            type: ACTION_TYPE.ROOM_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }

}

export const newReviews = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: ACTION_TYPE.NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/reviews/`, reviewData, config)

        dispatch({
            type: ACTION_TYPE.NEW_REVIEW_SUCCESS,
            payload: data.success
        })


    } catch (error) {
        dispatch({
            type: ACTION_TYPE.NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }

}

export const deleteRoom = (id) => async (dispatch) => {
    try {
        dispatch({ type: ACTION_TYPE.DELETE_ROOM_REQUEST })

        const { data } = await axios.delete(`/api/rooms/${id}`)

        dispatch({
            type: ACTION_TYPE.DELETE_ROOM_SUCCESS,
            payload: data.success
        })


    } catch (error) {
        dispatch({
            type: ACTION_TYPE.DELETE_ROOM_FAIL,
            payload: error.response.data.message
        })
    }

}

export const newRoom = (roomData) => async (dispatch) => {
    try {
        dispatch({ type: ACTION_TYPE.NEW_ROOM_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/rooms/`, roomData, config)

        dispatch({
            type: ACTION_TYPE.NEW_ROOM_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ACTION_TYPE.NEW_ROOM_FAIL,
            payload: error.response.data.message
        })
    }

}

export const updateRoom = (id, roomData) => async (dispatch) => {
    try {
        dispatch({ type: ACTION_TYPE.UPDATE_ROOM_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/rooms/${id}`, roomData, config)

        dispatch({
            type: ACTION_TYPE.UPDATE_ROOM_SUCCESS,
            payload: data.success
        })


    } catch (error) {
        dispatch({
            type: ACTION_TYPE.UPDATE_ROOM_FAIL,
            payload: error.response.data.message
        })
    }

}

export const checkReviewAvailable = (roomId) => async (dispatch) => {
    try {
        dispatch({ type: ACTION_TYPE.REVIEW_AVAILABLE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.get(`/api/reviews/check_review_availability?roomId=${roomId}`)

        dispatch({
            type: ACTION_TYPE.REVIEW_AVAILABLE_SUCCESS,
            payload: data.isReviewAvailable
        })


    } catch (error) {
        dispatch({
            type: ACTION_TYPE.REVIEW_AVAILABLE_FAIL,
            payload: error.response.data.message
        })
    }

}
// all admin rooms

export const getAdminRooms = () => async (dispatch) => {
    try {
        dispatch({ type: ACTION_TYPE.ADMIN_ROOMS_REQUEST })

        const { data } = await axios.get(`/api/admin/rooms`)

        dispatch({
            type: ACTION_TYPE.ADMIN_ROOMS_SUCCESS,
            payload: data.rooms
        })
    } catch (error) {
        dispatch({
            type: ACTION_TYPE.ADMIN_ROOMS_FAIL,
            payload: error.response.data.message
        })
    }

}

export const getRoomReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: ACTION_TYPE.GET_REVIEWS_REQUEST })

        const { data } = await axios.get(`/api/reviews?id=${id}`)

        dispatch({
            type: ACTION_TYPE.GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {
        dispatch({
            type: ACTION_TYPE.GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const deleteReview = (id, roomId) => async (dispatch) => {
    try {

        dispatch({ type: ACTION_TYPE.DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`/api/reviews?id=${id}&roomId=${roomId}`)

        dispatch({
            type: ACTION_TYPE.DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: ACTION_TYPE.DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

// clear error
export const clearError = () => async (dispatch) => {
    dispatch({
        type: ACTION_TYPE.CLEAR_ERRORS
    })
}