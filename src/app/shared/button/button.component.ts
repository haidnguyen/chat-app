import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-button]',
  template: `
    <ng-container *ngIf="iconOnly; else normalButton">
      <svg-icon
        *ngIf="icon"
        [name]="icon"
        class="h-5 w-5"
        [applyClass]="true"
      ></svg-icon>
    </ng-container>

    <ng-template #normalButton>
      <div class="flex items-center w-full">
        <ng-content></ng-content>
        <svg-icon
          *ngIf="icon"
          [name]="icon"
          class="h-5 w-5 pl-1"
          [applyClass]="true"
        ></svg-icon>
      </div>
    </ng-template>
  `,
  styles: [
    `
      [app-button].app-button--primary {
        @apply bg-cyan-600;
        @apply text-white;
        @apply transition-colors;

        &:hover {
          @apply bg-cyan-800;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  private _iconOnly: boolean = false;
  @HostBinding('class') classes = 'inline-block py-2 px-4 rounded';

  @Input() icon: string | null = null;
  @Input()
  get iconOnly() {
    return this._iconOnly;
  }
  set iconOnly(value: any) {
    const isIconOnly = coerceBooleanProperty(value);
    if (isIconOnly) {
      this.classes = this.classes.replace(
        'py-2 px-4 rounded',
        'p-2 rounded-full',
      );
      this._iconOnly = true;
    } else {
      this._iconOnly = false;
    }
  }
  @Input()
  set primary(value: any) {
    if (coerceBooleanProperty(value)) {
      this.classes = this.classes.concat(' app-button--primary');
    } else {
      this.classes = this.classes.replace('app-button--primary', '');
    }
  }
}
