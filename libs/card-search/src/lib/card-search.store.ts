import { Injectable } from '@angular/core';
import { Card, ScryfallApiService } from '@mtg/scryfall-api';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

export interface DeckbuilderShellState {
  loading: boolean;
  has_more?: boolean;
  next_page?: string;
  results: Card[];
}

@Injectable()
export class CardSearchStore extends ComponentStore<DeckbuilderShellState> {
  constructor(private scryfallApiService: ScryfallApiService) {
    super({
      loading: false,
      results: [],
    });
  }

  readonly results$ = this.select((state) => state.results);

  readonly loading$ = this.select((state) => state.loading);

  readonly searchCards = this.effect((query$: Observable<string>) =>
    query$.pipe(
      tap(() => this.patchState({ loading: true })),
      debounceTime(500),
      switchMap((query) =>
        this.scryfallApiService.search(query).pipe(
          tap((response) => {
            this.patchState({
              has_more: response.has_more,
              next_page: response.next_page,
              results: response.data,
            });

            this.patchState({ loading: false });
          })
        )
      )
    )
  );
}
