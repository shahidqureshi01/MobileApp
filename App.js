import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import reducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { setLocalNotification } from './utils/helpers'
import Tabs from './Tabs'



export default class App extends React.Component {
  
  componentsDidMount() {
    setLocalNotification()
  }
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <Tabs />
        </View>
      </Provider>
    );
  }
}

