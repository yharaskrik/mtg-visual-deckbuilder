import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '@mtg/scryfall-api';
import {
  Column,
  DeckInfo,
  MoveColumnEvent,
  MoveInColumnEvent,
} from '@mtg/store';

@Component({
  selector: 'mtg-deckbuilder-shell-ui',
  templateUrl: './deckbuilder-shell-ui.component.html',
  styleUrls: ['./deckbuilder-shell-ui.component.scss'],
})
export class DeckbuilderShellUiComponent {
  @Input() columns!: Column[];

  @Input() deck!: DeckInfo;

  @Output()
  moveColumn: EventEmitter<MoveColumnEvent> = new EventEmitter<MoveColumnEvent>();

  @Output()
  moveInColumn: EventEmitter<MoveInColumnEvent> = new EventEmitter<MoveInColumnEvent>();

  @Output() removeCard: EventEmitter<{
    column: number;
    index: number;
  }> = new EventEmitter<{ column: number; index: number }>();

  drop(event: CdkDragDrop<{ items: Card[]; index: number }>) {
    if (event.previousContainer === event.container) {
      this.moveInColumn.emit({
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
        column: event.container.data.index,
      });
    } else {
      this.moveColumn.emit({
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
        previousColumn: event.previousContainer.data.index,
        currentColumn: event.container.data.index,
      });
    }
  }

  removeClick(column: number, index: number): void {
    this.removeCard.emit({ column, index });
  }

  trackColumn(index: number, column: Column): string {
    return column.id;
  }
}
