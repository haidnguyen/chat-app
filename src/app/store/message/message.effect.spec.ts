import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { APP_GRAPHQL_ENDPOINT } from '@app/core';
import { Message } from '@app/models/message';
import { MessageService } from '@app/services/message.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jest-marbles';

import { Observable, of, throwError } from 'rxjs';
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
} from '.';

import { MessageEffect } from './message.effect';

describe('Message Effect', () => {
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: APP_GRAPHQL_ENDPOINT,
          useValue: 'https://test-url.dev',
        },
        MessageService,
        MessageEffect,
        provideMockActions(() => actions$),
      ],
    });
  });

  it('should dispatch doFetchLatestMessagesFulfilled action', inject(
    [MessageEffect, MessageService],
    (effect: MessageEffect, service: MessageService) => {
      jest.spyOn(service, 'getLatestMessages').mockReturnValue(
        of({
          data: {
            fetchLatestMessages: [],
          },
        }),
      );
      actions$ = hot('a', { a: doFetchLatestMessages({ channelId: '1' }) });

      expect(effect.fetchLatestMessagesEffect$).toBeObservable(
        cold('a', { a: doFetchLatestMessagesFulfilled({ messages: [] }) }),
      );
    },
  ));

  it('should dispatch doFetchLatestMessagesRejected action', inject(
    [MessageEffect, MessageService],
    (effect: MessageEffect, service: MessageService) => {
      jest
        .spyOn(service, 'getLatestMessages')
        .mockReturnValue(throwError('error'));
      actions$ = hot('a', { a: doFetchLatestMessages({ channelId: '1' }) });

      expect(effect.fetchLatestMessagesEffect$).toBeObservable(
        cold('a', {
          a: doFetchLatestMessagesRejected({
            error: 'Can not fetch latest messages',
          }),
        }),
      );
    },
  ));

  it('should dispatch doFetchMoreMessageFulfilled action', inject(
    [MessageEffect, MessageService],
    (effect: MessageEffect, service: MessageService) => {
      jest.spyOn(service, 'getMoreMessage').mockReturnValue(
        of({
          data: {
            fetchMoreMessages: [],
          },
        }),
      );
      actions$ = hot('a', {
        a: doFetchMoreMessages({ channelId: '1', messageId: '1', old: false }),
      });

      expect(effect.fetchMoreMessagesEffect$).toBeObservable(
        cold('a', {
          a: doFetchMoreMessagesFulfilled({ messages: [] }),
        }),
      );
    },
  ));

  it('should dispatch doFetchMoreMessageRejected action', inject(
    [MessageEffect, MessageService],
    (effect: MessageEffect, service: MessageService) => {
      jest
        .spyOn(service, 'getMoreMessage')
        .mockReturnValue(throwError('error'));
      actions$ = hot('a', {
        a: doFetchMoreMessages({ channelId: '1', messageId: '1', old: false }),
      });

      expect(effect.fetchMoreMessagesEffect$).toBeObservable(
        cold('a', {
          a: doFetchMoreMessagesRejected({ error: 'error' }),
        }),
      );
    },
  ));

  it('should dispatch doSendMessageFulfilled action', inject(
    [MessageEffect, MessageService],
    (effect: MessageEffect, service: MessageService) => {
      const mockMessage: Message = {
        datetime: 'datetime',
        messageId: 'messageid',
        text: 'text',
        userId: 'userid',
      };
      jest.spyOn(service, 'sendMessage').mockReturnValue(
        of({
          data: {
            postMessage: mockMessage,
          },
        }),
      );
      actions$ = hot('a', {
        a: doSendMessage({
          userId: 'userid',
          text: 'text',
          channelId: 'channelid',
          temporaryMessageId: 'temp',
        }),
      });

      expect(effect.sendMessageEffect$).toBeObservable(
        cold('a', {
          a: doSendMessageFulfilled({
            temporaryMessageId: 'temp',
            message: mockMessage,
          }),
        }),
      );
    },
  ));

  it('should dispatch doSendMessageRejected action', inject(
    [MessageEffect, MessageService],
    (effect: MessageEffect, service: MessageService) => {
      jest.spyOn(service, 'sendMessage').mockReturnValue(throwError('error'));
      actions$ = hot('a', {
        a: doSendMessage({
          userId: 'userid',
          text: 'text',
          channelId: 'channelid',
          temporaryMessageId: 'temp',
        }),
      });

      expect(effect.sendMessageEffect$).toBeObservable(
        cold('a', {
          a: doSendMessageRejected({
            error: 'error',
            unsentMessageId: 'temp',
          }),
        }),
      );
    },
  ));
});
