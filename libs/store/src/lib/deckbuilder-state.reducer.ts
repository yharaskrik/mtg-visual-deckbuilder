import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Action, createReducer, on } from '@ngrx/store';
import {
  addCard,
  addNewDeck,
  moveColumn,
  moveInColumn,
  removeCard,
} from './deckbuilder-state.actions';
import {
  Deck,
  DeckbuilderState,
  initialDeckbuilderState,
} from './deckbuilder.state';
import { createColumns } from './utils';

function getSelectedDeck(deckId: string, state: DeckbuilderState): Deck {
  return { ...state.decks[deckId] };
}

function mergeDeckIn(deck: Deck, state: DeckbuilderState): DeckbuilderState {
  return {
    ...state,
    decks: {
      ...state.decks,
      [deck.deckId]: deck,
    },
  };
}

const reducer = createReducer<DeckbuilderState>(
  initialDeckbuilderState,
  on(removeCard, (state, { column, index }) => {
    if (!state.selectedDeck) {
      return state;
    }

    const deck = getSelectedDeck(state.selectedDeck, state);

    const newColumn = deck.cards[column].slice();
    newColumn.splice(index, 1);

    deck.cards = deck.cards.slice();
    deck.cards[column] = newColumn;

    return mergeDeckIn(deck, state);
  }),
  on(addNewDeck, (state) => {
    const deck: Deck = {
      cards: createColumns(),
      deckId: new Date().getTime().toString(),
      name: new Date().getTime().toString(),
    };
    return mergeDeckIn(deck, {
      ...state,
      selectedDeck: state.selectedDeck ?? deck.deckId,
    });
  }),
  on(addCard, (state, { card }) => {
    if (!state.selectedDeck) {
      return state;
    }

    const deck: Deck = getSelectedDeck(state.selectedDeck, state);

    deck.cards = [
      [...(deck.cards.length ? deck.cards[0] : []), card],
      ...deck.cards.slice(1),
    ];

    return mergeDeckIn(deck, state);
  }),
  on(moveInColumn, (state, { previousIndex, currentIndex, column }) => {
    if (!state.selectedDeck) {
      return state;
    }

    const deck: Deck = getSelectedDeck(state.selectedDeck, state);

    deck.cards = [...deck.cards];

    const newColumn = [...deck.cards[column]];

    moveItemInArray(newColumn, previousIndex, currentIndex);

    deck.cards[column] = newColumn;

    return mergeDeckIn(deck, state);
  }),
  on(
    moveColumn,
    (state, { currentIndex, previousIndex, currentColumn, previousColumn }) => {
      if (!state.selectedDeck) {
        return state;
      }

      const deck: Deck = getSelectedDeck(state.selectedDeck, state);

      const current = [...deck.cards[currentColumn]];
      const previous = [...deck.cards[previousColumn]];

      transferArrayItem(previous, current, previousIndex, currentIndex);

      deck.cards = [...deck.cards];
      deck.cards[currentColumn] = current;
      deck.cards[previousColumn] = previous;

      return mergeDeckIn(deck, state);
    }
  )
);

export function deckbuilderStateReducer(
  state: DeckbuilderState | undefined,
  action: Action
): DeckbuilderState {
  return reducer(state, action);
}
