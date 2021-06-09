import { Card } from '@mtg/scryfall-api';

export type SortBy = 'cmc' | 'freeform';

export interface Column {
  name: string;
  id: string;
}

export interface Deck {
  deckId: string;
  name: string;
  cards: Card[][];
  sortBy: SortBy;
  columns: Column[];
}

export type UpdateDeck = Partial<Omit<Deck, 'deckId' | 'cards' | 'columns'>>;

export type DeckInfo = Omit<Deck, 'cards'>;

export interface MoveInColumnEvent {
  previousIndex: number;
  currentIndex: number;
  column: number;
}

export interface MoveColumnEvent {
  previousIndex: number;
  currentIndex: number;
  previousColumn: number;
  currentColumn: number;
}
