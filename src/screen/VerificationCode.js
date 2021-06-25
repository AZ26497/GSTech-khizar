import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';
import { verifyOTPCall, verifyResendOTP } from '../service/Api'
import Loader from '../service/Loader'
import GradientButton from '../common/GradientButton'
import AsyncStorage from '@react-native-community/async-storage'

const VerificationCode = ({ navigation, route }) => {
    const [disableResendBtn, setResendBtnDisable] = useState(true)
    const [timerCount, setTimer] = useState(60);
    const { screenName } = route.params
    const [loading, setLoading] = useState(false);
    const [otp, setOTP] = useState('');

    useEffect(() => {
        timerFunc()
    }, [navigation]);
    const timerFunc = () => {
        setResendBtnDisable(true)
        setTimer(60);
        let interval = setInterval(() => {
            setTimer((lastTimerCount) => {
                lastTimerCount <= 1 && clearInterval(interval);
                return lastTimerCount - 1;
            });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete

        return () => {
            clearInterval(interval)
        }
    };
    const saveToken=async(token)=>{
        console.log('Ssave Token Called', token)
         await AsyncStorage.setItem('token', JSON.stringify(token))
        }
    const verifyOTPCode = (code, type) => {
        setLoading(true)
        console.log('Code type', type)
        if (type == 'resend') {
            timerFunc()
        }
        var data = {}
        if (type == 'verify') {
            var data = {
                phone: '+923350520050',
                otp: code
            }
        } else {
            data = {
                phone: '+923350520050'
            }
        }

        console.log('service call data', data)
        verifyResendOTP(data, type).then(async (response) => {
            if (response.status === 1) {
                setLoading(false)
                console.log('token', response.data.token)
                saveToken(response.data.token)
                if (type == 'verify') {
                    if (screenName == 'forget') {
                        navigation.navigate('ResetPassword')
                    } else {
                        navigation.navigate('Home')
                    }
                }
            }
            else {
                alert('Invalid OTP')
                console.log('response error', response.status)
            }

        }).catch((error) => {
            alert('Invalid OTP')
            console.log('error', error)
            setLoading(false)

        })

    }


    return (
        <SafeAreaView style={{
            flex: 1, backgroundColor: '#38ef7d'
        }}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#38ef7d', '#11998e']}
                style={{
                    flex: 1,
                }}
            >
                <View style={styles.container}>
                    <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <Text style={{ width: 200, textAlign: 'center', fontSize: 16 }}>A code has been sent to +923343534 via sms</Text>
                        <OTPInputView
                            style={{ width: '60%', height: 130 }}
                            pinCount={4}
                            autoFocusOnLoad
                            keyboardType='number-pad'
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlgihtStyle={styles.underlineStyleHighLighted}
                            placeholderTextColor='black'
                            onCodeFilled={(code => {
                                // navigation.avigate('ResetPassword')
                                // verifyOTPCodne(code, 'verify')
                                setOTP(code)
                                // navigation.navigate('Home')
                            })}
                        />
                        {loading == true ?
                            <Loader />
                            :
                            <GradientButton height={60} width={'80%'} title={'Send'} margin={5} action={() => verifyOTPCode(otp, 'verify')} />
                        }

                        <Text style={{ fontSize: 15, marginTop: 20 }}>{timerCount}</Text>
                        <TouchableOpacity disabled={disableResendBtn} onPress={() => verifyOTPCode('', 'resend')}>
                            <Text style={{ fontSize: 15, color: disableResendBtn ? 'gray' : 'black' }}>Resend OTP</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    underlineStyleBase: {
        width: 50,
        height: 60,
        borderWidth: 1,
        borderBottomWidth: 1,
        color: 'black',
        fontSize: 25
    },

    underlineStyleHighLighted: {
        borderColor: "white",
    },
});

export default VerificationCode;