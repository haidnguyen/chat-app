import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Message } from '@app/models/message';

@Component({
  selector: 'app-messages',
  template: `
    <ng-container *ngIf="isLoading; else content">
      <div class="h-full flex justify-center items-center">
        <svg-icon
          name="refresh"
          [applyClass]="true"
          class="w-16 h-16 text-blueGray-300 animate-spin"
        ></svg-icon>
      </div>
    </ng-container>

    <ng-template #content>
      <div class="grid grid-cols-11">
        <div class="flex flex-col col-span-10">
          <app-message-item
            *ngFor="let message of data; let last = last"
            [data]="message"
            [left]="currentUser !== message.userId"
            [right]="currentUser === message.userId"
            [last]="last"
          ></app-message-item>
        </div>
      </div>
    </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent {
  @Input() data: Message[] | null = null;
  @Input() currentUser: string | null = null;
  @Input() isLoading: boolean | null = null;
}
