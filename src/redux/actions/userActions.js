import {  USER_PASSWORD} from '../constants';

export function changePassword(password) {
return {
type: USER_PASSWORD,
payload: password
}
}
