import { Component, ChangeDetectionStrategy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-message-form',
  template: `
    <textarea
      rows="3"
      class="w-full border border-solid border-gray-300 rounded p-2 resize-none"
      placeholder="Type your message here..."
      [formControl]="form"
    ></textarea>
    <button
      app-button
      primary
      icon="paper-airplane"
      (click)="this.$submitClick.next()"
    >
      Send Message
    </button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageFormComponent {
  form = new FormControl();
  readonly $submitClick = new Subject<void>();

  @Output() messageSubmit = this.$submitClick.pipe(
    withLatestFrom(this.form.valueChanges),
    map(([, message]) => message),
    filter(message => !!message),
    tap(() => {
      this.form.reset('');
    }),
  );
}
