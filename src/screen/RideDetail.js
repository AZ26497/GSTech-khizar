import React, { Component, useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Platform,
  SafeAreaView,
  Modal
} from 'react-native';
import GradientButton from '../common/GradientButton';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker, AnimatedRegion } from 'react-native-maps';
import { requestLocationPermission } from '../common/Permissions';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapViewDirections from 'react-native-maps-directions';
import RideSummaryAndDetail from '../component/RideSummaryAndDetail';
import { getScheduleRideDetails } from '../service/Api';
const GOOGLE_MAPS_APIKEY = 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY';
import SwipeUpDown from 'react-native-swipe-up-down';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Rating } from 'react-native-ratings';
import database from '@react-native-firebase/database';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 33.738045;
const LONGITUDE = 73.084488;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DataBaseRef = database()

const RideDetail = ({ navigation, route }) => {
  const rideDetails = route.params.rideDetails[0]
  const [swipeUp, setSwipeUp] = useState(false)
  rideEND =  route.params.rideEnd ? true:false
  const [prevLat, setPrevLat] = useState(0)
  const [prevLng, setPrevLng] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState('')
  const [distanceTravelled, setDistanceTravelled] = useState(0)
  const [routeCoordinates, setRouteCoordinates] = useState([])
  const [ratingModal, setRatingModal] = useState(true);
  
  const mapRef = useRef(null)
  const UserTableRef = DataBaseRef.ref('/Ride_tracking').child(rideDetails._id);
  const [region, setRegion] = useState(
    {
      latitude: 73.0396641,
      longitude: 33.7201055,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }
  )
  const origin = { latitude: 33.7201055, longitude: 73.0396641,latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA, };
  const destination = {
    latitude: 33.6967808,
    longitude: 73.0458092,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const [myLatitude, setMyLatitude] = useState(region.latitude);
  const [myLongitude, setMyLongitude] = useState(region.longitude);
  const [myDirection, setMyDirection] = useState({ latitude: 0.000000, longitude: 0.000000, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
  const [otherDirection, setOtherDirection] = useState(region);
  // const [coordinates, setCoordinates] = useState(new AnimatedRegion(origin));

  const mapRef = useRef()

  const GOOGLE_MAPS_APIKEY = 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY';
  useEffect(() => {
    if(rideEND == true){
      setRatingModal(true)
    }
    
    console.log('Ride Details', rideDetails)
    UserTableRef.on('value', onFirebaseValueChanged)
    getEstimatedTimeOfArrival();
  }, []);
  function ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
  const onFirebaseValueChanged = (snapshot) => {
    var fbObject = snapshot.val();
    console.log('onchanged-> ** ', fbObject)
    console.log('onchanged-> ** ', fbObject?.driverLat)
    if (fbObject != null) {
        setMyLatitude(Number(fbObject?.driverLat))
        setMyLongitude(Number(fbObject?.driverLong))
        let tempCoords = {
            latitude: Number(fbObject?.driverLat),
            longitude: Number(fbObject?.driverLong)
        }
        if (mapRef.current && mapRef.current.animateCamera) {
          mapRef.current.animateCamera({ center: tempCoords, pitch: 2, heading: 20, altitude: 200, zoom: 5 }, 1000)
        }
        setOtherDirection({ latitude: Number(fbObject?.driverLat), longitude: Number(ffbObject?.driverLong), latitudeDelta: 0.0922, longitudeDelta: 0.0421, })
    }
    else if (fbObject === null) {
        setMyDirection({ latitude: Number(rideDetails.picklat), longitude: Number(rideDetails.picklong), latitudeDelta: 0.0922, longitudeDelta: 0.0421, })
        setOtherDirection({ latitude: Number(rideDetails.droplat), longitude: Number(rideDetails.droplong), latitudeDelta: 0.0922, longitudeDelta: 0.0421, })
        let tempCoords = {
            latitude: Number(rideDetails.droplat),
            longitude: Number(rideDetails.droplong)
        }
        if (mapRef.current && mapRef.current.animateCamera) {
          mapRef.current.animateCamera({ center: tempCoords, pitch: 2, heading: 20, altitude: 200, zoom: 8 }, 1000)
        }
    }
};

  async function getEstimatedTimeOfArrival() {

    // get location of base
    const BaseLocation = rideDetails.driver.location;

    // get locations of targets
    const TargetLocation = rideDetails.pickLocation;

    // prepare final API call
    let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";
    let params = `origins=${BaseLocation}&destinations=${TargetLocation}&key=${GOOGLE_MAPS_APIKEY}`;
    let finalApiURL = `${ApiURL}${encodeURI(params)}`;

    console.log("finalApiURL:\n");
    console.log(finalApiURL);

    // get duration/distance from base to each target
    try {
      let response = await fetch(finalApiURL);
      let responseJson = await response.json();
      console.log("responseJson To Get Time and Distance:\n" , responseJson.rows[0].elements);
      console.log(responseJson.rows[0].elements[0].duration.text);
      setEstimatedTime(responseJson.rows[0].elements[0].duration.text)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#38ef7d',
      }}> 
     
      <View style={styles.container}>
      <Modal animationType="slide"
        transparent={true}
        visible={ratingModal}>
        <View style={styles.modalOverlay}>
          <View style={{ backgroundColor: 'white', width: '90%', alignItems: 'center', padding: 20, borderRadius: 20, borderColor: '#38ef7d' }}>
            <Text style={{ fontSize: 30 }}>Rate Driver</Text>
            <Rating
              style={{ marginBottom: 20 }}
              startingValue={1}
              ratingCount={5}
              showRating={true}
              imageSize={30}
              fractions={1}
              type={'custom'}
              ratingTextColor={'black'}
              selectedColor={'#38ef7d'}
              ratingColor={'#38ef7d'}
              ratingBackgroundColor='#c8c7c8'
              starContainerStyle={{ backgroundColor: 'green', width: 30 }}
              // ratingImage={Icons.crossImg}
              onFinishRating={ratingCompleted}
            />

            <GradientButton height={50} title={'Rate'} width={'90%'} style={{ alignSelf: 'flex-end' }} action={() => setRatingModal(false)} />

          </View>

        </View>
      </Modal>
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
            style={{ marginLeft: 10 }}
            name={'ellipse'}
            size={15}
            color={'#38ef7d'}
          />
          <Text style={{ fontSize: 15, marginLeft: 5 }}>
            {'Your driver is arriving in ' + estimatedTime}
          </Text>
        </View>
        <MapView
          ref={mapRef}
          initialRegion={region}
          style={StyleSheet.absoluteFill}
          onRegionChange={region => {
            setRegion({ region });
          }}
        >

          <MapView.Marker
            coordinate={{
              latitude: 33.7201055, longitude: 73.0396641
            }}
            title={"title"}
            description={"description"}
          />
          <MapView.Marker
            coordinate={{
              latitude: 33.6967808,
              longitude: 73.0458092
            }}
            title={"title"}
            description={"description"}
          >
            <Image
              source={require('../../assets/images/car_top.png')}
              style={{ width: 50, height: 50 }}
              title={'Islamabad'}
              resizeMode="contain"
            />
          </MapView.Marker>

          <MapViewDirections
            origin={origin}
            destination={otherDirection}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={6}
            strokeColor="#38ef7d"
            optimizeWaypoints={true}
            timePrecision={"now"}
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}

            onReady={result => {
              console.log('Distance in KM ', result.distance)
              console.log('Duration in Min', result.duration)

              mapRef.current.fitToCoordinates(result.coordinates, {

              })
            }}

            onError={(errorMessage) =>
              console.log('Error', errorMessage)
            }
          />
          {/* <MapViewDirections
            strokeWidth={6}
            strokeColor="#38ef7d"
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            optimizeWaypoints={true}
          /> */}
        </MapView>
        <SwipeUpDown
          swipeHeight={60}
          itemMini={
            <View style={{ height: '100%', width: 400, backgroundColor: '#38ef7d', alignItems: 'center', justifyContent: 'center' }}>
              <MaterialIcons
                style={{ marginLeft: 10, marginBottom: 12 }}
                name={'keyboard-arrow-up'}
                size={30}
              />
            </View>
          } // Pass props component when collapsed
          itemFull={<RideSummaryAndDetail navigation={navigation} rideInfo={rideDetails} />} // Pass props component when show full
          disablePressToShow={false} // Press item mini to show full
          style={{ backgroundColor: 'background:rgba(255,255,255, 0.3)', justifyContent: 'center', alignItems: 'center' }} // style for swipe
          animation="easeInEaseOut"
        />
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RideDetail;
