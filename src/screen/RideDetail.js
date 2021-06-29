import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, Platform, SafeAreaView } from 'react-native';
import GradientButton from '../common/GradientButton'
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import { requestLocationPermission } from '../common/Permissions'
import Geolocation from '@react-native-community/geolocation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MapViewDirections from 'react-native-maps-directions';
import RideSummaryAndDetail from '../component/RideSummaryAndDetail'

const GOOGLE_MAPS_APIKEY = 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 33.738045;
const LONGITUDE = 73.084488;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const RideDetail=({navigation})=> {
  const {initialRegion, setInitialRegion} = useState({
    latitude: 33.738045, longitude: 73.084488,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  })
const {coordinates, setCoordinates} = useState([
  {
    latitude: 33.738045,
    longitude: 73.0844882,
  },
  {
    latitude: 33.6961,
    longitude: 73.0491,
  },
  ],
)

    return (
      <SafeAreaView  style={{
        flex: 1, backgroundColor:'#38ef7d'
    }}>
      <View style={styles.container}>

        <View style={{
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          zIndex: 1, elevation: 10, padding: 5, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: 40, width: '90%', marginTop: 80, backgroundColor: '#ffff'
        }}>
          <Ionicons style={{ marginLeft: 10 }} name={'ellipse'} size={15} color={'#38ef7d'} />
          <Text style={{ fontSize: 15, marginLeft: 5 }}>Your personal car is arriving in 15 mins</Text>

        </View>
        <MapView
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={StyleSheet.absoluteFill}
        >
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
        </MapView>
        <RideSummaryAndDetail navigation={navigation}/>

      </View>
      </SafeAreaView>
    )
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default RideDetail;