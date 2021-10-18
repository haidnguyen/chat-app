import { Message } from '@app/models/message';
import { except } from '@app/utils/array';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import update from 'immutability-helper';
import { doFetchLatestMessagesRejected } from '.';

import {
  doFetchLatestMessages,
  doFetchLatestMessagesFulfilled,
} from './message.action';

export interface MessageState extends EntityState<Message> {
  loadingActions: string[];
  errorMessage: string | null;
}

export const FEATURE_KEY = 'message';
export const adapter = createEntityAdapter<Message>({
  selectId: entity => entity.messageId,
});
export const initialState: MessageState = adapter.getInitialState({
  loadingActions: [],
  errorMessage: null,
});

const _messageReducer = createReducer(
  initialState,
  on(doFetchLatestMessages, (state, { type }) =>
    update(state, {
      loadingActions: { $push: [type] },
      errorMessage: { $set: null },
    }),
  ),
  on(doFetchLatestMessagesFulfilled, (state, { type, messages }) =>
    adapter.addMany(
      messages,
      update(state, {
        loadingActions: except(type),
      }),
    ),
  ),
  on(doFetchLatestMessagesRejected, (state, { error }) =>
    update(state, {
      errorMessage: { $set: error },
    }),
  ),
);

export function reducer(state: MessageState | undefined, action: Action) {
  return _messageReducer(state, action);
}
