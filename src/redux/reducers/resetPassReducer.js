import {
    RESET_REQUEST,
    RESET_RESPONSE,
    RESET_FAILED,
    RESET_CHANGE_STATE,
} from '../actions/resetPassActions'

const INITIAL_STATE = {
    loading: false,
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case RESET_CHANGE_STATE:
            return { ...state, ...action.payload };
        case RESET_REQUEST:
            return { ...state, loading: true };
        case RESET_RESPONSE:
            return { ...state, response: action.payload.response, loading: false };
        case RESET_FAILED:
            return { ...state, error: action.payload.error, loading: false };
        default:
            return state;
    }
}