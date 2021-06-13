import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManaCostComponent } from './mana-cost.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ManaCostComponent],
  exports: [ManaCostComponent],
})
export class ManaCostModule {}
