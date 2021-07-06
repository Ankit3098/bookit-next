import * as ACTION_TYPES from '../actioTypes/userTypes'
import { CLEAR_ERRORS } from '../actioTypes/roomTypes'

export const authReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case ACTION_TYPES.REGISTER_USER_REQUEST:
            return {
                loading: true
            }
        case ACTION_TYPES.REGISTER_USER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ACTION_TYPES.REGISTER_USER_FAIL:
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

export const loadUser = (state = { loading: true, user: null }, action) => {
    switch (action.type) {

        case ACTION_TYPES.LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case ACTION_TYPES.LOAD_USER_SUCCESS:
            return {
                loading: false,
                success: true,
                isAuthenticated: true,
                user: action.payload
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

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTION_TYPES.UPDATE_PROFILE_REQUEST:
        case ACTION_TYPES.UPDATE_USER_REQUEST:
        case ACTION_TYPES.DELETE_USER_REQUEST:
            return {
                loading: true
            }
        case ACTION_TYPES.UPDATE_PROFILE_SUCCESS:
        case ACTION_TYPES.UPDATE_USER_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }
        case ACTION_TYPES.DELETE_USER_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case ACTION_TYPES.UPDATE_PROFILE_RESET:
        case ACTION_TYPES.UPDATE_USER_RESET:
            return {
                loading: false,
                isUpdated: false
            }
        case ACTION_TYPES.DELETE_USER_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case ACTION_TYPES.UPDATE_PROFILE_FAIL:
        case ACTION_TYPES.UPDATE_USER_FAIL:
        case ACTION_TYPES.DELETE_USER_FAIL:
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

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTION_TYPES.FORGOT_PASSWORD_REQUEST:
        case ACTION_TYPES.REGISTER_USER_REQUEST:
            return {
                loading: true
            }
        case ACTION_TYPES.FORGOT_PASSWORD_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }
        case ACTION_TYPES.RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case ACTION_TYPES.FORGOT_PASSWORD_FAIL:
        case ACTION_TYPES.RESET_PASSWORD_FAIL:
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

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {

        case ACTION_TYPES.ADMIN_USERS_REQUEST:
            return {
                loading: true,
            }

        case ACTION_TYPES.ADMIN_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }

        case ACTION_TYPES.ADMIN_USERS_FAIL:
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

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case ACTION_TYPES.USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ACTION_TYPES.USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }

        case ACTION_TYPES.USER_DETAILS_FAIL:
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