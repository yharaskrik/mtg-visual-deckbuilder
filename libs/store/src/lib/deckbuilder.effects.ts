import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { saveAs } from 'file-saver';
import { EMPTY, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { changeSort, exportDeck, sortCards } from './deckbuilder-state.actions';
import { selectDeck } from './deckbuilder-state.selectors';

@Injectable()
export class DeckbuilderEffects {
  sortByChanged$ = createEffect(() =>
    this._actions$.pipe(
      ofType(changeSort),
      switchMap((action) => (action.sortBy === 'cmc' ? of(sortCards()) : EMPTY))
    )
  );

  exportDeck$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(exportDeck),
        concatLatestFrom(() => this._store.select(selectDeck)),
        tap(([, deck]) => {
          if (deck) {
            const version = 1;
            const file = new File(
              [JSON.stringify({ deck, version })],
              `${deck.name
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '_')}-${version}.json`,
              {
                type: 'text/plain;charset=utf-8',
              }
            );
            saveAs(file);
          }
        })
      ),
    { dispatch: false }
  );

  constructor(private _actions$: Actions, private _store: Store) {}
}
