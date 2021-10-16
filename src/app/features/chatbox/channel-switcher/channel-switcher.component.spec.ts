import { render } from '@testing-library/angular';
import { ChannelSwitcherComponent } from './channel-switcher.component';

describe(ChannelSwitcherComponent.name, () => {
  it('should match snapshot', async () => {
    const component = await render(ChannelSwitcherComponent, {
      componentProperties: {
        channels: ['General Channel', 'Technology Channel', 'LGTM Channel'],
        currentChannel: 'General Channel',
      },
    });

    expect(component.container).toMatchSnapshot();
  });
});
