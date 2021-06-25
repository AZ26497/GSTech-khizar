import React, { Component, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, CheckBox, TextInput, ScrollView , SafeAreaView} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'
import GradientButton from '../common/GradientButton'


const PaymentMethod = ({ navigation }) => {
    const [firstRadioBtnSelected, setFirstRadioBtnSelected] = useState(false)
    const [secondRadioBtnSelected, setSecondRadioBtnSelected] = useState(false)

    return (
        <SafeAreaView  style={{
            flex: 1, backgroundColor:'#38ef7d'
        }}>
        <LinearGradient
            // Background Linear Gradient
            colors={['#38ef7d', '#11998e']}
            style={{
                flex: 1,
            }}
        >
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={styles.container}>
                    <View style={styles.subView}>
                        <View style={styles.headingView}>
                            <Icon
                                name={'add-outline'}
                                color='white'
                                size={35}
                                style={{ marginRight: 5 }}
                            />
                            <Text style={[styles.heading, { fontSize: 20 }]}>Add Payment Method</Text>
                        </View>
                        <View style={styles.radioBoxContainer}>
                            <Icon
                                name={firstRadioBtnSelected == true ? 'radio-button-on-outline' : 'radio-button-off-outline'}
                                color='white'
                                size={25}
                                // style={{marginRight:5}}
                                onPress={() => {
                                    setFirstRadioBtnSelected({ firstRadioBtnSelected: true })
                                    setSecondRadioBtnSelected({ secondRadioBtnSelected: false })
                                }}
                            />
                            <Text style={{ color: 'white' }}>Cash</Text>
                        </View>
                        <View style={styles.radioBoxContainer}>
                            <Icon
                                name={secondRadioBtnSelected == true ? 'radio-button-on-outline' : 'radio-button-off-outline'}
                                color='white'
                                size={25}
                                // style={{marginRight:5}}
                                onPress={() => {
                                    setFirstRadioBtnSelected({ firstRadioBtnSelected: false })
                                    setSecondRadioBtnSelected({ secondRadioBtnSelected: true })
                                }}
                            />
                            <Text style={{ color: 'white' }}>Card</Text>
                        </View>

                        {secondRadioBtnSelected &&
                            <View style={styles.cardDetailView}>
                                <View style={styles.textFieldCont}>
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'white', fontSize: 20, marginLeft: 5 }}>Card Number</Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={styles.textFieldCont}>
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'white', fontSize: 20, marginLeft: 5 }}>Card Holder Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="default" />
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-around' }}>
                                    <View style={[styles.textFieldCont, { width: '47%' }]}>
                                        <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'white', fontSize: 20, marginLeft: 5 }}>Expiry Date</Text>
                                        <TextInput
                                            style={styles.input}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                    <View style={[styles.textFieldCont, { width: '47%' }]}>
                                        <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'white', fontSize: 20, marginLeft: 5 }}>CVV</Text>
                                        <TextInput
                                            style={styles.input}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>
                            </View>

                        }
                    </View>
                    <View style={styles.subView}>
                        <View style={styles.headingView}>
                            <Icon
                                name={'cash-outline'}
                                color='white'
                                size={40}
                                style={{ marginRight: 5 }}
                            />
                            <Text style={[styles.heading, { fontSize: 20 }]}>Vouchers</Text>
                        </View>
                    </View>

                    <View style={styles.subView}>
                        <View style={styles.headingView}>
                            <Icon
                                name={'cash-outline'}
                                color='white'
                                size={40}
                                style={{ marginRight: 5 }}
                            />
                            <Text style={[styles.heading, { fontSize: 20 }]}>Khizar Credit</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subView: {
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        // backgroundColor: 'blue',
        justifyContent: 'space-between',
        padding: 10,
    },
    radioBoxContainer: {
        flexDirection: "row",
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 10

    },
    checkbox: {
        alignSelf: "center",
    },
    // label: {
    //     margin: 8,
    // },
    heading: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
    headingView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 10
    },
    cardDetailView: {
        height: 310,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    textFieldCont: {
        // alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '100%',
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

export default PaymentMethod;