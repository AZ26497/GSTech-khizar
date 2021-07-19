import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Platform, SafeAreaView, ActivityIndicator } from 'react-native';
import WorkRideListItem from '../../component/WorkRideListItem'
import LinearGradient from 'react-native-linear-gradient';
import { getScheduledRideList, deleteScheduledRideCall } from '../../service/Api'
import Loader from '../../service/Loader'
import { calculateTimeDifference, getTime } from '../../common/Index';
import AsyncStorage from '@react-native-community/async-storage'

const WorkRide = ({ navigation }) => {
  const [rideList, setRideList] = useState([])
  const [loading, setLoading] = useState('true')
  const isFocused = navigation.isFocused();
  useEffect(() => {
    console.log('Screen Focused', isFocused)
    const willFocusSubscription = navigation.addListener('focus', async() => {
      // const rideChangesSaved = await AsyncStorage.getItem('RideChangesSaved')
      // if (JSON.parse(rideChangesSaved)) {
        setLoading(true)
        getScheduleRide()
      // }
    });
    return willFocusSubscription;
  }, [navigation]);

  const getScheduleRide = () => {
    getScheduledRideList().then((response) => {
      if (response.status === 1) {
        console.log('Ride Data', response.data)
        setRideList(response.data)
        setLoading(false)

      }
      else {
        setLoading(false)

        console.log('response error', response.status)
      }
    }).catch((error) => {
      setLoading(false)
      console.log('error', error)
    })
  }
  const deleteScheduledRide = (item) => {
    setLoading(true)
    console.log('Item going to delete', item._id)
    deleteScheduledRideCall(item._id).then((response) => {
      if (response.status === 1) {
        console.log('Ride Data', response.data)
        getScheduleRide()
      }
      else {
        setLoading(false)
        console.log('response error', response.status)
      }
    }).catch((error) => {
      setLoading(false)
      console.log('error', error)
    })
  }

  const renderItem = ({ item }) => (
    <WorkRideListItem action={ async() => {
      console.log('Item details on render', item)
      await AsyncStorage.setItem('RideChangesSaved', JSON.stringify(false))
      const hourDifferenc = calculateTimeDifference(getTime(item.pickDateTime))
      { hourDifferenc <= 3 ? navigation.navigate('Schedule', { screenName: 'workRide', itemID: item._id, fieldsEditable: false }) : navigation.navigate('Schedule', { screenName: 'workRide', itemID: item._id, fieldsEditable: true }) }
    }} itemDetail={item} deleteItemCall={() => deleteScheduledRide(item)} navigation={navigation} />
  );


  return (

    <SafeAreaView style={{
      flex: 1, backgroundColor: '#38ef7d'
    }}>

      {loading ? <Loader /> : (
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
      )
      }

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