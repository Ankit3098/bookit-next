import * as ACTION_TYPE from '../actioTypes/roomTypes'

// ALL ROOMS REDUCER
export const allRoomReducer = (state = { rooms: [] }, action) => {
    switch (action.type) {
        case ACTION_TYPE.ADMIN_ROOMS_REQUEST:
            return {
                loading: true
            }
        case ACTION_TYPE.ALL_ROOMS_SUCCESS:
            return {
                roomsCount: action.payload.roomsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredCount: action.payload.filteredCount,
                rooms: action.payload.rooms
            }
        case ACTION_TYPE.ADMIN_ROOMS_SUCCESS:
            return {
                loading: false,
                rooms: action.payload
            }
        case ACTION_TYPE.ALL_ROOMS_FAIL:
        case ACTION_TYPE.ADMIN_ROOMS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ACTION_TYPE.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }

}

export const roomDetailsReducer = (state = { room: {} }, action) => {
    switch (action.type) {

        case ACTION_TYPE.ROOM_DETAILS_SUCCESS:
            return {
                room: action.payload
            }
        case ACTION_TYPE.ROOM_DETAILS_FAIL:
            return {
                error: action.payload
            }
        case ACTION_TYPE.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTION_TYPE.NEW_REVIEW_REQUEST:
            return {
                loading: true
            }

        case ACTION_TYPE.NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case ACTION_TYPE.NEW_REVIEW_RESET:
            return {
                success: false
            }

        case ACTION_TYPE.NEW_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ACTION_TYPE.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const newRoomReducer = (state = { room: {} }, action) => {
    switch (action.type) {
        case ACTION_TYPE.NEW_ROOM_REQUEST:
            return {
                loading: true
            }

        case ACTION_TYPE.NEW_ROOM_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                room: action.payload.room
            }

        case ACTION_TYPE.NEW_ROOM_RESET:
            return {
                success: false
            }

        case ACTION_TYPE.NEW_ROOM_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ACTION_TYPE.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const updateRoomReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTION_TYPE.UPDATE_ROOM_REQUEST:
        case ACTION_TYPE.DELETE_ROOM_REQUEST:
            return {
                loading: true
            }

        case ACTION_TYPE.UPDATE_ROOM_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }
        case ACTION_TYPE.DELETE_ROOM_SUCCESS:
            return {
                loading: false,
                isDelete: action.payload
            }

        case ACTION_TYPE.UPDATE_ROOM_RESET:
            return {
                isUpdated: false,
            }
        case ACTION_TYPE.UPDATE_ROOM_RESET:
            return {
                loading: false,
                isDelete: false
            }

        case ACTION_TYPE.UPDATE_ROOM_FAIL:
        case ACTION_TYPE.DELETE_ROOM_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ACTION_TYPE.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const checkReviewReducer = (state = { reviewAvilable: null }, action) => {
    switch (action.type) {
        case ACTION_TYPE.REVIEW_AVAILABLE_REQUEST:
            return {
                loading: true
            }

        case ACTION_TYPE.REVIEW_AVAILABLE_SUCCESS:
            return {
                loading: false,
                reviewAvilable: action.payload
            }

        case ACTION_TYPE.REVIEW_AVAILABLE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ACTION_TYPE.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

