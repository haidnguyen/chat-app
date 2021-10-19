import { Message } from '@app/models/message';

import { AppState } from '..';
import {
  doFetchLatestMessages,
  doFetchLatestMessagesFulfilled,
  doFetchLatestMessagesRejected,
  doFetchMoreMessages,
  doFetchMoreMessagesFulfilled,
  doFetchMoreMessagesRejected,
  doSendMessage,
  doSendMessageFulfilled,
  doSendMessageRejected,
  initialState,
  MessageState,
  reducer,
  FEATURE_KEY,
  selectAllMessages,
  selectIsFetchingLatestMessage,
  selectIsLoading,
  selectUnsentMessageIds,
} from '.';

describe('Message Feature Store', () => {
  describe('Reducer', () => {
    describe('doFetchLatestMessage', () => {
      const state = { ...initialState };

      it(`should add ${doFetchLatestMessages.type} to loading actions`, () => {
        const updatedState = reducer(
          state,
          doFetchLatestMessages({ channelId: '1' }),
        );

        expect(updatedState.loadingActions).toContain(
          doFetchLatestMessages.type,
        );
      });

      it('should set all message entities', () => {
        const mockMessages: Message[] = [
          {
            messageId: '1',
            datetime: '2021-10-19T09:48:25.084Z',
            text: 'message 1',
            userId: 'Joyse',
          },
          {
            messageId: '2',
            text: 'message 2',
            userId: 'Sam',
            datetime: '2021-10-19T11:21:26.438Z',
          },
        ];
        const updatedState = reducer(
          state,
          doFetchLatestMessagesFulfilled({ messages: mockMessages }),
        );

        expect(updatedState.ids).toEqual(['1', '2']);
        expect(updatedState.entities['1']).toEqual(mockMessages[0]);
        expect(updatedState.entities['2']).toEqual(mockMessages[1]);
      });

      it('should update errorMessage', () => {
        const errorMessage = 'error message';

        const updatedState = reducer(
          state,
          doFetchLatestMessagesRejected({ error: errorMessage }),
        );

        expect(updatedState.errorMessage).toEqual(errorMessage);
      });
    });

    describe('doFetchMoreMessage', () => {
      const state: MessageState = {
        ...initialState,
        ids: ['1'],
        entities: {
          '1': {
            messageId: '1',
            datetime: '2021-10-19T09:48:25.084Z',
            text: 'message 1',
            userId: 'Joyse',
          },
        },
      };
      it('should update loading actions', () => {
        const updatedState = reducer(
          state,
          doFetchMoreMessages({ channelId: '1', messageId: '1', old: false }),
        );

        expect(updatedState.loadingActions).toContain(doFetchMoreMessages.type);
      });

      it('should update entities', () => {
        const mockMessages: Message[] = [
          {
            messageId: '2',
            text: 'message 2',
            userId: 'Sam',
            datetime: '2021-10-19T11:21:26.438Z',
          },
        ];
        const updatedState = reducer(
          state,
          doFetchMoreMessagesFulfilled({ messages: mockMessages }),
        );
        expect(updatedState.ids).toEqual(['1', '2']);
        expect(updatedState.entities['1']).toEqual(state.entities['1']);
        expect(updatedState.entities['2']).toEqual(mockMessages[0]);
      });

      it('should update error message', () => {
        const mockMessage = 'error';
        const updatedState = reducer(
          state,
          doFetchMoreMessagesRejected({ error: mockMessage }),
        );

        expect(updatedState.errorMessage).toEqual(mockMessage);
      });
    });

    describe('doSendMessage', () => {
      const state: MessageState = {
        ...initialState,
        ids: ['1'],
        entities: {
          '1': {
            messageId: '1',
            datetime: '2021-10-19T09:48:25.084Z',
            text: 'message 1',
            userId: 'Joyse',
          },
        },
      };

      it('should update entities when send message then replace temporary entity with real entity', () => {
        const mockMessage: Message = {
          datetime: '2021-10-19T11:21:26.438Z',
          messageId: '2',
          text: 'message 1',
          userId: 'Sam',
        };
        jest
          .spyOn(Date.prototype, 'toISOString')
          .mockReturnValue(mockMessage.datetime);
        const updatedState = reducer(
          state,
          doSendMessage({
            text: mockMessage.text,
            userId: mockMessage.userId,
            channelId: '1',
            temporaryMessageId: mockMessage.messageId,
          }),
        );

        expect(updatedState.entities[mockMessage.messageId]).toEqual(
          mockMessage,
        );
        expect(updatedState.loadingActions).toContain(doSendMessage.type);

        const latestState = reducer(
          updatedState,
          doSendMessageFulfilled({
            message: {
              ...mockMessage,
              messageId: '3',
            },
            temporaryMessageId: mockMessage.messageId,
          }),
        );

        expect(latestState.ids).toEqual(['1', '3']);
        expect(latestState.ids).not.toContain(mockMessage.messageId);
      });

      it('should update unsent message id when send message failed', () => {
        const mockError = 'error';
        const mockMessageId = '99';
        const updatedState = reducer(
          state,
          doSendMessageRejected({
            error: mockError,
            unsentMessageId: mockMessageId,
          }),
        );

        expect(updatedState.errorMessage).toEqual(mockError);
        expect(updatedState.unsentMessageIds).toContain(mockMessageId);
      });
    });
  });

  describe('Selector', () => {
    const state: AppState = {
      [FEATURE_KEY]: {
        ...initialState,
        ids: ['1'],
        entities: {
          '1': {
            messageId: '1',
            datetime: '2021-10-19T09:48:25.084Z',
            text: 'message 1',
            userId: 'Joyse',
          },
        },
        loadingActions: [doSendMessageRejected.type],
        unsentMessageIds: ['5'],
      },
    };

    it(selectIsLoading.name, () => {
      expect(selectIsLoading(state)).toBeTruthy();
    });
    it(selectIsFetchingLatestMessage.name, () => {
      expect(selectIsFetchingLatestMessage(state)).toBeFalsy();
    });
    it(selectAllMessages.name, () => {
      const messages = [state[FEATURE_KEY].entities['1']];

      expect(selectAllMessages(state)).toEqual(messages);
    });
    it(selectUnsentMessageIds.name, () => {
      expect(selectUnsentMessageIds(state)).toEqual(['5']);
    });
  });
});
