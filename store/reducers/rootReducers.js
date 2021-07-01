import { combineReducers } from 'redux'
import { allRoomReducer, roomDetailsReducer } from './roomReducer'
import { authReducer } from './userReducer'

const reducers = combineReducers({
    allRooms: allRoomReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer
})

export default reducers