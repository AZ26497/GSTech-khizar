import {
    FORGOT_REQUEST,
    FORGOT_RESPONSE,
    FORGOT_FAILED
} from '../constant'

export const forgetRequest = (phone) => {
    return async dispatch => {
        dispatch({
            type: FORGOT_REQUEST,
            payload: { phone}
        })
    }
}
export const forgetResponse = (response) => {
    return async dispatch => {
        dispatch({
            type: FORGOT_RESPONSE,
            payload: { response }
        })
    }
}

export const forgetError = (error) => {
    return async dispatch => {
        dispatch({
            type: FORGOT_FAILED,
            payload: { error }
        })
    }
}