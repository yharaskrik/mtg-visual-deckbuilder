import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardSearchModule } from '@mtg/card-search';
import { SparklineChartModule } from '@mtg/sparkline-chart';
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
    FormsModule,
    SparklineChartModule,
  ],
  declarations: [DeckbuilderShellComponent],
})
export class DeckbuilderShellModule {}
