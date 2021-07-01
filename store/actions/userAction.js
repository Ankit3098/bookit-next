import axios from 'axios'
import * as ACTION_TYPE from '../actioTypes/userTypes'

export const registerUser = (userData) => async (dispatch) => {
    try {

        dispatch({ type: ACTION_TYPE.REGISTER_USER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/auth/register', userData, config)

        dispatch({
            type: ACTION_TYPE.REGISTER_USER_SUCCESS
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: ACTION_TYPE.REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: ACTION_TYPE.LOAD_USER_REQUEST });

        const { data } = await axios.get('/api/me')

        dispatch({
            type: ACTION_TYPE.LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: ACTION_TYPE.LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}