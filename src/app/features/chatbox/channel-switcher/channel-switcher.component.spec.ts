import { render } from '@testing-library/angular';
import { ChannelSwitcherComponent } from './channel-switcher.component';

describe(ChannelSwitcherComponent.name, () => {
  it('should match snapshot', async () => {
    const component = await render(ChannelSwitcherComponent, {
      componentProperties: {
        channels: [
          {
            id: '1',
            name: 'General Channel',
          },
          {
            id: '2',
            name: 'Technology Channel',
          },
          {
            id: '3',
            name: 'LGTM Channel',
          },
        ],
        currentChannel: {
          id: '1',
          name: 'General Channel',
        },
      },
    });

    expect(component.container).toMatchSnapshot();
  });
});
