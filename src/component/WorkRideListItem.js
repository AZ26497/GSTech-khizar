import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity, Linking, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/Ionicons'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class WorkRideListItem extends Component {
    render() {
       const dialCall = (number) => {
            let phoneNumber = '';
            if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
            else {phoneNumber = `telprompt:${number}`; }
            Linking.openURL(phoneNumber);
         };
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={this.props.action}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 30, width: '100%', marginTop:5 }}>
                    <Text style={{fontWeight:'bold', color:'black'}}>Mr.Customer</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '40%'}}></View>
                    <TouchableOpacity onPress={()=>dialCall(123456789)} style={{ elevation: 10,alignItems:'center',justifyContent:'center', backgroundColor: 'green', height: 25, width: 25, borderRadius: 6 }}>
                        <Feather name='phone-call' size={15} color={'white'}></Feather>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ elevation: 10, backgroundColor: 'green',alignItems:'center',justifyContent:'center', height: 25, width: 25, borderRadius: 6 }}>
                        <Feather name='map-pin' size={15} color={'white'}></Feather>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ elevation: 10, backgroundColor: 'red', alignItems:'center',justifyContent:'center',height: 26, width: 26, borderRadius: 13 }}>
                        <Feather name='x' size={15} color={'white'}></Feather>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', flex: 1, marginTop: 5 , width:'100%', marginBottom:5}}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <Icon name='location' size={20} color={'black'}></Icon>
                        <Text style={{marginLeft:5, marginRight:20}}>Lahore Airport</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <Icon name='calendar' size={20} color={'black'}></Icon>
                        <Text style={{marginLeft:5}}>13 April 2021</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <Icon name='time' size={20} color={'black'}></Icon>
                        <Text style={{marginLeft:5}}>8:00AM</Text>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 130,
        width: windowWidth-20,
        borderWidth: 1,
        borderColor:'gray',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'column',
        borderRadius: 10,
        marginBottom:10,
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10,
        elevation:2
    },
});