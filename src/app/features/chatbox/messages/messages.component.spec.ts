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
            messageId: '2919584570916527818',
            text: '2\n',
            userId: 'Joyse',
            datetime: '2021-10-17T01:20:21.779Z',
          },
          {
            messageId: '8777149578453247418',
            text: '1\n',
            userId: 'Joyse',
            datetime: '2021-10-17T01:20:19.317Z',
          },
          {
            messageId: '4369021692952011819',
            text: 'fsdfsdf\n',
            userId: 'Sam',
            datetime: '2021-10-17T01:16:54.748Z',
          },
          {
            messageId: '3017682115136403106',
            text: '5555\n',
            userId: 'Sam',
            datetime: '2021-10-17T01:16:27.407Z',
          },
        ],
      },
    });

    expect(component.container).toMatchSnapshot();
  });
});
