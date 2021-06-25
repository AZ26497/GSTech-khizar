import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native';
import GradientButton from '../common/GradientButton'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
import {sendOTPCall} from '../service/Api'
import { forgetError, forgetResponse, forgetRequest } from '../redux/actions/forgetActions'
const ForgetPassword = ({navigation}) => {

    sendOTPServiceCall=()=>{
        //   if(phoneNumber == ''){
// return
        //   }else
        //   {
            
             const data={
                 phone:'+923350520050'
             }
              sendOTPCall(data).then((response) => {
                if (response.status === 1) {
                    console.log('response', response.data)
                    navigation.navigate('Verification', {screenName:'forget'})
                }
                else {
                    console.log('response error', response.status)
                }
            }).catch((error) => {
                console.log('error', error)
            })
        //   }
      }

    return (
        <SafeAreaView  style={{
            flex: 1, backgroundColor:'#38ef7d'
        }}>
        <LinearGradient
            // Background Linear Gradient
            colors={['#38ef7d', '#11998e']}
            style={{
                flex: 1, alignItems: 'center',
            }}
        >
            <Image source={require('../../assets/images/forgetPassword.png')} style={{ height: 200, width: '80%', marginTop: 100 }} />
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
                <GradientButton height={60} title={'Send'} width={'90%'} action={()=>sendOTPServiceCall()}/>

            </View>

            <View style={styles.bottomView}>
                <Text style={{ fontSize: 15, marginRight: 10 }}>Don't have account?</Text>
                <TouchableOpacity>
                    <Text style={{ color: 'blue', fontSize: 18, textDecorationLine: 'underline' }}>Help</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
</SafeAreaView>
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
const mapStateToProps = state => {
    const { forgetReducer } = state
    const { phone, confirmResult, loading, tokenForReset } = forgetReducer
    return { phone, confirmResult, loading, tokenForReset }
}

export default connect(mapStateToProps, {  forgetResponse, forgetRequest, forgetError })(ForgetPassword)
