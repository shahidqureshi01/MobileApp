import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import DeckHome from './components/DeckHome'
import Home from './components/Home'
import DeckDetail from './components/DeckDetail'
import { Platform } from 'react-native';
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons' 

const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  }, 
  DeckHome: {
    screen: DeckHome,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

export default Tabs