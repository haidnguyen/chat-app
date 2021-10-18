import { Message } from '@app/models/message';
import { except } from '@app/utils/array';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import update from 'immutability-helper';
import {
  doFetchLatestMessagesRejected,
  doSendMessage,
  doSendMessageFulfilled,
  doSendMessageRejected,
} from '.';

import {
  doFetchLatestMessages,
  doFetchLatestMessagesFulfilled,
} from './message.action';

export interface MessageState extends EntityState<Message> {
  loadingActions: string[];
  errorMessage: string | null;
  unsentMessageIds: string[];
}

export const FEATURE_KEY = 'message';
export const adapter = createEntityAdapter<Message>({
  selectId: entity => entity.messageId,
  sortComparer: (a, b) => {
    const dateA = new Date(a.datetime);
    const dateB = new Date(b.datetime);
    return dateA.getTime() - dateB.getTime();
  },
});
export const initialState: MessageState = adapter.getInitialState({
  loadingActions: [],
  errorMessage: null,
  lastSendMessageId: null,
  unsentMessageIds: [],
});

const _messageReducer = createReducer(
  initialState,
  on(doFetchLatestMessages, (state, { type }) =>
    update(state, {
      loadingActions: { $push: [type] },
      errorMessage: { $set: null },
    }),
  ),
  on(doFetchLatestMessagesFulfilled, (state, { messages }) =>
    adapter.setAll(
      messages,
      update(state, {
        loadingActions: except(doFetchLatestMessages.type),
      }),
    ),
  ),
  on(doFetchLatestMessagesRejected, (state, { error }) =>
    update(state, {
      loadingActions: except(doFetchLatestMessages.type),
      errorMessage: { $set: error },
    }),
  ),
  on(doSendMessage, (state, { type, text, userId, temporaryMessageId }) =>
    adapter.addOne(
      {
        userId,
        text,
        datetime: new Date().toISOString(),
        messageId: temporaryMessageId,
      },
      update(state, {
        loadingActions: { $push: [type] },
        errorMessage: { $set: null },
      }),
    ),
  ),
  on(doSendMessageFulfilled, (state, { message, temporaryMessageId }) =>
    adapter.map(
      entity => (entity.messageId === temporaryMessageId ? message : entity),
      update(state, {
        loadingActions: except(doSendMessage.type),
      }),
    ),
  ),
  on(doSendMessageRejected, (state, { error, unsentMessageId }) =>
    update(state, {
      loadingActions: except(doSendMessage.type),
      errorMessage: { $set: error },
      unsentMessageIds: { $push: [unsentMessageId] },
    }),
  ),
);

export function reducer(state: MessageState | undefined, action: Action) {
  return _messageReducer(state, action);
}
