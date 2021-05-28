import { Card } from '@mtg/scryfall-api';

export const DECKBUILDER_STATE_KEY = 'deckbuilderState';

export interface Deck {
  deckId: string;
  name: string;
  cards: Card[][];
}

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

export interface DeckbuilderState {
  decks: Record<string, Deck>;
  selectedDeck?: string;
}

export const initialDeckbuilderState: DeckbuilderState = {
  decks: {},
  selectedDeck: undefined,
};
