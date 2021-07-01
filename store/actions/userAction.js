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

export const updateProfileUser = (userData) => async (dispatch) => {
    try {

        dispatch({ type: ACTION_TYPE.UPDATE_PROFILE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/me/update', userData, config)

        dispatch({
            type: ACTION_TYPE.UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: ACTION_TYPE.UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: ACTION_TYPE.FORGOT_PASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/password/forgot', email, config)

        dispatch({
            type: ACTION_TYPE.FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: ACTION_TYPE.FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: ACTION_TYPE.RESET_PASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/password/reset/${token}`, passwords, config)

        dispatch({
            type: ACTION_TYPE.RESET_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: ACTION_TYPE.RESET_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}
