import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { CardSearchUiModule } from './card-search-ui/card-search-ui.module';
import { CardSearchComponent } from './card-search.component';
import { CardSearchStore } from './card-search.store';

@NgModule({
  imports: [CommonModule, CardSearchUiModule, ReactiveComponentModule],
  declarations: [CardSearchComponent],
  providers: [CardSearchStore],
  exports: [CardSearchComponent],
})
export class CardSearchModule {}
