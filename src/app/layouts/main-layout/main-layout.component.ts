import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <main class="bg-white min-h-screen flex flex-col">
      <div class="py-4 max-w-6xl w-full mx-auto">
        <section>
          <ng-content select="[heading]"></ng-content>
        </section>
        <div
          class="flex flex-col"
          [ngStyle]="{ height: 'calc(100vh - 32px - 76px)' }"
        >
          <ng-content select="[content]"></ng-content>
        </div>
      </div>
    </main>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
