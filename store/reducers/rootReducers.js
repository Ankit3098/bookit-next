import { combineReducers } from 'redux'
import { allRoomReducer, roomDetailsReducer } from './roomReducer'
import { authReducer, userReducer, forgotPasswordReducer } from './userReducer'

const reducers = combineReducers({
    allRooms: allRoomReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer
})

export default reducers