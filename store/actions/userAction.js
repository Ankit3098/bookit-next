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

export const getAdminUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ACTION_TYPE.ADMIN_USERS_REQUEST });

        const { data } = await axios.get(`/api/admin/users`)

        dispatch({
            type: ACTION_TYPE.ADMIN_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {

        dispatch({
            type: ACTION_TYPE.ADMIN_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ACTION_TYPE.USER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/admin/users/${id}`)

        dispatch({
            type: ACTION_TYPE.USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch (error) {

        dispatch({
            type: ACTION_TYPE.USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: ACTION_TYPE.UPDATE_USER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/admin/users/${id}`, userData, config)

        dispatch({
            type: ACTION_TYPE.UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        dispatch({
            type: ACTION_TYPE.UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: ACTION_TYPE.DELETE_USER_REQUEST });

        const { data } = await axios.delete(`/api/admin/users/${id}`)

        dispatch({
            type: ACTION_TYPE.DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        dispatch({
            type: ACTION_TYPE.DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}
