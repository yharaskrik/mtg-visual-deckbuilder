import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { deckbuilderStateReducer } from './deckbuilder-state.reducer';
import { DECKBUILDER_STATE_KEY } from './deckbuilder.state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(DECKBUILDER_STATE_KEY, deckbuilderStateReducer),
  ],
})
export class DeckbuilderStateModule {}
