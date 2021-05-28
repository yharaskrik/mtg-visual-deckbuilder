import { Component } from '@angular/core';
import {
  DeckbuilderStateFacade,
  MoveColumnEvent,
  MoveInColumnEvent,
} from '@mtg/store';

@Component({
  selector: 'mtg-deckbuilder-shell',
  templateUrl: './deckbuilder-shell.component.html',
  styleUrls: ['./deckbuilder-shell.component.scss'],
})
export class DeckbuilderShellComponent {
  cards$ = this.deckbuilderStateFacade.selectDeckCards();

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
}
