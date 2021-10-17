import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { environment } from '@environments/environment';

import { APP_GRAPHQL_ENDPOINT, APP_TITLE } from './app-token';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: APP_TITLE,
      useValue: environment.APP_TITLE,
    },
    {
      provide: APP_GRAPHQL_ENDPOINT,
      useValue: environment.GRAPHQL_ENDPOINT,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
