import { Card } from '@mtg/scryfall-api';
import { createAction, props } from '@ngrx/store';
import { MoveColumnEvent, MoveInColumnEvent } from './deckbuilder.state';

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

export const removeCard = createAction(
  '[@mtg/deckbuilder/card/remove] Remove a card',
  props<{ column: number; index: number }>()
);

export const sortCards = createAction(
  '[@mtg/deckbuilder/deck/sort] Sort cards in deck by cmc'
);
