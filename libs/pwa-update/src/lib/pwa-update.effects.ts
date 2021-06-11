import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { PwaUpdateComponent } from '@mtg/pwa-update';
import { createEffect, EffectNotification, OnRunEffects } from '@ngrx/effects';
import { asyncScheduler, interval, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

const PERIOD = 1000 * 60 * 30; // 30m interval between checks

@Injectable()
export class PwaUpdateEffects implements OnRunEffects {
  readonly checkForUpdate$ = createEffect(
    () => ({ period = PERIOD, scheduler = asyncScheduler } = {}) =>
      interval(period, scheduler).pipe(
        tap(() => this.swUpdate.checkForUpdate())
      ),
    { dispatch: false }
  );

  readonly updateAvailable$ = createEffect(
    () =>
      this.swUpdate.available.pipe(
        tap(() => this.dialog.open(PwaUpdateComponent, { disableClose: true })),
        take(1),
      ),
    { dispatch: false }
  );

  constructor(private swUpdate: SwUpdate, private dialog: MatDialog) {}

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>) {
    return resolvedEffects$;
  }
}
