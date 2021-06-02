import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../common/GradientButton'
import DateTimePicker from '@react-native-community/datetimepicker';


const ScheduleRide = ({navigation}) => {
  const [selectedStartDate, setselectedStartDate] = useState(null)
  const [selectedEndDate, setselectedEndDate] = useState(null)
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

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

  const onDateChange = (date, type) => {
    //function to handle the date change
    if (type === 'END_DATE') {
      setselectedEndDate({ selectedEndDate: date })
    } else {
      setselectedStartDate({ selectedStartDate: date })
      setselectedEndDate({ selectedEndDate: null })
    }
  };
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['#38ef7d', '#11998e']}
      style={{
        flex: 1, alignItems: 'center', justifyContent: 'center',
      }}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: 'column', width: '85%' }}>
          <GooglePlacesAutocomplete
            placeholder='Current Location'
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
            currentLocationLabel='Islamabad'
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
        <View>
          <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
          </View>
          <View>
            <Button onPress={showTimepicker} title="Show time picker!" />
          </View>
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
        </View>        <View style={{ height: '15%', marginTop: 10, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, position: 'absolute', bottom: 0 }}>
          <GradientButton title={'Confirm'} width={'45%'} height={45} action={() => navigation.goBack()}></GradientButton>
          <GradientButton title={'Cancel'} width={'45%'} height={45} action={() => navigation.goBack()}></GradientButton>

        </View>

      </View>
    </LinearGradient>

  )
}


const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '50%',
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: '#ffff'
  },
});

export default ScheduleRide;