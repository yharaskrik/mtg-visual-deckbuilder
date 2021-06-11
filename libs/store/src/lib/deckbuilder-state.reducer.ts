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

        columns.unshift({ name: 'Maybeboard', id: nanoid(), cards: [] });

        return mergeDeckIn(
          {
            ...deck,
            columns,
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

    // deck.columns = sortDeck(state.decks[state.selectedDeck].columns);

    deck.columns = sortDeck(
      state.decks[state.selectedDeck].columns,
      state.decks[state.selectedDeck].columns
        .map((column) => column.cards)
        .flat()
    );

    return mergeDeckIn(deck, state);
  }),
  on(removeCard, (state, { column, index }) => {
    if (!state.selectedDeck) {
      return state;
    }

    const deck = getSelectedDeck(state.selectedDeck, state);

    deck.columns = deck.columns.slice();
    deck.columns[column] = {
      ...deck.columns[column],
      cards: deck.columns[column].cards.filter((card, idx) => idx !== index),
    };

    return mergeDeckIn(deck, state);
  }),
  on(addNewDeck, (state) => {
    const cards = createColumns();
    const deck: Deck = {
      deckId: new Date().getTime().toString(),
      name: 'Deck ' + (Object.values(state.decks).length + 1).toString(),
      columns: cards.map((value, index) => ({
        name: `Mana Value ${index}`,
        id: nanoid(),
        cards: [],
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

    deck.columns = deck.columns.slice();
    deck.columns[card.cmc] = {
      ...deck.columns[card.cmc],
      cards: [...deck.columns[card.cmc].cards, card],
    };

    return mergeDeckIn(deck, state);
  }),
  on(moveInColumn, (state, { previousIndex, currentIndex, column }) => {
    if (!state.selectedDeck) {
      return state;
    }

    const deck: Deck = getSelectedDeck(state.selectedDeck, state);

    deck.columns = deck.columns.slice();

    const newColumn = deck.columns[column].cards.slice();

    moveItemInArray(newColumn, previousIndex, currentIndex);

    deck.columns[column] = {
      ...deck.columns[column],
      cards: newColumn,
    };

    return mergeDeckIn(deck, state);
  }),
  on(
    moveColumn,
    (state, { currentIndex, previousIndex, currentColumn, previousColumn }) => {
      if (!state.selectedDeck) {
        return state;
      }

      const deck: Deck = getSelectedDeck(state.selectedDeck, state);

      deck.columns = deck.columns.slice();

      const current = [...deck.columns[currentColumn].cards];
      const previous = [...deck.columns[previousColumn].cards];

      transferArrayItem(previous, current, previousIndex, currentIndex);

      deck.columns[currentColumn] = {
        ...deck.columns[currentColumn],
        cards: current,
      };
      deck.columns[previousColumn] = {
        ...deck.columns[previousColumn],
        cards: previous,
      };

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
