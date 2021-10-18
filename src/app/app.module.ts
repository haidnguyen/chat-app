import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { MainLayoutModule } from './layouts/main-layout';
import { AppStoreModule } from './store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MainLayoutModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    AppStoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private svgIconRegistryService: SvgIconRegistryService) {
    this.svgIconRegistryService
      .loadSvg('assets/icons/arrow-down.svg', 'arrow-down')
      ?.subscribe();

    this.svgIconRegistryService
      .loadSvg('assets/icons/arrow-up.svg', 'arrow-up')
      ?.subscribe();

    this.svgIconRegistryService
      .loadSvg('assets/icons/check-circle.svg', 'check-circle')
      ?.subscribe();

    this.svgIconRegistryService
      .loadSvg('assets/icons/paper-airplane.svg', 'paper-airplane')
      ?.subscribe();
  }
}
