import { combineReducers } from 'redux'
import { allRoomReducer, roomDetailsReducer, newReviewReducer, checkReviewReducer, newRoomReducer, updateRoomReducer, reviewReducer, roomReviewsReducer } from './roomReducer'
import { checkBookingReducer, bookedDatesReducer, bookingsReducer, bookingDetailsReducer, bookingReducer } from './bookingReducer'
import { authReducer, userReducer, forgotPasswordReducer, loadUser, allUsersReducer, userDetailsReducer } from './userReducer'

const reducers = combineReducers({
    allRooms: allRoomReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    loadUser: loadUser,
    userDetails: userDetailsReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer,
    bookings: bookingsReducer,
    bookingDetails: bookingDetailsReducer,
    newReview: newReviewReducer,
    checkReview: checkReviewReducer,
    newRoom: newRoomReducer,
    updateRoom: updateRoomReducer,
    booking: bookingReducer,
    allUsers: allUsersReducer,
    roomReviews: roomReviewsReducer,
    review: reviewReducer,

})

export default reducers