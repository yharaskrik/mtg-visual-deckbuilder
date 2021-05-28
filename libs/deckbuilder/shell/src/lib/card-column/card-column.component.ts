import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '@mtg/scryfall-api';

@Component({
  selector: 'mtg-card-column',
  templateUrl: './card-column.component.html',
  styleUrls: ['./card-column.component.scss'],
})
export class CardColumnComponent {
  @Input() cards!: Card[];

  @Input() column!: number;

  @Output() readonly drop: EventEmitter<
    CdkDragDrop<{ items: Card[]; index: number }>
  >;

  @Output() readonly removeCard: EventEmitter<number>;

  constructor() {
    this.removeCard = new EventEmitter<number>();
    this.drop = new EventEmitter<
      CdkDragDrop<{ items: Card[]; index: number }>
    >();
  }

  removeClick(index: number): void {
    this.removeCard.emit(index);
  }
}
