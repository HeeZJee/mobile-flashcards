import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
} from '../actions/index';
import { decks as INITIAL_STATE } from '../utils/_DATA';

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      const { decks } = action
      return {
        ...state,
        ...decks
      };

    case ADD_DECK:
      const { title } = action;
      console.log('action--', action)
      return {
        ...state,
        [title]: {
          title,
          questions: []
        }
      };

    case ADD_CARD:
      const { deckId, question, answer } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: [...state[deckId].questions, { question, answer }]
        }
      };
    default:
      return state;
  }
}
