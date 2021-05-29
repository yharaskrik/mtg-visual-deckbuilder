import { Deck } from './types';

export const DECKBUILDER_STATE_KEY = 'deckbuilderState';

export interface DeckbuilderState {
  decks: Record<string, Deck>;
  selectedDeck?: string;
}

export const initialDeckbuilderState: DeckbuilderState = {
  decks: {},
  selectedDeck: undefined,
};
