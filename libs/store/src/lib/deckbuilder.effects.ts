import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { changeSort, sortCards } from './deckbuilder-state.actions';

@Injectable()
export class DeckbuilderEffects {
  sortByChanged$ = createEffect(() =>
    this._actions$.pipe(
      ofType(changeSort),
      switchMap((action) => (action.sortBy === 'cmc' ? of(sortCards()) : EMPTY))
    )
  );

  constructor(private _actions$: Actions) {}
}
