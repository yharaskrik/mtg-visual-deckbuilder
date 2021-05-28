import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Card } from '@mtg/scryfall-api';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'mtg-card-search-ui',
  templateUrl: './card-search-ui.component.html',
  styleUrls: ['./card-search-ui.component.scss'],
})
export class CardSearchUiComponent {
  @Input() results!: Card[];

  @Input() resultsLoading = false;

  @Output() readonly queryCards: EventEmitter<string>;

  @Output() readonly addCard: EventEmitter<Card>;

  @ViewChild(NgSelectComponent) cardSelect!: NgSelectComponent;

  search = '';

  constructor() {
    this.queryCards = new EventEmitter<string>();
    this.addCard = new EventEmitter<Card>();
  }

  cardSelected($event: Card): void {
    if ($event) {
      this.addCard.emit($event);
      this.cardSelect.clearModel();
    }
  }

  searchCards(search: { term: string }): void {
    this.queryCards.emit(search.term);
  }
}
