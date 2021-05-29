import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { deckbuilderStateReducer } from './deckbuilder-state.reducer';
import { DeckbuilderEffects } from './deckbuilder.effects';
import { DECKBUILDER_STATE_KEY } from './deckbuilder.state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(DECKBUILDER_STATE_KEY, deckbuilderStateReducer),
    EffectsModule.forFeature([DeckbuilderEffects]),
  ],
})
export class DeckbuilderStateModule {}
