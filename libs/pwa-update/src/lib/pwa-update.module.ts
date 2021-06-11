import { SwUpdate } from '@angular/service-worker';
import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { MatDialogModule } from '@angular/material/dialog';

import { PwaInitializer } from './pwa-update.init';
import { PwaReducer } from './pwa-update.store';
import { PwaUpdateEffects } from './pwa-update.effects';
import { PwaUpdateComponent } from './pwa-update.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    StoreModule.forFeature('pwaState', PwaReducer),
    EffectsModule.forFeature([PwaUpdateEffects]),
  ],
  declarations: [PwaUpdateComponent],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: PwaInitializer,
    multi: true,
    deps: [Store, SwUpdate]
  }]
})
export class PwaUpdateModule {}
