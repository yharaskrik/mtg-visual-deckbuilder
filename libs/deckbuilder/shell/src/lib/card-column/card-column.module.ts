import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardColumnComponent } from './card-column.component';

@NgModule({
  declarations: [CardColumnComponent],
  imports: [CommonModule, DragDropModule],
  exports: [CardColumnComponent],
})
export class CardColumnModule {}
