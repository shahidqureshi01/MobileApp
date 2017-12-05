import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const DECK_STORAGE_KEY = 'UdaciCards:decks'
const NOTIFICATION_KEY = 'UdaciCards:notifications'

let data = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
}

export function fetchDeckResults () {
  //AsyncStorage.removeItem(DECK_STORAGE_KEY)
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then(deckResults)
}

function deckResults(results) {
  console.log('result', results)
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}

function setDummyData () {
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
  return data
}


export function saveDeckTitle(title) {
 	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: [],
    }
  }))
}

export function addCardToDeck(title, card) {
  AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then( decks => {
    console.log('hello', JSON.parse(decks))
    decks = JSON.parse(decks)
    const questions = decks[title].questions
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
      [title]: {
        questions: questions.concat(card)
      }
    }))
  })
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'Study today!',
    body: "👋 don't forget to study today!",
    ios: {
      sound: true,
    },
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
             }
        })
      }
    })
}