import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';
import { forkJoin, Observable } from 'rxjs';

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
    this.loadSvg(
      ['assets/icons/arrow-down.svg', 'arrow-down'],
      ['assets/icons/arrow-up.svg', 'arrow-up'],
      ['assets/icons/check-circle.svg', 'check-circle'],
      ['assets/icons/paper-airplane.svg', 'paper-airplane'],
      ['assets/icons/x-circle.svg', 'x-circle'],
      ['assets/icons/refresh.svg', 'refresh'],
    );
  }

  loadSvg(...pairs: Array<[url: string, name: string]>) {
    forkJoin(
      pairs
        .map(([url, name]) => this.svgIconRegistryService.loadSvg(url, name))
        .filter(Boolean) as Observable<SVGElement>[],
    ).subscribe();
  }
}
