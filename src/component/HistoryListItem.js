import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/Ionicons'


export default class HistoryListItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 30, width: '100%', marginTop:5 }}>
                    <Text style={{fontWeight:'bold', color:'black'}}>Driver Name</Text>
                    <Text style={{fontWeight:'bold', color:'black'}}>500 Rs</Text>

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

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <Icon name='star' size={20} color={'black'}></Icon>
                        <Text style={{marginLeft:5}}>4.5</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: '100%',
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