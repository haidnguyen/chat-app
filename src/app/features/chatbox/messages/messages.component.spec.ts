import { NO_ERRORS_SCHEMA } from '@angular/core';
import { render } from '@testing-library/angular';
import { MessagesComponent } from './messages.component';

describe(MessagesComponent.name, () => {
  it('should match snapshot', async () => {
    const component = await render(MessagesComponent, {
      schemas: [NO_ERRORS_SCHEMA],
      componentProperties: {
        data: [
          {
            user: 'Russell',
            text: "Hello, I'm Russell.\nHow can I help you today?",
            datetime: '08:55',
          },
          {
            user: 'Joyse',
            text: 'Hi, Russell\nIneed more information about Developer Plan.',
            datetime: '08:55',
          },
          {
            user: 'Same',
            text: 'Are we meeting today?\nProject has been already finished and I have result to show you.',
            datetime: '08:55',
          },
          {
            user: 'Joyse',
            text: 'Well I am not sure.\nI have results to show you.',
            datetime: '08:55',
          },
          {
            user: 'Joyse',
            text: 'Hey, can you receive my chat?',
            datetime: '08:55',
          },
          {
            user: 'Joyse',
            text: 'Well I am not sure.\nI have results to show you.\n Another Line\nAnother Line',
            datetime: '08:55',
          },
          {
            user: 'Joyse',
            text: 'Hey, can you receive my chat?',
            datetime: '08:55',
          },
          {
            user: 'Joyse',
            text: 'Well I am not sure.\nI have results to show you.',
            datetime: '08:55',
          },
          {
            user: 'Joyse',
            text: 'Hey, can you receive my chat?',
            datetime: '08:55',
          },
        ],
      },
    });

    expect(component.container).toMatchSnapshot();
  });
});
