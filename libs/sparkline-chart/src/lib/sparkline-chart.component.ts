import { Component, HostBinding, Input } from '@angular/core';
import { Point } from './types';
import { createLinearScale, getBounds } from './utils';

@Component({
  selector: 'mtg-sparkline-chart',
  template: `<svg
    [attr.width]="width"
    [attr.height]="height"
    [style.left.px]="-margin"
    [style.top.px]="-margin"
  >
    <svg:g mtg-sparkline-area [points]="computedPoints"></svg:g>
    <svg:g mtg-sparkline-line [points]="computedPoints"></svg:g>
    <svg:g mtg-sparkline-dots [points]="computedPoints"></svg:g>
  </svg>`,
  styles: [
    `
      :host {
        position: relative;
        display: block;
      }
      svg {
        position: absolute;
      }
    `,
  ],
})
export class SparklineChartComponent {
  margin = 10;
  width = 500;
  height = 120;
  computedPoints: Point[] = [];

  @HostBinding('style.width.px') get containerWidth() {
    return this.width - this.margin * 2;
  }

  @HostBinding('style.height.px') get containerHeight() {
    return this.height - this.margin * 2;
  }

  @Input() set points(points: Point[]) {
    const { margin, width, height } = this;
    const bounds = getBounds(points);
    const scaleX = createLinearScale(
      [bounds.minX, bounds.maxX],
      [margin, width - margin]
    );
    const scaleY = createLinearScale(
      [bounds.minY, bounds.maxY],
      [height - margin, margin]
    );

    this.computedPoints = points.map((point) => {
      return {
        tooltip: point.tooltip,
        x: scaleX(point.x),
        y: scaleY(point.y),
      };
    });
  }
}
