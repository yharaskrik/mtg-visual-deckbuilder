import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createChildSelectors } from 'ngrx-child-selectors';
import {
  DeckbuilderState,
  DECKBUILDER_STATE_KEY,
  initialDeckbuilderState,
} from './deckbuilder.state';
import { DeckInfo } from './types';
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
  (decks, selectSelectedDeck) => {
    if (selectSelectedDeck && decks[selectSelectedDeck]) {
      return decks[selectSelectedDeck];
    }

    return undefined;
  }
);

export const selectDeckInfo = createSelector(selectDeck, (deck) => {
  if (deck) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { columns, ...deckInfo } = deck;

    return deckInfo as DeckInfo;
  }

  return undefined;
});

export const selectDeckColumns = createSelector(
  selectDeck,
  (deck) => deck?.columns ?? []
);

export const selectAllCards = createSelector(selectDeckColumns, (columns) =>
  columns.map((column) => column.cards ?? []).flat()
);

export const selectTotalCards = createSelector(selectAllCards, (cards) =>
  cards ? cards.length : 0
);

export const selectAverageManaValue = createSelector(
  selectAllCards,
  selectTotalCards,
  (cards, total) =>
    total
      ? Math.floor(
          (cards.flat().reduce((prev, cur) => prev + cur.cmc, 0) / total) * 100
        ) / 100
      : 0
);

export const selectColourRatios = createSelector(
  selectTotalCards,
  selectAllCards,
  (total, cards) => {
    const colourTotals: ColourTotal = emptyColourTotal();

    joinColourMap(colourTotals, calcColumnColours(cards));

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

export const selectCurve = createSelector(
  selectDeckColumns,
  selectAllCards,
  (columns, cards) => {
    const sortedCards = sortDeck(columns, cards);

    return sortedCards.map((column, index) => ({
      x: index,
      y: (column.cards ?? []).length,
      tooltip: `${column.cards.length} cards at ${index} mana value.`,
    }));
  }
);
