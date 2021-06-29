import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage'
import {getToken} from '../common/Index'

const BASE_URL = 'http://162.0.236.163:8000/auth/' //service URL

export const requestLogin = (data) => {
    return new Promise((resolve, reject) => {
        var qs = require('qs');
        var data1 = qs.stringify(
            data
        );
        axios.post((BASE_URL + 'login'),
            data1, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },

        }).then(response => {
            console.log('API', 'request Login status', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'request Login error', error);
            reject(error);
        });
    });
}

export const verifyResendOTP = (data, callType) => {
    return new Promise((resolve, reject) => {
        var qs = require('qs');
        var data1 = qs.stringify(
            data
        );
        const methodName = (callType === 'verify' ? 'verify-otp' : 'resend-verify-otp')
        axios.post((BASE_URL + methodName),
            data1, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },

        }).then(response => {
            console.log('API', 'verify/Resend OTP status', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'verify/Resend OTP error', error);
            reject(error);
        });
    });
}


export const sendOTPCall = (data) => {
    return new Promise((resolve, reject) => {
        var qs = require('qs');
        var data1 = qs.stringify(
            data
        );
        axios.post((BASE_URL + 'forgot'),
            data1, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(response => {
            console.log('API', 'send OTP status', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'send OTP error', error);
            reject(error);
        });
    });
}



export const resetPasswordCall = (data) => {
    return new Promise((resolve, reject) => {
        var qs = require('qs');
        var data1 = qs.stringify(
            data
        );
        axios.post((BASE_URL + 'reset'),
            data1, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(response => {
            console.log('API', 'Reset Password status', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'Reset Password error', error);
            reject(error);
        });
    });
}

export const getScheduledRideList = async () => {
    console.log('Get List')
    const AUTH_TOKEN = await getToken()
    const newOne = 'Bearer '+JSON.parse(AUTH_TOKEN)
    console.log("Token of api calling",newOne);
    return new Promise((resolve, reject) => {
        var qs = require('qs');
        axios.get(('http://162.0.236.163:8000/schedule'), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': newOne,
            },
        }).then(response => {
            console.log('API', 'Get Scheduled Ride list ', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'Get Scheduled Ride list error', error);
            reject(error);
        });
    });
}

export const deleteScheduledRideCall = async (itemID) => {
    console.log('Get List')
    const AUTH_TOKEN = await getToken()
    const newOne = 'Bearer '+JSON.parse(AUTH_TOKEN)
    console.log("Token of api calling",newOne);
    return new Promise((resolve, reject) => {
        var qs = require('qs');
        axios.delete(('http://162.0.236.163:8000/schedule/'+itemID), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': newOne,
            },
        }).then(response => {
            console.log('API', 'Delete scheduled ride response', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'Delete scheduled ride error', error);
            reject(error);
        });
    });
}


export const getScheduleRideDetails = async (itemID) => {
    console.log('Get List')
    const AUTH_TOKEN = await getToken()
    const newOne = 'Bearer '+JSON.parse(AUTH_TOKEN)
    console.log("Token of api calling",newOne);
    return new Promise((resolve, reject) => {
        var qs = require('qs');
        axios.get(('http://162.0.236.163:8000/schedule/'+itemID), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': newOne,
            },
        }).then(response => {
            console.log('API', 'SCHEDULED RIDE DETAILS RESPONSE', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'SCHEDULED RIDE DETAILS Error', error);
            reject(error);
        });
    });
}