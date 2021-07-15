import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Moment from 'moment'

export const saveToken = async (token) => {
    console.log('Ssave Token Called', token)
    await AsyncStorage.setItem('token', JSON.stringify(token))

}


export const getToken = async () => {
    const token = await AsyncStorage.getItem('token')
    return token;
}


export const getDate = (str) => {
    Moment.locale('en')
    const dateTimeArr = str.split('T')
    var newDate = Moment(dateTimeArr[0]).format('LL');
    console.log('New Date Format', newDate)
    return newDate
}

export const getTime = (str) => {
    const dateTimeArr = str.split('T')
    const timeArray = dateTimeArr[1].split('.')
    console.log('New Time', timeArray[0])

    return timeArray[0]
}

export const calculateTimeDifference = (rideTime) => {
    Moment.locale('en')
    var now = Moment(new Date()).format("HH:mm:ss a");
    console.log('Current Time', now);
    var ms = Moment(rideTime, "HH:mm:ss a").diff(Moment(now, "HH:mm:ss a"));
    var d = Moment.duration(ms);

    console.log('Calculated time difference', d.hours());
    return d.hours()
}

