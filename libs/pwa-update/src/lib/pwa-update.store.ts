import { Action, createAction, createReducer, on, props } from '@ngrx/store';

export interface PwaState {
  enabled: boolean;
}

export const initialState: PwaState = {
  enabled: false,
};

export const ActionTypes = {
  PWA_ENABLED: '[pwa-update/enabled] PWA enabled',
};

export const pwaEnabled = createAction(
  ActionTypes.PWA_ENABLED,
  props<{ enabled: boolean }>()
);

const _pwaReducer = createReducer(
  initialState,
  on(pwaEnabled, (state, { enabled }) => ({ ...state, enabled }))
);

export const PwaReducer = (state: PwaState, action: Action) => {
  return _pwaReducer(state, action);
};
