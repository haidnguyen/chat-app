import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-switcher',
  template: `
    <div class="flex flex-col px-4">
      <label class="mb-2 text-blueGray-800" for="user"
        >1. Choose your user</label
      >
      <select class="p-2 rounded" id="user" [formControl]="user">
        <option *ngFor="let user of users" [value]="user">{{ user }}</option>
      </select>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSwitcherComponent {
  user = new FormControl();
  private _currentUser: string | null = null;

  @Input() users: string[] | null = null;
  @Input()
  set currentUser(value: string) {
    this.user.setValue(value, { emitEvent: false });
    this._currentUser = value;
  }

  @Output() userSwitch = this.user.valueChanges as Observable<string>;
}
