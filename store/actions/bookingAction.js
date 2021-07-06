import axios from 'axios'
import * as ACTION_TYPE from '../actioTypes/bookingTypes'
import absoluteUrl from 'next-absolute-url'


export const checkBooking = (roomId, checkInDate, checkOutDate) => async (dispatch) => {
    try {

        dispatch({ type: ACTION_TYPE.CHECK_BOOKING_REQUEST });

        let link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`

        const { data } = await axios.get(link)

        dispatch({
            type: ACTION_TYPE.CHECK_BOOKING_SUCCESS,
            payload: data.isAvailable
        })

    } catch (error) {
        dispatch({
            type: ACTION_TYPE.CHECK_BOOKING_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getBookedDates = (roomId) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/bookings/check_booked_dates?roomId=${roomId}`)

        dispatch({
            type: ACTION_TYPE.BOOKED_DATES_SUCCESS,
            payload: data.bookedDates
        })

    } catch (error) {
        dispatch({
            type: ACTION_TYPE.BOOKED_DATES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const myBookings = (authCookie, req) => async (dispatch) => {
    try {

        const config = {
            headers: {
                cookie: authCookie
            }
        }
        const { origin } = absoluteUrl(req);

        const { data } = await axios.get(`${origin}/api/bookings/me`, config)

        dispatch({
            type: ACTION_TYPE.MY_BOOKINGS_SUCCESS,
            payload: data.bookings
        })

    } catch (error) {
        dispatch({
            type: ACTION_TYPE.MY_BOOKINGS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminBookings = () => async (dispatch) => {
    try {
        dispatch({ type: ACTION_TYPE.ADMIN_BOOKING_REQUEST })

        const { data } = await axios.get(`/api/admin/bookings`)

        dispatch({
            type: ACTION_TYPE.ADMIN_BOOKING_SUCCESS,
            payload: data.bookings
        })

    } catch (error) {
        dispatch({
            type: ACTION_TYPE.ADMIN_BOOKING_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteBooking = (id) => async (dispatch) => {
    try {
        dispatch({ type: ACTION_TYPE.DELETE_BOOKING_REQUEST })

        const { data } = await axios.delete(`/api/admin/bookings/${id}`)

        dispatch({
            type: ACTION_TYPE.DELETE_BOOKING_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: ACTION_TYPE.DELETE_BOOKING_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getBookingDetails = (authCookie, req, id) => async (dispatch) => {
    try {

        const config = {
            headers: {
                cookie: authCookie
            }
        }
        const { origin } = absoluteUrl(req);

        const { data } = await axios.get(`${origin}/api/bookings/${id}`, config)

        dispatch({
            type: ACTION_TYPE.BOOKING_DETAIL_SUCCESS,
            payload: data.booking
        })

    } catch (error) {
        dispatch({
            type: ACTION_TYPE.BOOKING_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}





































































































