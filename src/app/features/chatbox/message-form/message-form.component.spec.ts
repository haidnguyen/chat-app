import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_LOCAL_STORAGE_PERSIST_DEBOUNCE_TIME } from '@app/core';
import { render } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { MessageFormComponent } from './message-form.component';

describe(MessageFormComponent.name, () => {
  const renderComponent = (isLoading = false) =>
    render(MessageFormComponent, {
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: APP_LOCAL_STORAGE_PERSIST_DEBOUNCE_TIME,
          useValue: 0,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      componentProperties: {
        isLoading,
      },
    });
  it('should match snapshot', async () => {
    const component = await renderComponent();
    expect(component.container).toMatchSnapshot();
  });

  it('should disable textarea when loading', async () => {
    const { queryByPlaceholderText } = await renderComponent(true);

    const textarea = queryByPlaceholderText('Type your message here...');
    expect(textarea).toHaveAttribute('disabled');
  });

  it('should load value form local storage', async () => {
    jest.spyOn(localStorage.__proto__, 'getItem').mockReturnValue('value');
    const { queryByPlaceholderText } = await renderComponent();
    const textarea = queryByPlaceholderText('Type your message here...');

    expect(textarea).toHaveValue('value');
    userEvent.clear(textarea!);
  });

  it('should emit value when submit', async () => {
    const { queryByPlaceholderText, queryByText, fixture } =
      await renderComponent();
    const textarea = queryByPlaceholderText('Type your message here...');
    const sendButton = queryByText('Send Message');

    fixture.componentInstance.messageSubmit.subscribe(value => {
      expect(value).toEqual('message');
    });

    userEvent.type(textarea!, 'message');
    userEvent.click(sendButton!);
  });
});
