import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView } from 'react-native';
import GradientButton from '../common/GradientButton'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { resetResponse, resetRequets, resetError } from '../redux/actions/resetPassActions'
import { resetPasswordCall } from '../service/Api'

const ResetPassword = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(true)
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('');

    showHidePassword = () => {
        console.log('Called on Icon Tap', this.props.getPhoneNumber())
        // setShowPassword(!showPassword)
        // const data = {
        //     phone: '+923350520050',
        //     password: '12345'
        // }
        // console.log('API Data', data)

        // resetPasswordCall(data).then((response) => {
        //     if (response.status === 1) {
        //         console.log('response', response.data)
        //         navigation.navigate('SignIn', { screenName: 'reset' })
        //     }
        //     else {
        //         console.log('response error', response.status)
        //     }
        // }).catch((error) => {

        //     console.log('error', error)
        // })

    }

    return (
        <SafeAreaView style={{
            flex: 1, backgroundColor: '#38ef7d'
        }}>
            <LinearGradient
                colors={['#38ef7d', '#11998e']}
                style={{
                    flex: 1,
                    alignItems: 'center'
                }}
            >
                <Image source={require('../../assets/images/forgetPassword.png')} style={{ height: 200, width: '80%', marginTop: 100 }} />

                <View style={{ alignSelf: 'center', marginTop: 30, marginBottom: 20 }}>
                    <View style={styles.textFieldCont}>
                        <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'white', fontSize: 20 }}>New Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.input, { width: '90%' }]}
                                value={password}
                                keyboardType="numeric"
                                secureTextEntry={showPassword}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <Icon
                                name={showPassword == true ? 'eye-off-outline' : 'eye-outline'}
                                color='#000'
                                size={20}
                                style={{ marginRight: 5 }}
                                // onPress={() => this.showHidePassword()}
                            />
                        </View>
                    </View>

                    <View style={styles.textFieldCont}>
                        <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'white', fontSize: 20 }}>Confirm Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.input, { width: '90%' }]}
                                value={confPassword}
                                keyboardType="numeric"
                                secureTextEntry={showPassword}
                                onChangeText={(text) => setConfPassword(text)}
                            />
                            <Icon
                                name={showPassword == true ? 'eye-off-outline' : 'eye-outline'}
                                color='#000'
                                size={20}
                                style={{ marginRight: 5 }}
                                // onPress={() => this.showHidePassword()}
                            />
                        </View>
                    </View>

                </View>
                <GradientButton title={"Ok"} width={'90%'} height={60} action={() => showHidePassword()}></GradientButton>

            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 310,
        width: '90%',
        // alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
        backgroundColor: 'yellow'
    },

    textFieldCont: {
        // alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '90%',
        margin: 10
    },
    passwordContainer: {
        flexDirection: 'row',
        borderColor: '#000',
        backgroundColor: 'white',
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
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

const mapStateToProps = state => {
    const { forgetReducer, resetPassReducer } = state
    const { tokenForReset, phone } = forgetReducer
    const { loading } = resetPassReducer
    return { tokenForReset, loading, phone }
}


export default connect(mapStateToProps,{ resetResponse, resetRequets, resetError })(ResetPassword)
