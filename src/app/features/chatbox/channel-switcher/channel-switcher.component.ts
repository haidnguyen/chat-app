import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-channel-switcher',
  template: `
    <div class="flex flex-col">
      <span class="mb-2 text-blueGray-800 px-4">2. Choose your channel</span>
      <div
        *ngFor="let channel of channels"
        class="px-4 py-2 channel font-semibold text-sm"
        [ngClass]="{
          'channel--active': currentChannel === channel
        }"
        (click)="channelSwitch.next(channel)"
      >
        <span class="h-10 flex items-center cursor-pointer">
          {{ channel }}
        </span>
      </div>
    </div>
  `,
  styles: [
    `
      .channel {
        &:hover {
          @apply bg-gradient-to-l;
          @apply from-blueGray-200;
          @apply to-white;
        }
        &--active {
          @apply bg-gradient-to-l;
          @apply from-blueGray-100;
          @apply to-white;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelSwitcherComponent {
  private _currentChannel: string | null = null;

  @Input() channels: string[] | null = null;
  @Input()
  get currentChannel() {
    return this._currentChannel;
  }
  set currentChannel(value) {
    this._currentChannel = value;
  }

  @Output() channelSwitch = new EventEmitter<string>();
}
