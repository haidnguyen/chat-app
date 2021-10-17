import { NO_ERRORS_SCHEMA } from '@angular/core';
import { render } from '@testing-library/angular';
import { MessagesComponent } from './messages.component';

describe(MessagesComponent.name, () => {
  it('should match snapshot', async () => {
    const component = await render(MessagesComponent, {
      schemas: [NO_ERRORS_SCHEMA],
    });

    expect(component.container).toMatchSnapshot();
  });
});
