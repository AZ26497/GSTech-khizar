import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, StatusBar, TouchableOpacity } from 'react-native';
import GradientButton from '../common/GradientButton'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'

const SignIn =({navigation})=> {
    const [showPassword, setShowPassword] = useState(true)
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(true)


      showHidePassword=()=>{
          console.log('Called on Icon Tap')
         setShowPassword({showPassword:!showPassword})
      }

        return (
            <LinearGradient
                colors={['#38ef7d', '#11998e']}
                style={{
                    flex: 1, alignItems: 'center'
                }}
            >
                <Text style={{ marginTop: StatusBar.currentHeight || 40, fontWeight: 'bold', color: 'white', fontSize: 25, alignSelf:'center' }}>Sign In</Text>

                <Image source={require('../../assets/images/signIn.png')} style={{ height: 200, width: '80%', marginTop: 20 }} />

                <View style={styles.container}>
                    <View style={styles.textFieldCont}>
                        <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'white', fontSize: 20 }}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            value={phoneNumber}
                            keyboardType="numeric"
                            onChangeText={(text)=>setPhoneNumber({phoneNumber:text})}
                        />
                    </View>
                    <View style={styles.textFieldCont}>
                        <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'white', fontSize: 20 }}>Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.input,{width:'90%'}]}
                                value={password}
                                keyboardType="numeric"
                                secureTextEntry={showPassword}
                                onChangeText={(text)=>setPassword({password:text})}
                            />
                            <Icon
                                name={showPassword==true?'eye-off-outline':'eye-outline'}
                                color='#000'
                                size={20}
                                style={{marginRight:5}}
                            onPress={()=> this.showHidePassword()}
                            />
                        </View>
                        <TouchableOpacity style={{alignSelf:'flex-end', marginTop:10}} onPress={()=>navigation.navigate('ForgetPassword')}>
                        <Text style={{color:'red', fontSize:15, fontWeight:'bold'}}>Forgot Password?</Text>
                    </TouchableOpacity>
                    </View>
    
                    <GradientButton height={60} width={'90%'} title={'Sign In'} margin={5} action={()=>navigation.navigate('Home')}/>

                </View>
            </LinearGradient>

        )
            }


const styles = StyleSheet.create({
    container: {
        height: 310,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    textFieldCont: {
        // alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '90%',
        margin:10
    },
    passwordContainer: {
        flexDirection: 'row',
        borderColor: '#000',
        backgroundColor:'white',
        borderRadius:15,
        width:'100%',
        alignItems:'center',
        justifyContent:'space-around'
    },
    inputStyle: {
        flex: 1,
    },
    input: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
        color: '#424242',
        width: '100%',
        borderRadius: 15,
    },
    button: {
        backgroundColor: '#38ef7d',
        borderRadius: 10,
    },
});

export default SignIn;