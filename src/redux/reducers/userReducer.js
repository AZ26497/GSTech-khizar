import { USER_PASSWORD, USER_PHONE_NUMBER } from '../constants/index';
const INITIAL_STATE = {
    phoneNumber: '',
    password: '',
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_PASSWORD:
            return {
                ...state,
                password: action.payload
            };
        case USER_PHONE_NUMBER:
            return {
                ...state,
                phoneNumber: action.payload
            };
        default:
            return state;
    }
}
export default userReducer;