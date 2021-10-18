import * as fromMessage from './message';

export interface AppState {
  [fromMessage.FEATURE_KEY]: fromMessage.MessageState;
}

export { fromMessage };
