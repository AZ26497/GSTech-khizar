import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';


const VerificationCode = ({navigation}) => {

    return (
        <LinearGradient
            // Background Linear Gradient
            colors={['#38ef7d', '#11998e']}
            style={{
                flex: 1,
            }}
        >
            <View style={styles.container}>
                <Text style={{ marginTop: 30, fontSize: 20, fontWeight: 'bold' }}>Verify Code</Text>
                <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ width: 200, textAlign: 'center', fontSize: 14 }}>A code has been sent to +923343534 via sms</Text>
                    <OTPInputView
                        style={{ width: '60%', height: 130 }}
                        pinCount={4}
                        autoFocusOnLoad
                        keyboardType='number-pad'
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        placeholderTextColor='black'
                        onCodeFilled={(code => {
                            console.log(`Code is ${code}, you are good to go!`)
                        })}
                    />
                    <TouchableOpacity>
                        <Text style={{ fontSize: 14, textDecorationLine: 'underline' }}>Resend Code</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 20,
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