export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addCard(card, deckId) {
  return {
    type: ADD_CARD,
    card,
    deckId,
  }
}

export function addDeck(newDeck) {
  return {
    type: ADD_DECK,
    newDeck
  }
}

export function addQuestion(deck, question) {
  return {
    type: ADD_QUESTION,
    deck,
    question,
  }
}