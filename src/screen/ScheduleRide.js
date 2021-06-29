import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, KeyboardAvoidingView,Platform, ScrollView , SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../common/GradientButton'
import DateTimePicker from '@react-native-community/datetimepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getScheduleRideDetails } from '../service/Api'


const ScheduleRide = ({ navigation, route }) => {
  const [selectedStartDate, setselectedStartDate] = useState(null)
  const [selectedEndDate, setselectedEndDate] = useState(null)
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [pickUpLocation, setPickUpLocation] = useState('');
  const [dropOffLocation, setDropOffLocation] = useState('');

  useEffect(() => {


    getRideDetails(route.params.itemID)
  }, []);


  const getRideDetails = (ID) => {
    getScheduleRideDetails(ID).then((response) => {
      if (response.status === 1) {
          console.log('response', response.data)
          setPickUpLocation(response.data.location)
      }
      else {
          console.log('response error', response.status)
      }
  }).catch((error) => {
      console.log('error', error)
  })
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <SafeAreaView  style={{
      flex: 1, backgroundColor:'#38ef7d'
  }}>
    <LinearGradient
      // Background Linear Gradient
      colors={['#38ef7d', '#11998e']}
      style={{
        flex: 1, alignItems: 'center', justifyContent:'center'
      }}
    >
     
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          elevation: 10, padding: 10, borderRadius: 15, width: '95%', backgroundColor: '#ffff', position: 'absolute', zIndex: 1,
        }}>
          <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', padding: 10, }}>
            <Ionicons name={'ellipse'} size={20} color={'#38ef7d'} />
            <View style={{ height: '42%', width: 2, backgroundColor: 'black' }}></View>
            <Ionicons name={'caret-down'} size={20} color={'black'} />

          </View>
          <View style={{ flexDirection: 'column', width: '85%' }}>
            <GooglePlacesAutocomplete
              placeholder={pickUpLocation}
              fetchDetails={true}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log('PickUp', details.geometry.location, details.formatted_address);
              }}
              query={{
                key: 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY',
                language: 'en',
              }}
              currentLocation={true}
              currentLocationLabel={pickUpLocation}
            />
            <View style={{ height: 1, width: '95%', backgroundColor: 'gray', marginRight: 5, marginLeft: 5 }}></View>
            <GooglePlacesAutocomplete
              placeholder='Drop off location'
              fetchDetails={true}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log('Drop_Off', details.geometry.location, details.formatted_address);
              }}
              query={{
                key: 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY',
                language: 'en',
              }}
              
            />
          </View>

        </View>
        
      <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', bottom: 10, width: '100%',  padding:10 }}>
          <TouchableOpacity style={{ width: '100%', borderRadius: 15, justifyContent: 'center', marginBottom:20, padding:10,elevation: 10,backgroundColor:'#ffff' }} onPress={showDatepicker}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name={'calendar-outline'} size={40} color={'black'} />
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' , marginLeft:10}}>{new Date().getDate() +'/'+ new Date().getMonth() +'/'+ new Date().getFullYear()}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%',borderRadius: 15, justifyContent: 'center',borderRadius: 15, padding:10,elevation: 10, backgroundColor:'#ffff'}} onPress={showTimepicker}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name={'time-outline'} size={40} color={'black'} />
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' , marginLeft:10}}>{new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()}</Text>
            </View>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
    </LinearGradient>
</SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '80%',
    justifyContent: 'space-between',
    borderRadius: 10,
    // backgroundColor: '#ffff',
    flexDirection: 'column',
    // borderColor: '#38ef7d',
    // borderWidth: 2,
    alignItems:'center'

  },
});

export default ScheduleRide;