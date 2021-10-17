import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Message } from '@app/models/message';

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
          {{ data.userId[0] }}
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
        <svg-icon
          *ngIf="right"
          name="check-circle"
          [applyClass]="true"
          class="w-4 h-4 text-green-600"
        ></svg-icon>
      </span>
    </div>
  `,
  styleUrls: ['./message-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageItemComponent {
  private _left: boolean = false;
  private _right: boolean = false;

  @Input() data: Message | null = null;
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
