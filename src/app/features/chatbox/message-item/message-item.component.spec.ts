import { NO_ERRORS_SCHEMA } from '@angular/core';
import { render } from '@testing-library/angular';
import { of } from 'rxjs';

import { ChatboxStore } from '../chatbox.store';
import { MessageItemComponent } from './message-item.component';

type MessageItemComponentProps = Omit<
  typeof MessageItemComponent.prototype,
  'vm$'
>;

describe(MessageItemComponent.name, () => {
  const defaultProps: MessageItemComponentProps = {
    data: {
      messageId: '7409833470838909538',
      datetime: '2021-10-19T09:50:14.037Z',
      userId: 'Joyse',
      text: 'Test Message Item',
    },
    last: true,
    left: true,
    right: false,
  };

  const renderComponent = (props: Partial<MessageItemComponentProps> = {}) =>
    render(MessageItemComponent, {
      providers: [
        {
          provide: ChatboxStore,
          useValue: {
            isMessageUnsent: jest.fn().mockReturnValue(of(false)),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      componentProperties: { ...defaultProps, ...props },
    });

  it('should match snapshot', async () => {
    const component = await renderComponent();

    expect(component.container).toMatchSnapshot();
  });

  it('should render message text', async () => {
    const { queryByText } = await renderComponent();

    expect(queryByText(defaultProps.data!.text)).toBeInTheDocument();
  });

  it('should use first letter of user name in uppercase for avatar', async () => {
    const { queryByText } = await renderComponent();

    expect(
      queryByText(defaultProps.data!.userId[0].toUpperCase()),
    ).toBeInTheDocument();
  });

  it('should not render status icon for message on left side', async () => {
    const { queryByTestId } = await renderComponent();

    expect(queryByTestId('status-icon')).not.toBeInTheDocument();
  });

  it('should render status icon if it is the last message', async () => {
    const { queryByTestId } = await renderComponent({
      right: true,
      last: true,
    });

    expect(queryByTestId('status-icon')).toBeInTheDocument();
  });
});
