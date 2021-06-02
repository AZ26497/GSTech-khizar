import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Wallet =()=>{
  return (
    <View style={styles.container}>
      <Text>Welcome To Wallet</Text>
    </View>
  )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Wallet;