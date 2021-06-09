import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Deck,
  DeckbuilderStateFacade,
  MoveColumnEvent,
  MoveInColumnEvent,
  UpdateDeck,
} from '@mtg/store';

@Component({
  selector: 'mtg-deckbuilder-shell',
  templateUrl: './deckbuilder-shell.component.html',
  styleUrls: ['./deckbuilder-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckbuilderShellComponent {
  cards$ = this.deckbuilderStateFacade.selectDeckCards();

  decks$ = this.deckbuilderStateFacade.selectDecks();

  deck$ = this.deckbuilderStateFacade.selectDeck();

  avgManaValue$ = this.deckbuilderStateFacade.selectAverageManaValue();

  totalCards$ = this.deckbuilderStateFacade.selectTotalCards();

  ratios$ = this.deckbuilderStateFacade.selectColourRatios();

  points$ = this.deckbuilderStateFacade.selectCurve();

  constructor(private deckbuilderStateFacade: DeckbuilderStateFacade) {}

  moveColumn($event: MoveColumnEvent): void {
    this.deckbuilderStateFacade.moveColumn($event);
  }

  moveInColumn($event: MoveInColumnEvent): void {
    this.deckbuilderStateFacade.moveInColumn($event);
  }

  addNewDeck(): void {
    this.deckbuilderStateFacade.addDeck();
  }

  removeCard($event: { column: number; index: number }): void {
    this.deckbuilderStateFacade.removeCard($event);
  }

  sortCards(): void {
    this.deckbuilderStateFacade.sortCards();
  }

  chooseDeck($event: Event): void {
    this.deckbuilderStateFacade.chooseDeck(($event.target as any).value);
  }

  updateDeck(update: UpdateDeck): void {
    this.deckbuilderStateFacade.updateDeck(update);
  }

  trackDeck(index: number, deck: Deck): string {
    return deck.deckId;
  }

  exportDeck(): void {
    this.deckbuilderStateFacade.exportDeck();
  }
}
