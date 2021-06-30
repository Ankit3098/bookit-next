import axios from 'axios'
import absoluteUrl from 'next-absolute-url'
import * as ACTION_TYPE from '../actioTypes/roomTypes'

export const getAllRooms = (req, currentPage = 1, location = '', guest, category) => async (dispatch) => {
    try {
        const { origin } = absoluteUrl(req);
        let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`

        if (guest) link = link.concat(`&guestCapacity=${guest}`)
        if (category) link = link.concat(`&category=${category}`)

        const { data } = await axios.get(link)

        dispatch({
            type: ACTION_TYPE.ALL_ROOMS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ACTION_TYPE.ALL_ROOMS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getRoomDetails = (req, id) => async (dispatch) => {
    try {
        const { origin } = absoluteUrl(req);

        const { data } = await axios.get(`${origin}/api/rooms/${id}`)

        dispatch({
            type: ACTION_TYPE.ROOM_DETAILS_SUCCESS,
            payload: data.room
        })


    } catch (error) {
        dispatch({
            type: ACTION_TYPE.ROOM_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }

}

// clear error
export const clearError = () => async (dispatch) => {
    dispatch({
        type: ACTION_TYPE.CLEAR_ERRORS
    })
}