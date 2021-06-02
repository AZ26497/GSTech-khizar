import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, StatusBar, TouchableOpacity } from 'react-native';
import GradientButton from '../common/GradientButton'
import LinearGradient from 'react-native-linear-gradient';

const ForgetPassword = ({navigation}) => {
    return (
        <LinearGradient
            // Background Linear Gradient
            colors={['#38ef7d', '#11998e']}
            style={{
                flex: 1, alignItems: 'center',
            }}
        >
            <Text style={{ marginTop: StatusBar.currentHeight || 40, fontWeight: 'bold', color: 'white', fontSize: 25 }}>Forget Password</Text>

            <Image source={require('../../assets/images/forgetPassword.png')} style={{ height: 200, width: '80%', marginTop: 15 }} />
            <Text style={{ marginTop: 10, color: 'white', fontSize: 15 }}>Please enter your phone number</Text>

            <Text style={{ color: 'white', fontSize: 15, width: '90%', textAlign: 'center' }}>You will receive a code to create a new password via sms.</Text>

            <View style={styles.container}>
                <View style={styles.textFieldCont}>
                    <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'white', fontSize: 20 }}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        value={''}
                        keyboardType="numeric"
                    />
                </View>
                <GradientButton height={60} title={'Send'} width={'90%'} />

            </View>

            <View style={styles.bottomView}>
                <Text style={{ fontSize: 15, marginRight: 10 }}>Don't have account?</Text>
                <TouchableOpacity>
                    <Text style={{ color: 'blue', fontSize: 18, textDecorationLine: 'underline' }}>SignUp</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10
    },
    bottomView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
    textFieldCont: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '90%'
    },
    inputStyle: {
        flex: 1,
    },
    input: {
        // flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
        width: '100%',
        borderRadius: 15,
        height: 50
    },
    button: {
        backgroundColor: '#38ef7d',
        borderRadius: 10,
    },
});
export default ForgetPassword;