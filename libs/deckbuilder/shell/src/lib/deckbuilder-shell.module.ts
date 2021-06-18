import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CardSearchModule } from '@mtg/card-search';
import { PwaUpdateModule } from '@mtg/pwa-update';
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
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    PwaUpdateModule,
  ],
  declarations: [DeckbuilderShellComponent],
})
export class DeckbuilderShellModule {}
