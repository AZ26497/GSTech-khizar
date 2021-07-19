import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../common/GradientButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getScheduleRideDetails,saveRideDetailChanges } from '../service/Api';
import { getTime, getDate } from '../common/Index';
import moment from 'moment';
import Loader from '../service/Loader'
import AsyncStorage from '@react-native-community/async-storage'

const ScheduleRide = ({ navigation, route }) => {
  const [selectedStartDate, setselectedStartDate] = useState(null);
  const [selectedEndDate, setselectedEndDate] = useState(null);
  const [date, setRideDate] = useState(new Date());
  const [time, setRideTime] = useState(moment(new Date()).format('HH:mm a'));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [pickUpLocation, setPickUpLocation] = useState('Current Location');
  const [pickUpLatitude, setPickUpLatitude] = useState('');
  const [pickUpLongitude, setPickUpLongitude] = useState('');
  const [dropOffLocation, setDropOffLocation] = useState('Drop Off Location');
  const [dropOffLatitude, setDropOffLatitude] = useState('');
  const [dropOffLongitude, setDropOffLongitude] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveBtnLoading, setSaveBtnLoading] = useState(false);

  const [driverInfo, setDriverInfo] = useState([]);

  const editbale = route.params.fieldsEditable;
  const screen = route.params.screenName;
  const itemID = route.params.itemID;

  useEffect(() => {
    if (screen == 'workRide') {
      setLoading(true)
      getRideDetails(itemID);
    }
  }, []);

  const getRideDetails = ID => {
    getScheduleRideDetails(ID)
      .then(response => {
        if (response.status === 1) {
          console.log('response', response.data);
          setPickUpLocation(response.data.pickLocation);
          setDropOffLocation(response.data.dropLocation);
          const rideDate = getDate(response.data.pickDateTime);
          const rideTime = getTime(response.data.pickDateTime);
          setDriverInfo(response.data.driver)
          setRideTime(rideTime)
          setRideDate(rideDate)

          console.log('Ride Date', rideDate);
          console.log('Ride Time', rideTime);

          //  setRideDate(new Date(rideDate));
          //   setRideTime(rideTime);
          setLoading(false)
        } else {
          setLoading(false)
          console.log('response error', response.status);
        }
      })
      .catch(error => {
        setLoading(false)
        console.log('error', error);
      });
  };

  const saveChanges = ID => {
  setSaveBtnLoading(true)

    const data = {
      pickLocation: pickUpLocation,
      picklat: pickUpLatitude,
      picklong: pickUpLongitude,
      dropLocation: dropOffLocation,
      droplat: dropOffLatitude,
      droplong: dropOffLongitude
    }
    console.log('API Detail changes DATA' , data)
    saveRideDetailChanges(itemID, data)
      .then(async(response) => {
        if (response.status === 1) {
          console.log('response', response.data);
          setSaveBtnLoading(false)
          await AsyncStorage.setItem('RideChangesSaved', JSON.stringify(true))
          navigation.goBack()
        } else {
          setSaveBtnLoading(false)
          alert(response.status)
          console.log('response error', response.status);
        }
      })
      .catch(error => {
        setSaveBtnLoading(false)
        alert(error)
        console.log('error', error);
      });
  };

  const onChange = (event, selectedDate) => {
    // setShow(Platform.OS === 'ios');
    if (mode === 'date') {
      setRideDate(selectedDate);
      setShow(false)
    } else {
      setRideTime(selectedDate);
      setShowTime(false)

    }
  };

  const showMode = currentMode => {
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setShow(true);
    showMode('date');
  };

  const showTimepicker = () => {
    setShowTime(true);
    showMode('time');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#38ef7d',
      }}>
      {/* <ScrollView
            style={{ width: '100%', flex:1 }}
            contentContainerStyle={{ alignItems: 'center' }}
            horizontal={false}
          > */}
      {loading ? <Loader /> : (
        <LinearGradient
          // Background Linear Gradient
          colors={['#38ef7d', '#11998e']}
          style={{
            flex: 1,
            alignItems: 'center',
          }}>


          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              elevation: 10,
              padding: 10,
              borderRadius: 15,
              width: '95%',
              backgroundColor: '#ffff',
              position: 'absolute',
              zIndex: 1,
              marginTop: 50,
            }}
            pointerEvents={editbale ? 'auto' : 'none'}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: 10,
              }}>
              <Ionicons name={'ellipse'} size={20} color={'#38ef7d'} />
              <View
                style={{
                  height: '42%',
                  width: 2,
                  backgroundColor: 'black',
                }}></View>
              <Ionicons name={'caret-down'} size={20} color={'black'} />
            </View>
            <View style={{ flexDirection: 'column', width: '85%' }}>
              <GooglePlacesAutocomplete
                placeholder={'G-11, Islamabad, Pakistan'}
                fetchDetails={true}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(
                    'PickUp Location',
                    details.geometry.location,
                  );
                  console.log(
                    'PickUp formatted address',
                    details.formatted_address,
                  );
                  setPickUpLocation(details.formatted_address)
                  setPickUpLatitude(details.geometry.location.lat)
                  setPickUpLongitude(details.geometry.location.lng)

                }}
                query={{
                  key: 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY',
                  language: 'en',
                }}
                currentLocation={true}
                currentLocationLabel={pickUpLocation}
              />
              <View
                style={{
                  height: 1,
                  width: '95%',
                  backgroundColor: 'gray',
                  marginRight: 5,
                  marginLeft: 5,
                }}></View>
              <GooglePlacesAutocomplete
                placeholder={'Islamabad International Airport'}
                fetchDetails={true}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(
                    'Drop_Off',
                    details.geometry.location,
                    details.formatted_address,
                  );
                  setDropOffLocation(details.formatted_address)
                  setDropOffLatitude(details.geometry.location.lat)
                  setDropOffLongitude(details.geometry.location.lng)

                }}
                query={{
                  key: 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY',
                  language: 'en',
                }}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 180,
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',

                bottom: 0,
                width: '100%',
                padding: 10,
              }}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  borderRadius: 15,
                  justifyContent: 'center',
                  marginBottom: 20,
                  padding: 10,
                  elevation: 10,
                  backgroundColor: '#ffff',
                }}
                onPress={() => showDatepicker()}
                activeOpacity={editbale ? 0.5 : 1.0}
                disabled={screen == 'workRide' ? true : false}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name={'calendar-outline'} size={40} color={'black'} />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginLeft: 10,
                    }}>
                    {moment(date).format('DD MMMM YYYY')}
                  </Text>
                </View>
              </TouchableOpacity>
              {show && (
                <View style={{ width: '100%', backgroundColor: '#fff', marginBottom: 10 }}>
                  {Platform.OS === 'ios' &&

                    <TouchableOpacity style={{ height: 30, backgroundColor: '#fff', borderWidth: 1, borderColor: 'gray' }} onPress={() => setShow(false)}>
                      <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: 'bold', marginRight: 10 }}>OK</Text>
                    </TouchableOpacity>
                  }
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                  />

                </View>
              )}

              <TouchableOpacity
                style={{
                  width: '100%',
                  borderRadius: 15,
                  justifyContent: 'center',
                  borderRadius: 15,
                  padding: 10,
                  elevation: 10,
                  backgroundColor: '#ffff',
                }}
                onPress={() => showTimepicker()}
                activeOpacity={editbale ? 0.5 : 1.0}
                disabled={screen == 'workRide' ? true : false}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name={'time-outline'} size={40} color={'black'} />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginLeft: 10,
                    }}>
                    {time}
                  </Text>
                </View>
              </TouchableOpacity>
              {showTime && (
                <View style={{ width: '100%', backgroundColor: '#fff', marginBottom: 10 }}>
                  {Platform.OS === 'ios' &&
                    <TouchableOpacity style={{ height: 30, backgroundColor: '#fff', borderWidth: 1, borderColor: 'gray' }} onPress={() => setShowTime(false)}>
                      <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: 'bold', marginRight: 10 }}>OK</Text>
                    </TouchableOpacity>
                  }
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(time)}
                    mode={mode}
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                  />


                </View>
              )}
            </View>
            {screen == 'workRide' &&
              <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '94%', marginBottom: 10, padding: 10, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 20, backgroundColor: '#ffff', margin: 10 }}>
                <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold' }}>Driver Info</Text>

                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', marginBottom: 5 }}>
                  <Text style={{ textAlign: 'left', fontWeight: 'bold', color: 'black' }}>Name</Text>
                  <Text style={{ textAlign: 'left' }}>{driverInfo.fullname}</Text>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', marginBottom: 5 }}>
                  <Text style={{ textAlign: 'left', fontWeight: 'bold', color: 'black' }}>Car Model:</Text>
                  <Text style={{ textAlign: 'left' }}>{driverInfo.vehicle_model}</Text>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', marginBottom: 5 }}>
                  <Text style={{ textAlign: 'left', fontWeight: 'bold', color: 'black' }}>Car Number:</Text>
                  <Text style={{ textAlign: 'left' }}>{driverInfo.vehicle_no}</Text>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', marginBottom: 5 }}>
                  <Text style={{ textAlign: 'left', fontWeight: 'bold', color: 'black' }}>Capacity:</Text>
                  <Text style={{ textAlign: 'left' }}>{driverInfo.vehicle_capacity} Passengers</Text>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', marginBottom: 5 }}>
                  <Text style={{ textAlign: 'left', fontWeight: 'bold', color: 'black' }}>Distance:</Text>
                  <Text style={{ textAlign: 'left' }}>20km</Text>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', marginBottom: 5 }}>
                  <Text style={{ textAlign: 'left', fontWeight: 'bold', color: 'black' }}>Cost:</Text>
                  <Text style={{ textAlign: 'left' }}>500Rs</Text>

                </View>
              </View>

            }
            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
            {saveBtnLoading == true ? (
              <Loader />
            ) : (
              <GradientButton title={'Save'} width={'90%'} height={60} action={() => saveChanges()}></GradientButton>
            )}
            </View>

          </View>
        </LinearGradient>
      )}
      {/* </ScrollView> */}

    </SafeAreaView>
  );
};

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
    alignItems: 'center',
  },
});

export default ScheduleRide;
