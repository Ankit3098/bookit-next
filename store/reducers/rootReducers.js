import { combineReducers } from 'redux'
import { allRoomReducer, roomDetailsReducer } from './roomReducer'
import { checkBookingReducer, bookedDatesReducer, bookingsReducer, bookingDetailsReducer } from './bookingReducer'
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
    bookingDetails: bookingDetailsReducer
})

export default reducers