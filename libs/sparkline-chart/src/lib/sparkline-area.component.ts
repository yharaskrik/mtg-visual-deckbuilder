import { Component, Input } from '@angular/core';
import { Point } from './types';
import { getPathCommandsForPolygon } from './utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg:g[mtg-sparkline-area]',
  template: `
    <svg:defs>
      <svg:linearGradient id="sparkline-gradient" x1="0" x2="0" y1="0" y2="1">
        <svg:stop offset="0%" stop-opacity="60%" />
        <svg:stop offset="100%" stop-opacity="0%" />
      </svg:linearGradient>
    </svg:defs>
    <svg:path [attr.d]="d" />
  `,
  styles: [
    `
      stop {
        stop-color: #51beff;
      }
      path {
        fill: url(#sparkline-gradient);
        opacity: 0.3;
      }
    `,
  ],
})
export class SparklineAreaComponent {
  d = '';

  @Input() set points(points: Point[]) {
    this.d = getPathCommandsForPolygon(points);
  }
}
