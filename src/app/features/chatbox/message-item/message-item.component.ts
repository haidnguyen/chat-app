import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Message } from '@app/models/message';
import { ChatboxStore } from '../chatbox.store';
import { ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-message-item',
  template: `
    <div
      *ngIf="data"
      class="message-item"
      [ngClass]="{ 'message-item--left': left, 'message-item--right': right }"
    >
      <div class="flex flex-col">
        <div class="user-avatar">
          {{ data.userId[0] | uppercase }}
        </div>
        <div class="font-light text-xs text-center text-gray-500">
          {{ data.userId }}
        </div>
      </div>
      <div class="message-container">
        {{ data.text }}
      </div>
      <span
        class="absolute text-xs font-extralight text-gray-600 bottom-0 mx-16 flex items-center"
      >
        {{ data.datetime | date: 'HH:mm' }}
        <ng-container *ngIf="vm$ | async as vm">
          <svg-icon
            *ngIf="(right && last) || vm.isUnsent"
            [name]="vm.iconName"
            [applyClass]="true"
            class="w-4 h-4"
            [ngClass]="vm.iconClass"
            data-testid="status-icon"
          ></svg-icon>
        </ng-container>
      </span>
    </div>
  `,
  styleUrls: ['./message-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageItemComponent {
  constructor(private chatboxStore: ChatboxStore) {}

  private _left: boolean = false;
  private _right: boolean = false;
  private _data: Message | null = null;
  private _messageId$ = new ReplaySubject<string>(1);

  readonly vm$ = this._messageId$.pipe(
    switchMap(messageId =>
      this.chatboxStore.isMessageUnsent(messageId).pipe(
        map(isUnsent => ({
          isUnsent,
          iconName: isUnsent ? 'x-circle' : 'check-circle',
          iconClass: {
            'text-red-600': isUnsent,
            'text-green-600': !isUnsent,
          },
        })),
      ),
    ),
  );

  @Input() last: boolean = false;
  @Input()
  get data() {
    return this._data;
  }
  set data(value: Message | null) {
    this._data = value;
    /* istanbul ignore else */
    if (value) {
      this._messageId$.next(value.messageId);
    }
  }
  @Input()
  get left() {
    return this._left;
  }
  set left(value) {
    this._left = coerceBooleanProperty(value);
  }
  @Input()
  get right() {
    return this._right;
  }
  set right(value) {
    this._right = coerceBooleanProperty(value);
  }
}
