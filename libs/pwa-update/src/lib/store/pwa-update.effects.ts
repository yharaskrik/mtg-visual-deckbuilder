import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { PwaUpdateComponent } from '../pwa-update.component';
import { createEffect, EffectNotification, OnRunEffects } from '@ngrx/effects';
import { asyncScheduler, interval, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

const PERIOD = 1000 * 60 * 30; // 30m interval between checks when enabled

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
        tap(() => this.snackBar.openFromComponent(PwaUpdateComponent)),
        take(1),
      ),
    { dispatch: false }
  );

  constructor(private readonly swUpdate: SwUpdate, private readonly snackBar: MatSnackBar) {}

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>) {
    return resolvedEffects$;
  }
}
