import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MessageItemComponent } from '../message-item/message-item.component';

@Component({
  selector: 'app-messages',
  template: `
    <div class="flex flex-col">
      <app-message-item
        *ngFor="let message of data; let odd = odd; let even = even"
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
  @Input() data: MessageItemComponent['data'][] | null = null;
}
