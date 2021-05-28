import { Card } from '@mtg/scryfall-api';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createChildSelectors } from 'ngrx-child-selectors';
import {
  DeckbuilderState,
  DECKBUILDER_STATE_KEY,
  initialDeckbuilderState,
} from './deckbuilder.state';
import {
  calcColumnColours,
  ColourTotal,
  emptyColourTotal,
  joinColourMap,
  sortDeck,
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
  selectDeckCards,
  (total, columns: Card[][]) => {
    const colourTotals: ColourTotal = emptyColourTotal();

    columns.forEach((cards: Card[]) => {
      joinColourMap(colourTotals, calcColumnColours(cards));
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

export const selectCurve = createSelector(selectDeckCards, (cards) => {
  const sortedCards = sortDeck(cards);

  return sortedCards.map((column, index) => ({
    x: index,
    y: column.length,
    tooltip: `${column.length} cards at ${index} mana value.`,
  }));
});
