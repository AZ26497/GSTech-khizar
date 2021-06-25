import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage'


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
            console.log('API', 'requestLogin-response.status', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'requestPost-error', error);
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
            console.log('API', 'requestLogin-response.status', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'requestPost-error', error);
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
            console.log('API', 'requestLogin-response.status', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'requestPost-error', error);
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
            console.log('API', 'requestLogin-response.status', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'requestPost-error', error);
            reject(error);
        });
    });
}


const getToken=async()=> {
        const token = await AsyncStorage.getItem('token')
        console.log('Token ', JSON.parse(token))
        return token;
}
export const getScheduledRideList = () => {
    console.log('Get List')
    const AUTH_TOKEN = getToken()
    console.log("Token",AUTH_TOKEN);
    return new Promise((resolve, reject) => {
        var qs = require('qs');
        axios.get(('http://162.0.236.163:8000/schedule'), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM2NTdlZjk2M2U3Nzk4NDI0Y2JkY2QiLCJwaG9uZSI6Iis5MjMzNTA1MjAwNTAiLCJpYXQiOjE2MjQ1MjA5NjIsImV4cCI6MTYyNDUzODk2Mn0.4lfcEC7Dym8VdSuzBx--CU7RKHxgLOeObY7f1CS98bk',
            },
        }).then(response => {
            console.log('API', 'requestLogin-response.status', response);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'requestPost-error', error);
            reject(error);
        });
    });
}