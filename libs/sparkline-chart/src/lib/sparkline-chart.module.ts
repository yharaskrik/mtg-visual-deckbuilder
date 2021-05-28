import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SparklineAreaComponent } from './sparkline-area.component';
import { SparklineChartComponent } from './sparkline-chart.component';
import { SparklineDotsComponent } from './sparkline-dots.component';
import { SparklineLineComponent } from './sparkline-line.component';

@NgModule({
  imports: [CommonModule, MatTooltipModule],
  declarations: [
    SparklineChartComponent,
    SparklineDotsComponent,
    SparklineLineComponent,
    SparklineAreaComponent,
  ],
  exports: [SparklineChartComponent],
})
export class SparklineChartModule {}
