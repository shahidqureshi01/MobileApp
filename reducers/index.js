
import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION, ADD_CARD } from '../actions'

function reducer (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_CARD:
    return {
      ...state,
      [deckId]: {
        title: deckId,
        questions: state[deckId].questions.concat(action.card)
      }
    }
    case ADD_DECK :
      return {
        ...state,
        [action.newDeck]: {
          title: action.newDeck,
          questions: []
        }
      }
    default :
      return state
  }
}

export default reducer