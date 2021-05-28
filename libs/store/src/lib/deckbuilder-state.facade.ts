import { Injectable } from '@angular/core';
import { Card } from '@mtg/scryfall-api';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addCard,
  addNewDeck,
  chooseDeck,
  moveColumn,
  moveInColumn,
  removeCard,
  sortCards,
  updateDeck,
} from './deckbuilder-state.actions';
import {
  selectAverageManaValue,
  selectColourRatios,
  selectDeck,
  selectDeckCards,
  selectDeckList,
  selectTotalCards,
} from './deckbuilder-state.selectors';
import { Deck, MoveColumnEvent, MoveInColumnEvent } from './deckbuilder.state';

@Injectable({ providedIn: 'root' })
export class DeckbuilderStateFacade {
  constructor(private _store: Store) {}

  selectColourRatios(): Observable<string[]> {
    return this._store.pipe(select(selectColourRatios));
  }

  selectDeckCards(): Observable<Card[][] | undefined> {
    return this._store.pipe(select(selectDeckCards));
  }

  selectDecks(): Observable<Deck[]> {
    return this._store.pipe(select(selectDeckList));
  }

  selectDeck(): Observable<Deck | undefined> {
    return this._store.pipe(select(selectDeck));
  }

  selectTotalCards(): Observable<number> {
    return this._store.pipe(select(selectTotalCards));
  }

  selectAverageManaValue(): Observable<number> {
    return this._store.pipe(select(selectAverageManaValue));
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

  sortCards(): void {
    this._store.dispatch(sortCards());
  }

  chooseDeck(deckId: string): void {
    this._store.dispatch(chooseDeck({ deckId }));
  }

  updateDeck(update: Omit<Deck, 'deckId' | 'cards'>): void {
    this._store.dispatch(updateDeck({ update }));
  }
}
