import { Component } from '@angular/core';
import { Card } from '@mtg/scryfall-api';
import { DeckbuilderStateFacade } from '@mtg/store';
import { CardSearchStore } from './card-search.store';

@Component({
  selector: 'mtg-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss'],
})
export class CardSearchComponent {
  loading$ = this.cardSearchStore.loading$;

  results$ = this.cardSearchStore.results$;

  constructor(
    private cardSearchStore: CardSearchStore,
    private deckbuilderStateFacade: DeckbuilderStateFacade
  ) {}

  search(query: string): void {
    this.cardSearchStore.searchCards(query);
  }

  addCard(card: Card): void {
    this.deckbuilderStateFacade.addCard(card);
  }
}
