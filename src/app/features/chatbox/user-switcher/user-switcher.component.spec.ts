import { ReactiveFormsModule } from '@angular/forms';
import { render } from '@testing-library/angular';

import { UserSwitcherComponent } from './user-switcher.component';

describe(UserSwitcherComponent.name, () => {
  it('should match snapshot', async () => {
    const component = await render(UserSwitcherComponent, {
      imports: [ReactiveFormsModule],
      componentProperties: {
        users: ['Joyse', 'Sam', 'Russell'],
        currentUser: 'Sam',
      },
    });

    expect(component.container).toMatchSnapshot();
  });
});
