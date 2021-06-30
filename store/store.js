import { createStore, applyMiddleware } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import rootReducers from './reducers/rootReducers'

const bindMiddlware = (middlware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middlware))
    }

    return applyMiddleware(...middlware)
}

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }
        return nextState
    } else {
        return rootReducers(state, action)
    }
}

const initStore = () => {
    return createStore(reducer, bindMiddlware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore)