import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chatbox',
  template: ` <p>chatbox works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatboxComponent {}
