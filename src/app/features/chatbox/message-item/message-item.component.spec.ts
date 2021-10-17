import { NO_ERRORS_SCHEMA } from '@angular/core';
import { render } from '@testing-library/angular';
import { MessageItemComponent } from './message-item.component';

describe(MessageItemComponent.name, () => {
  it('should match snapshot', async () => {
    const component = await render(MessageItemComponent, {
      schemas: [NO_ERRORS_SCHEMA],
    });

    expect(component.container).toMatchSnapshot();
  });
});
