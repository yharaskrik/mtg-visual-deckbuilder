import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardSearchResponse } from './types';

@Injectable({ providedIn: 'root' })
export class ScryfallApiService {
  private readonly apiBase = 'https://api.scryfall.com';

  constructor(private _httpClient: HttpClient) {}

  search(query: string): Observable<CardSearchResponse> {
    return this._httpClient.get<CardSearchResponse>(
      `${this.apiBase}/cards/search`,
      {
        params: {
          q: query,
        },
      }
    );
  }
}
