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
    <div class="flex items-center">
      <ng-content></ng-content>
      <svg-icon
        *ngIf="icon"
        [name]="icon"
        class="h-5 w-5 pl-1"
        [applyClass]="true"
      ></svg-icon>
    </div>
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
  @HostBinding('class') classes = 'inline-block py-2 px-4 rounded';

  @Input() icon: string | null = null;
  @Input()
  set primary(value: any) {
    if (coerceBooleanProperty(value)) {
      this.classes = this.classes.concat(' app-button--primary');
    } else {
      this.classes = this.classes.replace('app-button--primary', '');
    }
  }
}
