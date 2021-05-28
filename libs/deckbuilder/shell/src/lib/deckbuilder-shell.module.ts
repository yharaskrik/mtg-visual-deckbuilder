import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardSearchModule } from '@mtg/card-search';
import { DeckbuilderStateModule } from '@mtg/store';
import { ReactiveComponentModule } from '@ngrx/component';
import { DeckbuilderShellUiModule } from './deckbuilder-shell-ui/deckbuilder-shell-ui.module';
import { DeckbuilderShellComponent } from './deckbuilder-shell.component';

@NgModule({
  imports: [
    CommonModule,
    DeckbuilderStateModule,
    DeckbuilderShellUiModule,
    ReactiveComponentModule,
    CardSearchModule,
  ],
  declarations: [DeckbuilderShellComponent],
})
export class DeckbuilderShellModule {}
