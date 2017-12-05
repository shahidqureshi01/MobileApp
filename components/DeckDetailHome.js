import React, { Component } from 'react'
import { 	View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import AddCard from './AddCard'
import { purple, white, gray, black } from '../utils/colors'
import { StackNavigator } from 'react-navigation'

class DeckDetailHome extends Component {

	render() {
    deckId = this.props.screenProps
    const deck = this.props.decks[deckId]
		return (
			<View style={styles.container}>
        <Text style={styles.big}>{deck.title}</Text>
        <Text style={styles.cardLength}>{deck.questions.length} cards</Text>
        <TouchableOpacity 
          style={styles.iosBtn} 
          onPress={() => this.props.navigation.navigate('AddCard', this.props.screenProps)}
        >
          <Text style={[styles.center, styles.BtnText, {color: black}]}>Add card</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.iosBtn, styles.BtnBG]} 
          onPress={() => this.props.navigation.navigate('Quiz', this.props.screenProps)}
        >
          <Text style={[styles.center, styles.BtnText]}>Start Quiz</Text>
        </TouchableOpacity>
			</View>
		)
    
	}
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckDetailHome);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: white ,
  },
  big: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 10,
  },
  cardLength: {
    fontSize: 20,
    marginBottom: 130,
  },
  iosBtn: {
    padding: 10,
    borderRadius: 7,
    borderColor: gray,
    borderWidth: 1,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    marginBottom: 10,
  },
  BtnText: {
    color: white,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  BtnBG: {
    backgroundColor: black,
  },
 
})

