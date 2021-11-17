import { inject, TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { AppState } from '@app/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jest-marbles';
import { ChatboxStore } from './chatbox.store';

describe('Chatbox Store', () => {
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting(),
    );

    TestBed.configureTestingModule({
      providers: [
        ChatboxStore,
        provideMockStore<AppState>({
          initialState: {
            message: {
              ids: ['1'],
              entities: {
                '1': {
                  datetime: 'datetime',
                  messageId: '1',
                  text: 'text',
                  userId: 'userid',
                },
              },
              errorMessage: null,
              loadingActions: [],
              unsentMessageIds: [],
            },
          },
        }),
      ],
      teardown: { destroyAfterEach: false },
    });
  });

  it('should create instance', inject(
    [ChatboxStore],
    (chatboxStore: ChatboxStore) => {
      expect(chatboxStore).toBeTruthy();
    },
  ));

  it('should load default initial local state', inject(
    [ChatboxStore],
    (chatboxStore: ChatboxStore) => {
      expect(chatboxStore.vm$).toBeObservable(
        hot('a', {
          a: {
            isLoading: false,
            messages: [
              {
                datetime: 'datetime',
                messageId: '1',
                text: 'text',
                userId: 'userid',
              },
            ],
            currentChannel: {
              id: '1',
              name: 'General Channel',
            },
            currentUser: 'Sam',
            channels: [
              {
                id: '1',
                name: 'General Channel',
              },
              {
                id: '2',
                name: 'Technology Channel',
              },
              {
                id: '3',
                name: 'LGTM Channel',
              },
            ],
            users: ['Joyse', 'Sam', 'Russell'],
          },
        }),
      );
    },
  ));

  it('should initialize local state with data from local storage', () => {
    jest
      .spyOn(localStorage.__proto__, 'getItem')
      .mockReturnValueOnce('Joyse')
      .mockReturnValueOnce({
        id: '2',
        name: 'Technology Channel',
      })
      .mockReturnValueOnce(
        JSON.stringify({
          id: '2',
          name: 'Technology Channel',
        }),
      );

    const chatboxStore = TestBed.inject(ChatboxStore);

    expect(chatboxStore.vm$).toBeObservable(
      cold('a', {
        a: {
          isLoading: false,
          messages: [
            {
              datetime: 'datetime',
              messageId: '1',
              text: 'text',
              userId: 'userid',
            },
          ],
          currentChannel: {
            id: '2',
            name: 'Technology Channel',
          },
          currentUser: 'Joyse',
          channels: [
            {
              id: '1',
              name: 'General Channel',
            },
            {
              id: '2',
              name: 'Technology Channel',
            },
            {
              id: '3',
              name: 'LGTM Channel',
            },
          ],
          users: ['Joyse', 'Sam', 'Russell'],
        },
      }),
    );
  });

  it('should return false when call isMessageUnsent', inject(
    [ChatboxStore],
    (chatboxStore: ChatboxStore) => {
      const obs$ = cold('a', { a: false });

      expect(chatboxStore.isMessageUnsent('123456789')).toBeObservable(obs$);
    },
  ));

  it('should update currentUser', inject(
    [ChatboxStore],
    (chatboxStore: ChatboxStore) => {
      const expectedObs$ = cold('ab', { a: 'Sam', b: 'Joyse' });
      chatboxStore.switchUser(cold('-x', { x: 'Joyse' }));
      expect(chatboxStore.currentUser$).toBeObservable(expectedObs$);
    },
  ));

  it('should update currentChannel', inject(
    [ChatboxStore],
    (chatboxStore: ChatboxStore) => {
      const expectedObs$ = cold('ab', {
        a: { id: '1', name: 'General Channel' },
        b: { id: '2', name: 'Technology Channel' },
      });
      chatboxStore.switchChannel(
        cold('-x', { x: { id: '2', name: 'Technology Channel' } }),
      );

      expect(chatboxStore.currentChannel$).toBeObservable(expectedObs$);
    },
  ));

  it('should dispatch doSendMessage action', inject(
    [ChatboxStore, MockStore],
    (chatboxStore: ChatboxStore, store: MockStore) => {
      jest.spyOn(store, 'dispatch');
      chatboxStore.sendMessage('message');

      expect(store.dispatch).toHaveBeenCalled();
    },
  ));

  it('should complete $destroy subject', inject(
    [ChatboxStore],
    (chatboxStore: ChatboxStore) => {
      const expectedObs$ = cold('|');
      chatboxStore.dispose();

      expect(chatboxStore['$destroy']).toBeObservable(expectedObs$);
    },
  ));

  it('should dispatch action to fetch more new message', inject(
    [ChatboxStore, MockStore],
    (chatboxStore: ChatboxStore, store: MockStore) => {
      jest.spyOn(store, 'dispatch');
      chatboxStore.loadMoreMessage('NEW');

      expect(store.dispatch).toHaveBeenCalled();
    },
  ));

  it('should dispatch action to fetch more old message', inject(
    [ChatboxStore, MockStore],
    (chatboxStore: ChatboxStore, store: MockStore) => {
      jest.spyOn(store, 'dispatch');
      chatboxStore.loadMoreMessage('PRE');

      expect(store.dispatch).toHaveBeenCalled();
    },
  ));
});
