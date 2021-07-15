import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import DashboardItem from '../../component/DashboardItem';
import LinearGradient from 'react-native-linear-gradient';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons'
import Pulse from 'react-native-pulse'
import * as Animatable from 'react-native-animatable';
import { getStartedRideDetail } from '../../service/Api'
import Loader from '../../service/Loader'

const Dashboard = ({ navigation }) => {
  const [showPulse, setShowPulse] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rideDetail, setRideDetail] = useState([])

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      setShowPulse(false)
      getStartedRide()
    });
    return willFocusSubscription;
  }, [navigation]);

  const getStartedRide = () => {
    setLoading(true)
    getStartedRideDetail().then((response) => {
      if (response.status === 1) {
        setLoading(false)
        if (response.data.length > 0) {
          setRideDetail(response.data)
          setShowPulse(true)
          console.log('Started Ride Data', response.data)
        }
      }
      else {
        setLoading(false)
        setShowPulse(false)

        console.log('response error', response.status)
      }
    }).catch((error) => {
      setLoading(false)
      setShowPulse(false)
      console.log('error', error)
    })
  }
  const pulse = {
    0: {
      scale: 1,
    },
    0.5: {
      scale: 1.5
    },
    1: {
      scale: 1
    }
  }

  return (
  
      <LinearGradient
        // Background Linear Gradient
        colors={['#38ef7d', '#11998e']}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={{ height: '20%', width: '100%', marginTop: 40 }}>
            <Text style={styles.textStyle}>Welcome</Text>
            <Text style={styles.textStyle}>To</Text>
            <Text style={[styles.textStyle, { color: 'black' }]}>Khizer <Text style={{ fontSize: 20, color: 'white' }}>Fleet</Text></Text>
          </View>
          {loading ? <Loader /> : (
            <View style={{ width: '90%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', marginBottom: 50 }}>
              <View style={{ height: 150, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                <DashboardItem title={"Work Ride"} imageName={'briefcase-outline'} navigateTo={() => navigation.navigate('WorkRide')} />
                <DashboardItem title={"Personal Ride"} imageName={'pricetag-outline'} navigateTo={() => navigation.navigate('PersonalRide')} />
              </View>
              <View style={{ height: 150, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                <DashboardItem title={"History"} imageName={'card-outline'} navigateTo={() => navigation.navigate('History')} />
                <DashboardItem title={"Wallet"} imageName={'wallet-outline'} navigateTo={() => navigation.navigate('Wallet')} />
              </View>
            </View>
          )}
        </View>
        <ActionButton activeOpacity={1.0} renderIcon={() => <Icon name={'menu-outline'} size={26} color={'white'} />} buttonColor="#38ef7d">
          <ActionButton.Item buttonColor='#9b59b6' title="Settings" onPress={() => console.log("notes tapped!")}>
            <Icon name="settings-outline" size={26} style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Wallet" onPress={() => { }}>
            <Icon name="wallet-outline" size={26} style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Logout" onPress={() => { }}>
            <Icon name="log-out-outline" size={26} style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        {showPulse &&
          <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={{ bottom: 12, position: 'absolute', right: 100, marginTop: 100 }}>
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 80 }} onPress={() => navigation.navigate('RideDetail', { rideDetails: rideDetail })}>
              <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
                <Icon name="radio-button-on-outline" size={65} style={styles.actionButtonIcon} color={'#38ef7d'} />
                <Text style={{ color: 'white', fontSize: 12 }}>In Progress</Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        }
      </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textStyle: {
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center'
  },
  menuContainer: {

  }

});
export default Dashboard;