import { Injectable } from '@angular/core';
import { Channel } from '@app/models/channel';
import { Message } from '@app/models/message';
import { AppState, fromMessage } from '@app/store';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import update from 'immutability-helper';
import { last, head } from 'ramda';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

interface ChatboxState {
  currentUser: string;
  users: string[];
  channels: Channel[];
  currentChannel: Channel;
}

const bySentMessages = (unsentMessageIds: string[]) => (message: Message) =>
  !unsentMessageIds.includes(message.messageId);

@Injectable()
export class ChatboxStore extends ComponentStore<ChatboxState> {
  constructor(private store: Store<AppState>) {
    super({
      currentUser: localStorage.getItem('currentUser') ?? 'Sam',
      currentChannel: localStorage.getItem('currentChannel')
        ? JSON.parse(localStorage.getItem('currentChannel')!)
        : {
            id: '1',
            name: 'General Channel',
          },
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
    });
  }

  private readonly $destroy = new Subject<void>();
  readonly currentUser$ = this.select(state => state.currentUser);
  readonly currentChannel$ = this.select(state => state.currentChannel);
  readonly users$ = this.select(state => state.users);
  readonly channels$ = this.select(state => state.channels);
  readonly isLoading$ = this.store.select(
    fromMessage.selectIsFetchingLatestMessage,
  );
  readonly messages$ = this.store.select(fromMessage.selectAllMessages);
  readonly unsentMessageIds$ = this.store.select(
    fromMessage.selectUnsentMessageIds,
  );

  readonly vm$ = this.select(
    this.isLoading$,
    this.messages$,
    this.currentChannel$,
    this.currentUser$,
    this.channels$,
    this.users$,
    (isLoading, messages, currentChannel, currentUser, channels, users) => ({
      isLoading,
      messages,
      currentChannel,
      currentUser,
      channels,
      users,
    }),
  );

  readonly isMessageUnsent = (messageId: string) =>
    this.unsentMessageIds$.pipe(
      map(unsentMessageIds => unsentMessageIds.includes(messageId)),
    );

  readonly switchChannel = this.updater((state, channel: Channel) => {
    localStorage.setItem('currentChannel', JSON.stringify(channel));
    return update(state, {
      currentChannel: { $set: channel },
    });
  });

  readonly switchUser = this.updater((state, user: string) => {
    localStorage.setItem('currentUser', user);
    return update(state, {
      currentUser: { $set: user },
    });
  });

  readonly sendMessage = this.effect((message$: Observable<string>) =>
    message$.pipe(
      withLatestFrom(this.currentUser$, this.currentChannel$),
      tap(([message, currentUser, currentChannel]) => {
        this.store.dispatch(
          fromMessage.doSendMessage({
            text: message,
            userId: currentUser,
            channelId: currentChannel.id,
            temporaryMessageId: Date.now().toString(),
          }),
        );
      }),
    ),
  );

  readonly loadMoreMessage = this.effect((type$: Observable<'PRE' | 'NEW'>) =>
    type$.pipe(
      withLatestFrom(
        this.messages$,
        this.unsentMessageIds$,
        this.currentChannel$,
      ),
      tap(([type, messages, unsentMessageIds, currentChannel]) => {
        if (type === 'NEW') {
          const lastSendMessage = last(
            messages.filter(bySentMessages(unsentMessageIds)),
          );
          /* istanbul ignore else */
          if (lastSendMessage) {
            this.store.dispatch(
              fromMessage.doFetchMoreMessages({
                channelId: currentChannel.id,
                messageId: lastSendMessage.messageId,
                old: false,
              }),
            );
          }
        }
        if (type === 'PRE') {
          const firstMessage = head(
            messages.filter(bySentMessages(unsentMessageIds)),
          );
          /* istanbul ignore else */
          if (firstMessage) {
            this.store.dispatch(
              fromMessage.doFetchMoreMessages({
                channelId: currentChannel.id,
                messageId: firstMessage.messageId,
                old: true,
              }),
            );
          }
        }
      }),
    ),
  );

  private readonly dispatchFetchLatestMessages = this.effect(() =>
    this.currentChannel$.pipe(
      takeUntil(this.$destroy),
      tap(channel =>
        this.store.dispatch(
          fromMessage.doFetchLatestMessages({ channelId: channel.id }),
        ),
      ),
    ),
  );

  dispose() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
