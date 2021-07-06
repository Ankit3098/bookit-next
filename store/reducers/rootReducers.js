import { combineReducers } from 'redux'
import { allRoomReducer, roomDetailsReducer, newReviewReducer, checkReviewReducer, newRoomReducer, updateRoomReducer } from './roomReducer'
import { checkBookingReducer, bookedDatesReducer, bookingsReducer, bookingDetailsReducer, bookingReducer } from './bookingReducer'
import { authReducer, userReducer, forgotPasswordReducer, loadUser } from './userReducer'

const reducers = combineReducers({
    allRooms: allRoomReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    loadUser: loadUser,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer,
    bookings: bookingsReducer,
    bookingDetails: bookingDetailsReducer,
    newReview: newReviewReducer,
    checkReview: checkReviewReducer,
    newRoom: newRoomReducer,
    updateRoom: updateRoomReducer,
    booking: bookingReducer

})

export default reducers