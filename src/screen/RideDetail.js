import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import GradientButton from '../common/GradientButton';
import MapView, {PROVIDER_GOOGLE, Polyline, Marker} from 'react-native-maps';
import {requestLocationPermission} from '../common/Permissions';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapViewDirections from 'react-native-maps-directions';
import RideSummaryAndDetail from '../component/RideSummaryAndDetail';
import {getScheduleRideDetails} from '../service/Api';
const GOOGLE_MAPS_APIKEY = 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY';
import SwipeUpDown from 'react-native-swipe-up-down';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 33.738045;
const LONGITUDE = 73.084488;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const RideDetail = ({navigation, route}) => {
  const {initialRegion, setInitialRegion} = useState({
    latitude: 33.738045,
    longitude: 73.084488,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const {coordinates, setCoordinates} = useState([
    {
      latitude: 33.738045,
      longitude: 73.0844882,
    },
    {
      latitude: 33.6961,
      longitude: 73.0491,
    },
  ]);
  useEffect(() => {
    getRideDetails(route.params.item._id);
    console.log('item', route.params);
  }, []);
  const getRideDetails = ID => {
    getScheduleRideDetails(ID)
      .then(response => {
        if (response.status === 1) {
          console.log('response', response.data);
          setPickUpLocation(response.data.location);
          const rideDate = getDate(response.data.pickDateTime);
          const rideTime = getTime(response.data.pickDateTime);
          console.log('Ride Date', rideDate);
          //  setRideDate(new Date(rideDate));
          //   setRideTime(rideTime);
        } else {
          console.log('response error', response.status);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  const origin = {latitude: 33.6844, longitude: 73.0479};
  const destination = {latitude: 33.5651, longitude: 73.0169};
  const GOOGLE_MAPS_APIKEY = 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY';
  return (
  <>
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#38ef7d',
      }}>
      <View style={styles.container}>
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            zIndex: 1,
            elevation: 10,
            padding: 5,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            height: 40,
            width: '90%',
            marginTop: 80,
            backgroundColor: '#ffff',
          }}>
          <Ionicons
            style={{marginLeft: 10}}
            name={'ellipse'}
            size={15}
            color={'#38ef7d'}
          />
          <Text style={{fontSize: 15, marginLeft: 5}}>
            Your personal car is arriving in 15 mins
          </Text>
        </View>
        <MapView
          initialRegion={{
            latitude: 33.6844,
            longitude: 73.0479,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={StyleSheet.absoluteFill}>
          {/* {coordinates.map((coordinate, index) =>
            <MapView.Marker         ref={marker => { this.marker = marker }}
            key={`coordinate_${index}`} coordinate={coordinate} />
          )} */}
          {/* <Marker.Animated
        ref={marker => { this.marker = marker }}
        coordinate={this.state.initialRegion}
      /> */}
          {/* {(coordinates.length >= 2) && (
            <MapViewDirections
              origin={coordinates[0]}
              destination={coordinates[coordinates.length - 1]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={6}
              strokeColor="#38ef7d"
              optimizeWaypoints={true}
            // onStart={(params) => {
            //   console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            // }}
            />
          )} */}
          <MapView.Marker
            coordinate={{latitude: 33.6844,
            longitude: 73.0479}}
            title={"title"}
            description={"description"}
         />
           <MapView.Marker
            coordinate={{latitude: 33.5651,
            longitude: 73.0169}}
          
         >
           <Image
            source={require('../../assets/images/car_top.png')}
            style={{ width: 50, height: 50 }}
            title={'Islamabad'}
            resizeMode="contain"
          />
         </MapView.Marker>
          <MapViewDirections
           strokeWidth={6}
           strokeColor="#38ef7d"
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
          />
        </MapView>
        {/* <RideSummaryAndDetail navigation={navigation}/> */}
      </View>
    </SafeAreaView>
    <SwipeUpDown

          itemMini={
            <View style={{
              width:390,height:60,justifyContent:'center',alignItems: 'center',
              backgroundColor:'#fff',flexDirection:'row'
              }}>
              <Text style={{fontSize:18,marginBottom:10}}>Driver Info</Text>
              <MaterialIcons
            style={{marginLeft: 10,marginBottom:12}}
            name={'keyboard-arrow-up'}
            size={30}
         
            
          />
            </View>
          } // Pass props component when collapsed
          itemFull={<RideSummaryAndDetail navigation={navigation}/> } // Pass props component when show full
          onShowMini={() => console.log('mini')}
          onShowFull={() => console.log('full')}
          onMoveDown={() => console.log('down')}
          onMoveUp={() => console.log('up')}
          disablePressToShow={false} // Press item mini to show full
          style={{backgroundColor: 'background:rgba(255,255,255, 0.3)',justifyContent:'center',alignItems: 'center',padding:0}} // style for swipe
         // animation="spring" 
       />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default RideDetail;
