import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngrx/store';
import { PwaState, pwaEnabled } from './pwa-update.store';


export const PwaInitializer = (store: Store<PwaState>, sw: SwUpdate) => {
  return () => store.dispatch(pwaEnabled({ enabled: sw.isEnabled }))
}
