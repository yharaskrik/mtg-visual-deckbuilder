import { Card } from '@mtg/scryfall-api';
import {
  MoveColumnEvent,
  MoveInColumnEvent,
  SortBy,
  UpdateDeck,
} from '@mtg/store';
import { createAction, props } from '@ngrx/store';

export const moveColumn = createAction(
  '[@mtg/deckbuilder/card/move/column] Move card from one column to another',
  props<MoveColumnEvent>()
);

export const moveInColumn = createAction(
  '[@mtg/deckbuilder/card/move/index] Move card inside a single column',
  props<MoveInColumnEvent>()
);

export const addCard = createAction(
  '[@mtg/deckbuilder/card/add] Add card to deck',
  props<{ card: Card }>()
);

export const addNewDeck = createAction(
  '[@mtg/deckbuilder/deck/add] Add a new deck'
);

export const chooseDeck = createAction(
  '[@mtg/deckbuilder/deck/choose] Choose a deck',
  props<{ deckId: string }>()
);

export const updateDeck = createAction(
  '[@mtg/deckbuilder/deck/update',
  props<{ update: UpdateDeck }>()
);

export const removeCard = createAction(
  '[@mtg/deckbuilder/card/remove] Remove a card',
  props<{ column: number; index: number }>()
);

export const sortCards = createAction(
  '[@mtg/deckbuilder/deck/sort] Sort cards in deck by cmc'
);

export const changeSort = createAction(
  '[@mtg/deckbuilder/deck/change-sort] Change how the deck is sorted',
  props<{ sortBy: SortBy }>()
);

export const exportDeck = createAction(
  '[@mtg/deckbuilder/deck/export] Export deck'
);
