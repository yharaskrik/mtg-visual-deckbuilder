import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { PwaUpdateComponent } from './pwa-update.component';
import { PwaInitializer } from './pwa-update.initializer';
import { PwaReducer, PwaUpdateEffects } from './store';
import { PageVisibilityDirective } from './directives';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    StoreModule.forFeature('pwaState', PwaReducer),
    EffectsModule.forFeature([PwaUpdateEffects]),
  ],
  declarations: [PwaUpdateComponent, PageVisibilityDirective],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: PwaInitializer,
      multi: true,
      deps: [Store, SwUpdate],
    },
  ],
})
export class PwaUpdateModule {
  constructor(snackBar: MatSnackBar) {
    snackBar.openFromComponent(PwaUpdateComponent);
  }
}
