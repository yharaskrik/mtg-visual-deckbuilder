import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'mtg-pwa-update',
  templateUrl: './pwa-update.component.html',
  styleUrls: ['./pwa-update.component.scss'],
})
export class PwaUpdateComponent implements OnInit {
  constructor(
    private readonly sw: SwUpdate,
    public readonly snackBarRef: MatSnackBarRef<PwaUpdateComponent>
  ) {}

  update(): void {
    this.sw.activateUpdate().then(() => location.reload());
  }

  ngOnInit(): void {
    this.snackBarRef.onAction().subscribe(() => this.update());
  }
}
