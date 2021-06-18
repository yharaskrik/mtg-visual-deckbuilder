import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngrx/store';
import { pwaEnabled, PwaState } from './store';


export const PwaInitializer = (store: Store<{ pwaState: PwaState }>, sw: SwUpdate) => {
  return () => store.dispatch(pwaEnabled({ enabled: sw.isEnabled }))
}
