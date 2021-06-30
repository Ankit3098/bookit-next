import * as ACTION_TYPE from '../actioTypes/roomTypes'

// ALL ROOMS REDUCER
export const allRoomReducer = (state = { rooms: [] }, action) => {
    switch (action.type) {
        case ACTION_TYPE.ALL_ROOMS_SUCCESS:
            return {
                roomsCount: action.payload.roomsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredCount: action.payload.filteredCount,
                rooms: action.payload.rooms
            }
        case ACTION_TYPE.ALL_ROOMS_FAIL:
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