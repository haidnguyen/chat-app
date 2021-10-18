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

export const doSendMessage = createAction(
  '@@Message/SEND_MESSAGE',
  props<{ text: string; userId: string; channelId: string }>(),
);

export const doSendMessageFulfilled = createAction(
  '@@Message/SEND_MESSAGE_FULFILLED',
  props<{ message: Message }>(),
);

export const doSendMessageRejected = createAction(
  '@@Message/SEND_MESSAGE_REJECTED',
  props<{ error: string }>(),
);
