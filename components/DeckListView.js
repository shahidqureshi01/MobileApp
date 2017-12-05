import React, { Component } from 'react'
import { 
	View, Text, StyleSheet, TouchableHighlight, TouchableOpacity
} from 'react-native'
import { fetchDeckResults } from '../utils/helpers'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { gray } from '../utils/colors'


class DeckListView extends Component {
  
  state = {
    ready: false,
  }

	componentDidMount() {
		fetchDeckResults()
		.then(decks => {
			this.props.dispatch(receiveDecks(decks))
		})
		.then(() => this.setState(() => ({ready: true})))
	}

	render() {
		const { decks } = this.props
    const { ready } = this.state

    if(ready === false) {
      return (<Text>Loading</Text>)
    }

		return (
			<View style={styles.container}>
				<Text style={styles.header}>DECKS</Text>
				{Object.keys(decks).map(key=>{
					let { title, questions } = decks[key]
					return (
						<View key={key} style={styles.deck} >
							<TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetail',decks[key])}>
								<View style={styles.deck}>
									<View style={styles.text}>
										<Text style={styles.big}>{title}</Text>
										<Text>{questions.length} cards</Text>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					)
				})}
			</View>
		) // end of return 
	}
}



const styles = StyleSheet.create({
  container: {
  	flex: 1,
  	alignItems: 'stretch',
  },
  header: {
  	marginTop: 20,
  	marginBottom: 20,
  	marginLeft: 30
  },
  deck: { 
   	borderRadius: 0,
  	borderWidth: 0.5,
  	borderColor: gray,
  	height: 100,
  },
  text: {
  	flex: 1,
  	alignItems: 'center',
  	marginTop: 30,
  	marginBottom: 30
  },
  big: {
  	fontSize: 15,
  	fontWeight: 'bold'
  }
});

const mapStateToProps = decks => ({ decks });

export default connect(mapStateToProps)(DeckListView)