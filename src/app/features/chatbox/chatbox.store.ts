import { Injectable } from '@angular/core';
import { Channel } from '@app/models/channel';
import { MessageService } from '@app/services/message.service';
import { ComponentStore } from '@ngrx/component-store';
import update from 'immutability-helper';
import { Observable } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

export interface ChatboxState {
  currentUser: string;
  users: string[];
  channels: Channel[];
  currentChannel: Channel;
}

@Injectable()
export class ChatboxStore extends ComponentStore<ChatboxState> {
  constructor(private messageService: MessageService) {
    super({
      currentUser: 'Sam',
      currentChannel: {
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

  readonly currentUser$ = this.select(state => state.currentUser);
  readonly currentChannel$ = this.select(state => state.currentChannel);
  readonly users$ = this.select(state => state.users);
  readonly channels$ = this.select(state => state.channels);

  readonly switchChannel = this.updater((state, channel: Channel) =>
    update(state, {
      currentChannel: { $set: channel },
    }),
  );

  readonly switchUser = this.updater((state, user: string) =>
    update(state, {
      currentUser: { $set: user },
    }),
  );

  readonly sendMessage = this.effect((message$: Observable<string>) =>
    message$.pipe(
      withLatestFrom(this.currentUser$),
      tap(([message, currentUser]) =>
        console.log('send', { message, currentUser }),
      ),
    ),
  );
}
