import { Card } from '@mtg/scryfall-api';
import { createAction, props } from '@ngrx/store';
import { MoveColumnEvent, MoveInColumnEvent } from './deckbuilder.state';

export const moveColumn = createAction(
  '[@mtg/deckbuilder/move/card/column] Move card from one column to another',
  props<MoveColumnEvent>()
);

export const moveInColumn = createAction(
  '[@mtg/deckbuilder/move/card/index] Move card inside a single column',
  props<MoveInColumnEvent>()
);

export const addCard = createAction(
  '[@mtg/deckbuilder/add/card] Add card to deck',
  props<{ card: Card }>()
);

export const addNewDeck = createAction(
  '[@mtg/deckbuilder/add/deck] Add a new deck'
);
