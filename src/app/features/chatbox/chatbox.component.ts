import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Channel } from '@app/models/channel';
import { MessageService } from '@app/services/message.service';
import { AppState, fromMessage } from '@app/store';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { ChatboxStore } from './chatbox.store';

@Component({
  selector: 'app-chatbox',
  template: `
    <div
      class="bg-blueGray-100 grid grid-cols-12 rounded-lg h-full"
      *ngIf="vm$ | async as vm"
    >
      <div
        class="col-span-3 md:col-span-4 border-r border-solid border-blueGray-200 py-4"
      >
        <div class="mb-4">
          <app-user-switcher
            [users]="vm.users"
            [currentUser]="vm.currentUser"
            (userSwitch)="onUserSwitch($event)"
          ></app-user-switcher>
        </div>
        <div class="mb-4">
          <app-channel-switcher
            [channels]="vm.channels"
            [currentChannel]="vm.currentChannel"
            (channelSwitch)="onChannelSwitch($event)"
          ></app-channel-switcher>
        </div>
      </div>
      <div class="col-span-9 md:col-span-8 flex flex-col h-full overflow-auto">
        <div class="border-b border-solid border-blueGray-200 p-5">
          {{ vm.currentChannel.name }}
        </div>
        <div class="p-4 overflow-auto" style="min-height: calc(100% - 234px)">
          <app-messages
            [data]="vm.messages"
            [currentUser]="vm.currentUser"
          ></app-messages>
        </div>
        <div class="p-4 border-t border-solid border-blueGray-200">
          <app-message-form
            (messageSubmit)="onMessageSubmit($event)"
          ></app-message-form>
        </div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatboxStore],
})
export class ChatboxComponent implements OnInit, OnDestroy {
  constructor(
    private messageService: MessageService,
    private store: Store<AppState>,
    private chatboxStore: ChatboxStore,
  ) {}

  @HostBinding('class') classes = 'h-full';

  private readonly isLoading$ = this.store.select(fromMessage.selectIsLoading);
  private readonly messages$ = this.store.select(fromMessage.selectAllMessages);
  private readonly $destroy = new Subject<void>();
  readonly $currentUser = new BehaviorSubject('Sam');

  vm$ = combineLatest([
    this.isLoading$,
    this.chatboxStore.currentChannel$,
    this.chatboxStore.currentUser$,
    this.chatboxStore.channels$,
    this.chatboxStore.users$,
    this.messages$,
  ]).pipe(
    map(
      ([
        isLoading,
        currentChannel,
        currentUser,
        channels,
        users,
        messages,
      ]) => ({
        isLoading,
        currentChannel,
        currentUser,
        users,
        channels,
        messages,
      }),
    ),
  );

  ngOnInit() {
    this.chatboxStore.currentChannel$
      .pipe(takeUntil(this.$destroy))
      .subscribe(channel =>
        this.store.dispatch(
          fromMessage.doFetchLatestMessages({ channelId: channel.id }),
        ),
      );
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  onUserSwitch(user: string) {
    this.chatboxStore.switchUser(user);
  }

  onChannelSwitch(channel: Channel) {
    this.chatboxStore.switchChannel(channel);
  }

  onMessageSubmit(message: string) {
    this.chatboxStore.sendMessage(message);
  }
}
