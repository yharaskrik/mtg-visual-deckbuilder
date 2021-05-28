import { Card } from '@mtg/scryfall-api';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createChildSelectors } from 'ngrx-child-selectors';
import {
  DeckbuilderState,
  DECKBUILDER_STATE_KEY,
  initialDeckbuilderState,
} from './deckbuilder.state';
import {
  calcCardsColours,
  colours,
  ColourTotal,
  emptyColourTotal,
} from './utils';

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
  (deck) => deck?.cards ?? []
);

export const selectCardList = createSelector(selectDeckCards, (cards) =>
  cards.flat()
);

export const selectTotalCards = createSelector(selectDeck, (deck) =>
  deck ? deck.cards.flat().length : 0
);

export const selectAverageManaValue = createSelector(
  selectDeckCards,
  selectTotalCards,
  (cards, total) =>
    cards.flat().reduce((prev, cur) => prev + cur.cmc, 0) / total
);

export const selectColourRatios = createSelector(
  selectTotalCards,
  selectCardList,
  (total, cards: Card[]) => {
    const colourTotals: ColourTotal = emptyColourTotal();

    cards.forEach((card) => {
      const total = calcCardsColours(card);

      colours.forEach((colour) => (colourTotals[colour] += total[colour]));
    });

    const totalColourSymbols = Object.values(colourTotals).reduce(
      (prev, cur) => prev + cur,
      0
    );

    if (!totalColourSymbols) {
      return [];
    }

    return Object.entries(colourTotals).map(
      ([key, value]) =>
        `${key} - ${((value / totalColourSymbols) * 100).toFixed(1)}`
    );
  }
);
