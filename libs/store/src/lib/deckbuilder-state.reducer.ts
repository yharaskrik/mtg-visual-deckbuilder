import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Deck } from '@mtg/store';
import { Action, createReducer, on } from '@ngrx/store';
import { nanoid } from 'nanoid';
import {
  addCard,
  addNewDeck,
  changeSort,
  chooseDeck,
  moveColumn,
  moveInColumn,
  removeCard,
  sortCards,
  updateDeck,
} from './deckbuilder-state.actions';
import { DeckbuilderState, initialDeckbuilderState } from './deckbuilder.state';
import { createColumns, sortDeck } from './utils';

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
  on(changeSort, (state, { sortBy }) => {
    if (!state.selectedDeck) {
      return state;
    }

    const deck = getSelectedDeck(state.selectedDeck, state);

    switch (sortBy) {
      case 'cmc':
        /**
         * If the sort is being changed to cmc then just update sort order as the effect
         * will handle dispatching the sort action which will update the columns
         */
        return mergeDeckIn(
          {
            ...deck,
            sortBy,
          },
          state
        );
      case 'freeform': {
        const columns = deck.columns.slice();
        const cards = deck.cards.slice();

        columns.unshift({ name: 'Maybeboard', id: nanoid() });
        cards.unshift([]);

        return mergeDeckIn(
          {
            ...deck,
            columns,
            cards,
          },
          state
        );
      }
    }

    return state;
  }),
  on(updateDeck, (state, { update }) =>
    state.selectedDeck
      ? mergeDeckIn(
          {
            ...getSelectedDeck(state.selectedDeck, state),
            ...update,
          },
          state
        )
      : state
  ),
  on(chooseDeck, (state, { deckId }) => ({
    ...state,
    selectedDeck: deckId,
  })),
  on(sortCards, (state) => {
    if (!state.selectedDeck) {
      return state;
    }

    const deck = getSelectedDeck(state.selectedDeck, state);

    deck.cards = sortDeck(state.decks[state.selectedDeck].cards);

    return mergeDeckIn(deck, state);
  }),
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
    const cards = createColumns();
    const deck: Deck = {
      cards,
      deckId: new Date().getTime().toString(),
      name: 'Deck ' + (Object.values(state.decks).length + 1).toString(),
      columns: cards.map((value, index) => ({
        name: `Mana Value ${index}`,
        id: nanoid(),
      })),
      sortBy: 'cmc',
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

    deck.cards = [...deck.cards];

    deck.cards[card.cmc] = [...deck.cards[card.cmc]];

    deck.cards[card.cmc].push(card);

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
