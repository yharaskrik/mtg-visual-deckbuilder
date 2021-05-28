import { Injectable } from '@angular/core';
import { Card } from '@mtg/scryfall-api';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addCard,
  addNewDeck,
  moveColumn,
  moveInColumn,
  removeCard,
} from './deckbuilder-state.actions';
import { selectDeckCards } from './deckbuilder-state.selectors';
import { MoveColumnEvent, MoveInColumnEvent } from './deckbuilder.state';

@Injectable({ providedIn: 'root' })
export class DeckbuilderStateFacade {
  constructor(private _store: Store) {}

  selectDeckCards(): Observable<Card[][] | undefined> {
    return this._store.pipe(select(selectDeckCards));
  }

  moveInColumn($event: MoveInColumnEvent): void {
    this._store.dispatch(moveInColumn($event));
  }

  moveColumn($event: MoveColumnEvent): void {
    this._store.dispatch(moveColumn($event));
  }

  addCard(card: Card): void {
    this._store.dispatch(addCard({ card }));
  }

  addDeck(): void {
    this._store.dispatch(addNewDeck());
  }

  removeCard($event: { column: number; index: number }): void {
    this._store.dispatch(removeCard($event));
  }
}
