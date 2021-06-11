import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'mtg-pwa-update',
  templateUrl: './pwa-update.component.html',
  styleUrls: ['./pwa-update.component.scss'],
})
export class PwaUpdateComponent {
  constructor(private sw: SwUpdate) {}

  update() {
    this.sw.activateUpdate().then(() => location.reload());
  }
}
