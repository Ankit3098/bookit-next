import * as ACTION_TYPES from '../actioTypes/userTypes'
import { CLEAR_ERRORS } from '../actioTypes/roomTypes'

export const authReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case ACTION_TYPES.REGISTER_USER_REQUEST:
            return {
                loading: true
            }
        case ACTION_TYPES.LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case ACTION_TYPES.REGISTER_USER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ACTION_TYPES.LOAD_USER_SUCCESS:
            return {
                loading: false,
                success: true,
                isAuthenticated: true,
                user: action.payload
            }
        case ACTION_TYPES.REGISTER_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ACTION_TYPES.LOAD_USER_FAIL:
            return {
                loading: false,
                error: action.payload,
                isAuthenticated: false
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