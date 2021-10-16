import { render } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { APP_TITLE } from './core';

describe(AppComponent.name, () => {
  it('should match snapshot', async () => {
    const component = await render(AppComponent, {
      imports: [RouterTestingModule],
      providers: [{ provide: APP_TITLE, useValue: 'Testing' }],
    });

    expect(component.container).toMatchSnapshot();
  });
});
