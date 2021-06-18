import { createAction, props } from '@ngrx/store';

export const ActionTypes = {
  PWA_ENABLED: '[pwa-update/enabled] PWA enabled',
};

export const pwaEnabled = createAction(
  ActionTypes.PWA_ENABLED,
  props<{ enabled: boolean }>()
);
