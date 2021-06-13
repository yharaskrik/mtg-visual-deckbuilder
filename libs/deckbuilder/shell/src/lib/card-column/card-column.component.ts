import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
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

  @ViewChild('dropList') dropList!: ElementRef;

  constructor(private renderer2: Renderer2) {
    this.removeCard = new EventEmitter<number>();
    this.drop = new EventEmitter<
      CdkDragDrop<{ items: Card[]; index: number }>
    >();
  }

  removeClick(index: number): void {
    this.removeCard.emit(index);
  }

  trackCard(index: number, card: Card): string {
    return `${index}-${card.id}`;
  }

  cardLeft(): void {
    this.renderer2.removeClass(this.dropList.nativeElement, 'outline');
  }

  cardEntered(): void {
    this.renderer2.addClass(this.dropList.nativeElement, 'outline');
  }
}
