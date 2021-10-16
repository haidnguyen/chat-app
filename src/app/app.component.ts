import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';

import { APP_TITLE } from './core';

@Component({
  selector: 'app-root',
  template: `
    <app-main-layout>
      <div heading class="flex flex-col mb-4">
        <h1 class="text-xl font-semibold mb-2">{{ this.appTitle }}</h1>
        <p>All messages will be deleted at every 00:00 UTC</p>
      </div>
      <router-outlet content></router-outlet>
    </app-main-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(APP_TITLE) public appTitle: string,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.appTitle);
  }
}
