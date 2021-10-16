import { render } from '@testing-library/angular';

import { AppComponent } from './app.component';

describe(AppComponent.name, () => {
  it('should match snapshot', async () => {
    const component = await render(AppComponent);

    expect(component.container).toMatchSnapshot();
  });
});
