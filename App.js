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

      <bottomTabStack.Screen options={{
        tabBarLabel: 'Menu',
        title: 'Header title',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={'menu-outline'} size={26} color={color} />
        ),
      }} name="Menu" component={Menu} />

    </bottomTabStack.Navigator>

  );
}
const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <Header />
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
              headerTintColor: 'white'
            }} />
            <Stack.Screen name="CustomAlert" component={CustomAlert} />
            <Stack.Screen name="Verification" component={VerificationCode} />

            <Stack.Screen name="PersonalRide" component={PersonalRide} options={{
              title: 'Booking Now',
              headerShown: true,
              headerTransparent: true,
              headerTitleStyle: { alignSelf: 'center', color: 'black', marginRight: 15, fontWeight: 'bold', fontSize: 25 },

            }} />

            <Stack.Screen name="RideDetail" component={RideDetail} options={{
              title: 'Ride Detail',
              headerShown: true,
              headerTransparent: true,
              headerTitleStyle: { alignSelf: 'center', color: 'black', marginRight: 15, fontWeight: 'bold', fontSize: 25 },

            }} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="Schedule" component={ScheduleRide} options={{
              title: 'Schedule Date',
              headerShown: true,
              headerTransparent: true,
              headerTitleStyle: { alignSelf: 'center', color: 'white', marginRight: 10, fontWeight: 'bold', fontSize: 25 },
              headerTintColor: 'white'


            }} />

            <Stack.Screen name="Booking" component={BookingRide} options={{
              title: 'Ride Options',
              headerShown: true,
              headerTransparent: true,
              headerTitleStyle: { alignSelf: 'center', color: 'black', marginRight: 10, fontWeight: 'bold', fontSize: 25 },
              headerTintColor: 'black'

            }} />

            <Stack.Screen name="Payment" component={PaymentMethod} options={{
              title: 'Payment Method',
              headerShown: true,
              headerTransparent: true,
              headerTitleStyle: { alignSelf: 'center', color: 'white', marginRight: 10, fontWeight: 'bold', fontSize: 25 },
              headerTintColor: 'white'

            }} />


          </Stack.Navigator>
        </NavigationContainer>
    //   </ScrollView>
    // </SafeAreaView>
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
});

export default App;
