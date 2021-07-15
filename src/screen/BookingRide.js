import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, FlatList, Modal, TouchableOpacity , SafeAreaView} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle, Overlay, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'
import RideListItem from '../component/RideListItem';
import GradientButton from '../common/GradientButton';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 33.738045;
const LONGITUDE = 73.084488;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const BookingRide=({navigation})=>{
  const [myLatitude, setMyLatitude] = useState(31.5204);
    const [myLongitude, setMyLongitude] = useState(74.3587);
    const [myDirection, setMyDirection] = useState({ latitude: 0.000000, longitude: 0.000000, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
 
    const [otherDirection, setOtherDirection] = useState({ latitude: 31.5204, longitude: 74.3587, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
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
  
    const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
    ];
    const renderItem = ({ item }) => (
      <RideListItem />
    );


    return (
      <SafeAreaView  style={{
        flex: 1, backgroundColor:'#38ef7d'
    }}>
      <View style={styles.container}>
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
            <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
          )} */}
          {/* {(coordinates.length >= 2) && ( */}
            <MapViewDirections
              origin={myDirection}
              // waypoints={(this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1) : null}
              destination={otherDirection}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={6}
              strokeColor="#38ef7d"
              optimizeWaypoints={true}
            // onStart={(params) => {
            //   console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            // }}
            />
          {/* )} */}
        </MapView>

        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', bottom: 0, backgroundColor: 'white', height: '40%', width: '100%', position: 'absolute', borderTopRightRadius: 30.0, borderTopLeftRadius: 30.0, borderTopColor: 'yellow', paddingTop: 10, paddingLeft: 20, paddingRight: 10, paddingBottom: 10 }}>

          <View style={{ height: '55%', width: '100%' }}>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal
            />
            {/* <Carousel
              layout={"default"}
              ref={ref => this.carousel = ref}
              data={DATA}
              sliderWidth={300}
              itemWidth={50}
              renderItem={renderItem}
              onSnapToItem={index => this.setState({ activeIndex: index })} /> */}
          </View>


          <View style={{ height: '15%', width: '95%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>

              <Text>
                Estimated Time
  </Text>
              <Text style={{ color: '#38ef7d' }}>
                24 min
  </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
              <TouchableOpacity style={{flexDirection:'row', alignItems: 'center', }} onPress={()=>navigation.navigate('Payment')}>
                {/* <Image source={require('../../assets/images/card.png')} style={{ height: 30, width: 40 }} />  */}
                <Ionicons name="cash-outline" size={30}></Ionicons>
                <Text style={{ textAlign: 'left', fontSize:16 }}> Cash</Text>
                <Ionicons name="chevron-forward-outline" size={20}></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: '20%', width: '95%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <GradientButton title={'Book Now'} width={'45%'} height={60} action={() => navigation.navigate('RideDetail',{item:''})}></GradientButton>
            <GradientButton title={'Schedule'} width={'45%'} height={60} action={() => navigation.navigate('Schedule',{screenName:'bookRide', itemID:'', fieldsEditable:true})}></GradientButton>

          </View>
        </View>
      </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default BookingRide;