import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardColumnModule } from '../card-column/card-column.module';
import { DeckbuilderShellUiComponent } from './deckbuilder-shell-ui.component';

@NgModule({
  declarations: [DeckbuilderShellUiComponent],
  imports: [CommonModule, DragDropModule, CardColumnModule],
  exports: [DeckbuilderShellUiComponent],
})
export class DeckbuilderShellUiModule {}
