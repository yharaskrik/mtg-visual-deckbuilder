import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createChildSelectors } from 'ngrx-child-selectors';
import {
  DeckbuilderState,
  DECKBUILDER_STATE_KEY,
  initialDeckbuilderState,
} from './deckbuilder.state';

export const selectDeckbuilderState = createFeatureSelector<DeckbuilderState>(
  DECKBUILDER_STATE_KEY
);

export const { selectDecks, selectSelectedDeck } = createChildSelectors(
  selectDeckbuilderState,
  initialDeckbuilderState
);

export const selectDeckList = createSelector(selectDecks, (decks) =>
  Object.values(decks)
);

export const selectDeck = createSelector(
  selectDecks,
  selectSelectedDeck,
  (decks, selectSelectedDeck) =>
    selectSelectedDeck ? decks[selectSelectedDeck] : undefined
);

export const selectDeckCards = createSelector(
  selectDeck,
  (deck) => deck?.cards
);
