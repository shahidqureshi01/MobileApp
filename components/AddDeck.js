import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, StatusBar, Alert } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { purple, white, red, black } from '../utils/colors'
import { NavigationActions, NavigationAction } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons' 
import { saveDeckTitle } from '../utils/helpers'
import DeckDetail from './DeckDetail'

class AddDeck extends Component {

  state = {
    newDeck: '',
  }

  submit = () => {
    const { newDeck } = this.state
    if(newDeck === '') {
        Alert.alert(
        'Stop!!!',
        'You can not submit empty deck',
        [
          {text: 'Ask me later'},
          {text: 'Cancel'},
          {text: 'OK'},
        ],
        { cancelable: false }
      )
      return false
    }
    card = { newDeck }
    this.props.addDeck(newDeck)
    saveDeckTitle(newDeck)
    this.props.navigation.navigate('DeckDetail',{title: newDeck})
  }

  render() { 
    const { newDeck } = this.state
    return (
      <View style={styles.container}>
        <Text style={{marginTop: 50}}>Add Deck</Text>
        <Text>What is the title of your new deck?</Text>
        <TextInput style={styles.input} value={newDeck} onChangeText={(newDeck) => this.setState({newDeck})}/>
        <TouchableOpacity style={styles.iosSubmitBtn} onPress={this.submit}>
          <Text style={styles.center}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: white
  },
  header: {
    height: 50,
    width: 350,
    marginTop: 20,
    marginLeft: 20,
    borderBottomColor: red,
    borderBottomWidth: 3,
  },
  iosSubmitBtn: {
    backgroundColor: black,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
  },
  center: {
    color: white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
    input: {
    borderColor: 'black',
    borderRadius: 7,
    borderWidth: 1,
    height: 37,
    width: 250
  },
})


function mapDispatchToProps(dispatch, { screenProps }) {
  return {
     addDeck: (newDeck) => dispatch(addDeck(newDeck)),
  }
}

export default connect(null, mapDispatchToProps)(AddDeck)