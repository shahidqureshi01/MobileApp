import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { purple, white, red, gray, green } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { NavigationActions } from 'react-navigation'


class Quiz extends Component {

  constructor(props){
    super(props)
    this.handleClick = this.handlePress.bind(this)
    this.flipCard = this.flipCard.bind(this)
  }

  state = {
    questionIndex: 0,
    flipped: false,
    score: 0,
    end: false
  }

  componentDidMount(){
    clearLocalNotification()
    .then(setLocalNotification)
  }

  flipCard = () => {
    this.setState({flipped: !this.state.flipped})
  }

  handlePress = (result, len) => {
    if(this.state.questionIndex < len) {
      if(result === 'correct') {
        this.setState({
          score: this.state.score + 1,
        })
      }
      this.setState({
        flipped: false, 
        questionIndex: this.state.questionIndex+1 
      })
    } else {
      this.setState({end: true})
    }
  }

  restart = () => {
    this.setState({
      questionIndex: 0,
      flipped: false,
      score: 0,
    })
  }

  render() { 
    const deckId = this.props.screenProps
    const deck = this.props.decks[deckId] 
    const deckLength = this.props.decks[deckId].questions.length
    const { questionIndex, flipped, end, score } = this.state

    if(end === true ) {
      return(
        <View>
          <Text>Score1 is: {score}</Text>
        </View>
      )
    }
    if(questionIndex < deckLength) {
      return (
        <View style={styles.container}>
          <Text>{questionIndex+1}/{deck.questions.length}</Text>
          {flipped === true? 
            <View>
              <Text style={styles.bigText}>{deck.questions[questionIndex].answer}</Text>
              <Text onPress={this.flipCard} style={styles.ansLink}>Question</Text>
            </View>
            : 
            <View>
              <Text style={styles.bigText}>{deck.questions[questionIndex].question}</Text>
              <Text onPress={this.flipCard} style={styles.ansLink}>Answer</Text>
            </View>
          }
          <TouchableOpacity style={styles.iosBtn} onPress={() => this.handlePress('correct', deckLength)}>
            <Text style={styles.center}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.iosBtn,{backgroundColor: red}]} 
            onPress={() => this.handlePress('Incorrect', deckLength)}
          >
            <Text style={styles.center}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return(
        <View style={styles.container}>
        <Text style={styles.bigText}>Score is: {score}</Text>
          <TouchableOpacity 
            style={[styles.iosBtn,{marginLeft: 10,marginRight: 10}]} 
            onPress={() => this.restart()}>
              <Text style={styles.center}>Restart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iosBtn]} onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.center}>Back</Text>
          </TouchableOpacity>
        </View >
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bigText: {
    fontSize: 22,
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  ansLink: {
    fontSize: 18,
    color: red,
    marginBottom: 30,
    marginRight: 40,
    marginLeft: 40,
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
    backgroundColor: green,
  },
  center: {
    flex: 1,
    color: white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Quiz)