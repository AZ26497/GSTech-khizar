import {
    SIGNIN_REQUEST,
    SIGNIN_RESPONSE,
    SIGNIN_FAILED,
} from '../constant/index'

export const signInRequets = (phone, password,token) => {
    return async dispatch => {
        dispatch({
            type: SIGNIN_REQUEST,
            payload: { phone, password,token }
        })
    }
}
export const signInResponse = (response) => {
    return async dispatch => {
        dispatch({
            type: SIGNIN_RESPONSE,
            payload: { response }
        })
    }
}

export const signInError = (error) => {
    return async dispatch => {
        dispatch({
            type: SIGNIN_FAILED,
            payload: { error }
        })
    }
}