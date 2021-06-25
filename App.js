/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { FAB } from 'react-native-paper'
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
//
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
// import Home from './src/bottomTabScreens/Home';
import Wallet from './src/bottomTabScreens/Wallet';
import History from './src/bottomTabScreens/History';
import Menu from './src/bottomTabScreens/Menu';
import WorkRide from './src/screen/Dashboard/WorkRide'
import PersonalRide from './src/screen/Dashboard/PersonalRide'
import SignIn from './src/screen/SignIn'
import VerificationCode from './src/screen/VerificationCode'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Dashboard from './src/screen/Dashboard/Dashboard';
import ForgetPassword from './src/screen/ForgetPassword';
import ScheduleRide from './src/screen/ScheduleRide';
import BookingRide from './src/screen/BookingRide';
import CustomAlert from './src/common/CustomAlert';
import PaymentMethod from './src/screen/PaymentMethod';
import RideDetail from './src/screen/RideDetail';
import ResetPassword from './src/screen/ResetPassword';


const bottomTabStack = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

const bottomStackScreen = () => {
  return (
    <bottomTabStack.Navigator
      barStyle={{ backgroundColor: '#ffff' }}
      shifting={false}
      activeColor='#38ef7d'
      inactiveColor='black'>

      <bottomTabStack.Screen options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={'home-outline'} size={26} color={color} />
        ),
      }} name="Dashboard" component={Dashboard} />

      <bottomTabStack.Screen options={{
        tabBarLabel: 'History',
        title: 'History',
            headerShown: true,
            headerTransparent: true,
            headerTitleStyle: { alignSelf: 'center', color: 'white', marginRight: 10, fontWeight: 'bold', fontSize: 25 },
            headerTintColor: 'white',
            headerBackTitle:'',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={'card-outline'} size={26} color={color} />
        ),
      }} name="History" component={History} />

      <bottomTabStack.Screen options={{
        tabBarLabel: 'Wallet',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={'wallet-outline'} size={26} color={color} />
        ),
      }} name="Wallet" component={Wallet} />

      {/* <bottomTabStack.Screen options={{
        tabBarLabel: 'Menu',
        title: 'Header title',
        tabBarIcon: ({ color, size }) => (
          <ActionButton active={true} style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            position: 'absolute',
            bottom: 10,
            right: 10,
            height: 70,
            backgroundColor: '#fff',
            borderRadius: 100,
          }}>
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Ionicons name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Ionicons name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Ionicons name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
          // <Ionicons name={'menu-outline'} size={26} color={color} />
        ),
      }} name="Menu" component={Menu} /> */}

    </bottomTabStack.Navigator>

  );
}


const App: () => Node = () => {

  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Home" children={bottomStackScreen} />
          <Stack.Screen name="WorkRide" component={WorkRide} options={{
            title: 'Scheduled Rides',
            headerShown: true,
            headerTransparent: true,
            headerTitleStyle: { alignSelf: 'center', color: 'white', marginRight: 10, fontWeight: 'bold', fontSize: 25 },
            headerTintColor: 'white',
            headerBackTitle:''
          }} />
          <Stack.Screen name="CustomAlert" component={CustomAlert} />
          <Stack.Screen name="Verification" component={VerificationCode} options={{
            title: 'Verification',
            headerShown: true,
            headerTransparent: true,
            headerTitleStyle: { alignSelf: 'center', color: 'white', marginRight: 10, fontWeight: 'bold', fontSize: 25 },
            headerTintColor: 'white',
            headerBackTitle:''

          }} />

          <Stack.Screen name="PersonalRide" component={PersonalRide} options={{
            title: 'Booking Now',
            headerShown: true,
            headerTransparent: true,
            headerBackTitle:'',
            headerTitleStyle: { alignSelf: 'center', color: 'black', marginRight: 15, fontWeight: 'bold', fontSize: 25 },

          }} />

          <Stack.Screen name="RideDetail" component={RideDetail} options={{
            title: 'Ride Detail',
            headerShown: true,
            headerTransparent: true,
            headerBackTitle:'',
            headerTitleStyle: { alignSelf: 'center', color: 'black', marginRight: 15, fontWeight: 'bold', fontSize: 25 },

          }} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{
            title: 'Forget Password',
            headerShown: true,
            headerTransparent: true,
            headerTitleStyle: { alignSelf: 'center', color: 'white', marginRight: 10, fontWeight: 'bold', fontSize: 25 },
            headerTintColor: 'white',
            headerBackTitle:''
          }} />
          <Stack.Screen name="Schedule" component={ScheduleRide} options={{
            title: 'Schedule Date',
            headerShown: true,
            headerTransparent: true,
            headerTitleStyle: { alignSelf: 'center', color: 'white', marginRight: 10, fontWeight: 'bold', fontSize: 25 },
            headerTintColor: 'white',
            headerBackTitle:''
          }} />

          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{
            title: 'Reset Password',
            headerShown: true,
            headerTransparent: true,
            headerTitleStyle: { alignSelf: 'center', color: 'white', marginRight: 10, fontWeight: 'bold', fontSize: 25 },
            headerTintColor: 'white',
            headerBackTitle:''
          }} />

          <Stack.Screen name="Booking" component={BookingRide} options={{
            title: 'Ride Options',
            headerShown: true,
            headerTransparent: true,
            headerTitleStyle: { alignSelf: 'center', color: 'black', marginRight: 10, fontWeight: 'bold', fontSize: 25 },
            headerTintColor: 'black',
            headerBackTitle:''
          }} />

          <Stack.Screen name="Payment" component={PaymentMethod} options={{
            title: 'Payment Method',
            headerShown: true,
            headerTransparent: true,
            headerTitleStyle: { alignSelf: 'center', color: 'white', marginRight: 10, fontWeight: 'bold', fontSize: 25 },
            headerTintColor: 'white',
            headerBackTitle:''
          }} />


        </Stack.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default App;
