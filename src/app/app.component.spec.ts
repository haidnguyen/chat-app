import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { render } from '@testing-library/angular';

import { AppComponent } from './app.component';
import { APP_TITLE } from './core';

describe(AppComponent.name, () => {
  it('should match snapshot', async () => {
    const component = await render(AppComponent, {
      imports: [RouterTestingModule],
      providers: [{ provide: APP_TITLE, useValue: 'Testing' }],
      schemas: [NO_ERRORS_SCHEMA],
    });

    expect(component.container).toMatchSnapshot();
  });
});
