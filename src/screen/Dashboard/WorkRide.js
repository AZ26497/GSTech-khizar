import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Platform, SafeAreaView, ActivityIndicator } from 'react-native';
import WorkRideListItem from '../../component/WorkRideListItem'
import LinearGradient from 'react-native-linear-gradient';
import { getScheduledRideList } from '../../service/Api'
import Loader from '../../service/Loader'

const WorkRide = ({ navigation }) => {
  const [rideList, setRideList] = useState([])
  const [loading, setLoading] = useState('true')
  useEffect(() => {

    getScheduleRide()

  }, []);

  const getScheduleRide = () => {
    getScheduledRideList().then((response) => {
      if (response.status === 1) {
        console.log('Ride Data', response.data)
        setRideList(response.data)
      }
      else {
        console.log('response error', response.status)
      }
    }).catch((error) => {
      console.log('error', error)
    })
    setLoading(false)
  }

  const renderItem = ({ item }) => (
    <WorkRideListItem action={() => navigation.navigate('Schedule')} />
  );
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
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d89',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d67',
      title: 'Third Item',
    },
  ];


  return (

    <SafeAreaView style={{
      flex: 1, backgroundColor: '#38ef7d'
    }}>
      {loading &&
        <Loader />
      }
      <LinearGradient
        // Background Linear Gradient
        colors={['#38ef7d', '#11998e']}
        style={{ flex: 1 }}
      >

        <View style={styles.container}>
          <View style={{ flex: 1, marginLeft: 10, marginRight: 10, marginTop: (Platform.OS === 'ios' ? 50 : 60), marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
            {rideList.length == 0 ? <Text style={{ fontSize: 20, color: 'white' }}>Currently No Scheduled Rides</Text> :
              <FlatList
                data={rideList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            }
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default WorkRide;