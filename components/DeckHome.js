import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import AddDeck from './AddDeck'
import DeckDetail from './DeckDetail'
import { StackNavigator, TabNavigator } from 'react-navigation'

const Stack = StackNavigator({
  AddDeck: {
    screen: AddDeck
  },
  DeckDetail: {
    screen: DeckDetail
  },
})


export default class DeckHome extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Stack />
      </View>
    );
  }
}
