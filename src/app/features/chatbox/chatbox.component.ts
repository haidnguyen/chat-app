import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
} from '@angular/core';
import { Channel } from '@app/models/channel';

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
        <div class="border-b border-solid border-blueGray-200 p-5 relative">
          {{ vm.currentChannel.name }}
          <button
            app-button
            primary
            iconOnly
            icon="arrow-up"
            class="absolute right-8 -bottom-16"
            (click)="onLoadMore('PRE')"
          ></button>
        </div>
        <div class="p-4 overflow-auto" style="min-height: calc(100% - 234px)">
          <app-messages
            [data]="vm.messages"
            [currentUser]="vm.currentUser"
          ></app-messages>
        </div>
        <div class="p-4 border-t border-solid border-blueGray-200 relative">
          <button
            app-button
            primary
            iconOnly
            icon="arrow-down"
            class="absolute right-8 -top-16"
            (click)="onLoadMore('NEW')"
          ></button>

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
export class ChatboxComponent implements OnDestroy {
  constructor(private chatboxStore: ChatboxStore) {}

  @HostBinding('class') classes = 'h-full';

  readonly vm$ = this.chatboxStore.vm$;

  ngOnDestroy() {
    this.chatboxStore.dispose();
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

  onLoadMore(type: 'PRE' | 'NEW') {
    this.chatboxStore.loadMoreMessage(type);
  }
}
