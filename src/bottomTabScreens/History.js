import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList ,StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HistoryListItem from '../component/HistoryListItem'


const History =()=> {
 
    const renderItem = ({ item }) => (
      <HistoryListItem/>
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
      <LinearGradient
        // Background Linear Gradient
        colors={['#38ef7d', '#11998e']}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={{ fontWeight: 'bold', color: 'white', height: 30 , fontSize:20, alignSelf:'center'}}>Completed Rides</Text>
          <View style={{ flex: 1, marginLeft: 10, marginRight:10, marginTop:10, marginBottom:40}}>

            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />

          </View>
        </View>
      </LinearGradient>

    )
  }


const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    justifyContent: 'space-around',
    marginTop: StatusBar.currentHeight || 20,
  },
});

export default History;