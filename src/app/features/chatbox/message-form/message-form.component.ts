import {
  Component,
  ChangeDetectionStrategy,
  Output,
  OnInit,
  OnDestroy,
  Inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { APP_LOCAL_STORAGE_PERSIST_DEBOUNCE_TIME } from '@app/core';
import { Subject } from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

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
export class MessageFormComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(APP_LOCAL_STORAGE_PERSIST_DEBOUNCE_TIME) private duration: number,
  ) {}

  form = new FormControl();
  readonly $submitClick = new Subject<void>();
  private readonly $destroy = new Subject<void>();

  @Output() messageSubmit = this.$submitClick.pipe(
    withLatestFrom(this.form.valueChanges),
    map(([, message]) => message),
    filter(message => !!message),
    tap(() => {
      this.form.reset('');
      localStorage.removeItem('currentMessage');
    }),
  );

  ngOnInit() {
    this.form.setValue(localStorage.getItem('currentMessage') ?? '');
    this.form.valueChanges
      .pipe(takeUntil(this.$destroy), debounceTime(this.duration))
      .subscribe(text => localStorage.setItem('currentMessage', text));
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
