import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Dashboard from '../screen/Dashboard/Dashboard'

const Home =()=> {

    return (
      <SafeAreaView style={{
        flex: 1, backgroundColor: '#38ef7d'
      }}>
      <Dashboard />
      </SafeAreaView>
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Home;