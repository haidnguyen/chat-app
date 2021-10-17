import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MessageItemComponent } from '../message-item/message-item.component';

@Component({
  selector: 'app-messages',
  template: `
    <!-- <button app-button icon="arrow-up" primary>Read More</button> -->
    <div class="flex flex-col">
      <app-message-item
        *ngFor="let message of messages; let odd = odd; let even = even"
        [data]="message"
        [left]="even"
        [right]="odd"
      ></app-message-item>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent {
  messages: MessageItemComponent['data'][] = [
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
