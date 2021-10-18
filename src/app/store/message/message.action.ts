import { Message } from '@app/models/message';
import { createAction, props } from '@ngrx/store';

export const doFetchLatestMessages = createAction(
  '@@Message/FETCH_LATEST_MESSAGES',
  props<{ channelId: string }>(),
);

export const doFetchLatestMessagesFulfilled = createAction(
  '@@Message/FETCH_LATEST_MESSAGES_FULFILLED',
  props<{ messages: Message[] }>(),
);

export const doFetchLatestMessagesRejected = createAction(
  '@Message/FETCH_LATEST_MESSAGES_REJECTED',
  props<{ error: string }>(),
);
