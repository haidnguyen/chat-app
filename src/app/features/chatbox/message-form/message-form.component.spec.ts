import { NO_ERRORS_SCHEMA } from '@angular/core';
import { render } from '@testing-library/angular';
import { MessageFormComponent } from './message-form.component';

describe(MessageFormComponent.name, () => {
  it('should match snapshot', async () => {
    const component = await render(MessageFormComponent, {
      schemas: [NO_ERRORS_SCHEMA],
    });

    expect(component.container).toMatchSnapshot();
  });
});
