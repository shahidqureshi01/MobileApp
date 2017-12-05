import React, { Component } from 'react'
import { 	View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { connect } from 'react-redux'
import AddCard from './AddCard'
import { white, purple } from '../utils/colors'
import { StackNavigator } from 'react-navigation'
import DeckDetailHome from './DeckDetailHome'
import Quiz from './Quiz'

const Stack = StackNavigator({
  Home: {
    screen: DeckDetailHome,
  },
  AddCard: {
  	screen: AddCard
  },
  Quiz: {
  	screen: Quiz
  },
}, 
{navigationOptions:
 {
    header: null
  }
})


class DeckDetail extends Component {

	render() {
		//debugger
		const { title } = this.props.navigation.state.params 
		const deck = this.props.decks[title]
		const cardsLength = deck.questions.length 
		return (
			<View style={styles.container}>
				<Stack screenProps={this.props.navigation.state.params.title} />
			</View>
		)
	}

}

function mapStateToProps(decks) {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(DeckDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
   iosBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    marginBottom: 10,
  },
  BtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

