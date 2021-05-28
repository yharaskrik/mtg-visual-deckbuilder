import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CardSearchUiComponent } from './card-search-ui.component';

@NgModule({
  declarations: [CardSearchUiComponent],
  imports: [FormsModule, NgSelectModule, CommonModule],
  exports: [CardSearchUiComponent],
})
export class CardSearchUiModule {}
