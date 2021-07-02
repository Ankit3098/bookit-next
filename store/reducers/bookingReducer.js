import * as ACTION_TYPES from '../actioTypes/bookingTypes'
import { CLEAR_ERRORS } from '../actioTypes/roomTypes'

export const checkBookingReducer = (state = { avaibale: null }, action) => {
    switch (action.type) {
        case ACTION_TYPES.CHECK_BOOKING_REQUEST:
            return {
                loading: true
            }
        case ACTION_TYPES.CHECK_BOOKING_SUCCESS:
            return {
                loading: false,
                avaibale: action.payload
            }
        case ACTION_TYPES.CHECK_BOOKING_RESET:
            return {
                loading: false,
                avaibale: null
            }
        case ACTION_TYPES.CHECK_BOOKING_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const bookedDatesReducer = (state = { dates: [] }, action) => {
    switch (action.type) {
        case ACTION_TYPES.BOOKED_DATES_SUCCESS:
            return {
                loading: false,
                dates: action.payload
            }
        case ACTION_TYPES.BOOKED_DATES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const bookingsReducer = (state = { bookings: [] }, action) => {
    switch (action.type) {
        case ACTION_TYPES.MY_BOOKINGS_SUCCESS:
            return {
                loading: false,
                bookings: action.payload
            }
        case ACTION_TYPES.MY_BOOKINGS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const bookingDetailsReducer = (state = { booking: {} }, action) => {
    switch (action.type) {
        case ACTION_TYPES.BOOKING_DETAIL_SUCCESS:
            return {
                loading: false,
                booking: action.payload
            }
        case ACTION_TYPES.BOOKING_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}