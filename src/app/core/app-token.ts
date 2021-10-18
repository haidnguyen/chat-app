import { InjectionToken } from '@angular/core';

export const APP_TITLE = new InjectionToken<string>('APP_TITLE');
export const APP_GRAPHQL_ENDPOINT = new InjectionToken<string>(
  'APP_GRAPHQL_ENDPOINT',
);
export const APP_LOCAL_STORAGE_PERSIST_DEBOUNCE_TIME =
  new InjectionToken<number>('APP_LOCAL_STORAGE_PERSIST_DEBOUNCE_TIME');
