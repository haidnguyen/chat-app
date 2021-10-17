import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessagesComponent } from './messages/messages.component';

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
          {{ vm.currentChannel }}
        </div>
        <div class="p-4 overflow-auto">
          <app-messages [data]="messages"></app-messages>
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
})
export class ChatboxComponent {
  @HostBinding('class') classes = 'h-full';

  readonly $currentUser = new BehaviorSubject('Sam');
  readonly $currentChannel = new BehaviorSubject('General Channel');

  vm$ = combineLatest([this.$currentChannel, this.$currentUser]).pipe(
    map(([currentChannel, currentUser]) => ({
      currentChannel,
      currentUser,
      users: ['Joyse', 'Sam', 'Russell'],
      channels: ['General Channel', 'Technology Channel', 'LGTM Channel'],
    })),
  );

  onUserSwitch(user: string) {
    this.$currentUser.next(user);
  }

  onChannelSwitch(channel: string) {
    this.$currentChannel.next(channel);
  }

  onMessageSubmit(message: string) {
    console.log({ message });
  }

  messages: MessagesComponent['data'] = [
    {
      user: 'Russell',
      text: "Hello, I'm Russell.\nHow can I help you today?",
      datetime: '08:55',
    },
    {
      user: 'Joyse',
      text: 'Hi, Russell\nIneed more information about Developer Plan.',
      datetime: '08:55',
    },
    {
      user: 'Same',
      text: 'Are we meeting today?\nProject has been already finished and I have result to show you.',
      datetime: '08:55',
    },
    {
      user: 'Joyse',
      text: 'Well I am not sure.\nI have results to show you.',
      datetime: '08:55',
    },
    {
      user: 'Joyse',
      text: 'Hey, can you receive my chat?',
      datetime: '08:55',
    },
    {
      user: 'Joyse',
      text: 'Well I am not sure.\nI have results to show you.\n Another Line\nAnother Line',
      datetime: '08:55',
    },
    {
      user: 'Joyse',
      text: 'Hey, can you receive my chat?',
      datetime: '08:55',
    },
    {
      user: 'Joyse',
      text: 'Well I am not sure.\nI have results to show you.',
      datetime: '08:55',
    },
    {
      user: 'Joyse',
      text: 'Hey, can you receive my chat?',
      datetime: '08:55',
    },
  ];
}
