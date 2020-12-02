import { getDecks } from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  decks,
})

export const addDeck = (title) => ({
  type: ADD_DECK,
  title
})


export const addCardToDeck = (deckId, question, answer) => ({
  type: ADD_CARD,
  deckId,
  question,
  answer,
})

export const handleInitialData = () =>
  dispatch => getDecks()
    .then(decks => dispatch(receiveDecks(decks)))
    .catch(err => console.error(err));