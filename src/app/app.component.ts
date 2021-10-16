import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { APP_TITLE } from './core';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(@Inject(APP_TITLE) public appTitle: string, private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle(this.appTitle);
  }
}
