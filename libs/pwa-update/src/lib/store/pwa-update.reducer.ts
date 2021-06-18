import { Action, createReducer, on } from '@ngrx/store';
import { pwaEnabled } from './pwa-update.actions';

export interface PwaState {
  enabled: boolean;
}

export const initialState: PwaState = {
  enabled: false,
};

const _pwaReducer = createReducer(
  initialState,
  on(pwaEnabled, (state, { enabled }) => ({ ...state, enabled }))
);

export const PwaReducer = (state: PwaState, action: Action) => {
  return _pwaReducer(state, action);
};
