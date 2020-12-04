import AsyncStorage from '@react-native-community/async-storage';
import { decks } from './_DATA';

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';


function formatDeckResults(results) {
  return results === null ? decks : JSON.parse(results);
}


export async function getDecks() {
  try {
    const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    if (storeResults === null) {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    }
    return formatDeckResults(storeResults)
  } catch (err) {
    console.log(err);
  }
}


export async function getCard(id) {
  try {
    const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    return JSON.parse(storeResults)[id];
  } catch (err) {
    console.log(err);
  }
}


export async function saveDeckTitleAS(title) {
  try {
    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: []
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
}


export async function addCardToDeckAS(id, question, answer) {
  try {
    const deck = await getCard(id);
    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [id]: {
          questions: [...deck.questions, { question, answer }]
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
}