import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { purple, white, black } from '../utils/colors'
import { addCardToDeck } from '../utils/helpers'
import { NavigationActions, NavigationAction } from 'react-navigation'

class AddCard extends Component {

  state = {
    question: '',
    answer: ''
  }

  submit = () => {
    const { question, answer } = this.state
    if(question === ''|| answer === '') {
        Alert.alert(
        'Stop!!!',
        'You can not submit empty question or answer',
        [
          {text: 'Ask me later'},
          {text: 'Cancel'},
          {text: 'OK'},
        ],
        { cancelable: false }
      )
      return false
    }
    card = {question, answer}
    this.props.addCard(card, this.props.screenProps )
    addCardToDeck(this.props.screenProps, card)
    this.props.navigation.goBack()
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddCard'}))
  }

  render() { 
    const { question, answer } = this.state

    return (
      <View style={styles.container}>
        <Text style={{marginTop: 20}}>Question:</Text>
        <TextInput style={styles.input} value={question} onChangeText={(question) => this.setState({question})}/>
        <Text>Answer:</Text>
        <TextInput style={styles.input} value={answer} onChangeText={(answer) => this.setState({answer})}/>
        <TouchableOpacity style={styles.iosSubmitBtn} onPress={this.submit}>
          <Text style={[styles.center, {color: white}]}>Sumbit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
    input: {
    borderRadius: 7,
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 300
  },
})

function mapStateToProps (decks, { screenProps } ) {
  return {
    screenProps
  }
}

function mapDispatchToProps(dispatch, { screenProps }) {
  return {
     addCard: (card, deckId) => dispatch(addCard(card, deckId)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCard)