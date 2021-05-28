import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  DeckbuilderShellComponent,
  DeckbuilderShellModule,
} from '@mtg/deckbuilder/shell';
import { DECKBUILDER_STATE_KEY } from '@mtg/store';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [DECKBUILDER_STATE_KEY],
    rehydrate: true,
    removeOnUndefined: true,
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: DeckbuilderShellComponent,
      },
    ]),
    DeckbuilderShellModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictActionTypeUniqueness: true,
          strictStateImmutability: true,
        },
        metaReducers,
      }
    ),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
    HttpClientModule,
    HttpClientJsonpModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
