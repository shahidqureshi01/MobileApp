import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DeckListView from './DeckListView'
import DeckDetail from './DeckDetail'
import { StackNavigator, TabNavigator } from 'react-navigation'

const Stack = StackNavigator({
  DeckListView: {
    screen: DeckListView
  },
  DeckDetail: {
    screen: DeckDetail
  },
})


export default class Home extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Stack />
      </View>
    );
  }
}

