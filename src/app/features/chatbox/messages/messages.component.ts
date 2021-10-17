import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Message } from '@app/models/message';

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
  @Input() data: Message[] | null = null;
}
