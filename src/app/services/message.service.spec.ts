import { inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { APP_GRAPHQL_ENDPOINT } from '@app/core';

import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: APP_GRAPHQL_ENDPOINT,
          useValue: 'https://test-url.dev',
        },
        MessageService,
      ],
    });
  });

  it('should get latest messages', inject(
    [HttpTestingController, MessageService, APP_GRAPHQL_ENDPOINT],
    (
      httpMock: HttpTestingController,
      messgaeService: MessageService,
      url: string,
    ) => {
      const mockMessages = {
        data: {
          fetchLatestMessages: [
            {
              messageId: '7266970401794942645',
              text: '123',
              userId: 'Russell',
              datetime: '2021-10-19T11:21:26.438Z',
            },
            {
              messageId: '2200882243309951830',
              text: 'more',
              userId: 'Joyse',
              datetime: '2021-10-19T09:48:25.084Z',
            },
          ],
        },
      };
      messgaeService.getLatestMessages('1').subscribe(response => {
        expect(response).toEqual(mockMessages);
      });

      const mockReq = httpMock.expectOne(url);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockMessages);

      httpMock.verify();
    },
  ));

  it('should get more messages', inject(
    [HttpTestingController, MessageService, APP_GRAPHQL_ENDPOINT],
    (http: HttpTestingController, service: MessageService, url: string) => {
      const mockResponse = 'response';

      service.getMoreMessage('1', 'id', false).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const mockReq = http.expectOne(url);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockResponse);

      http.verify();
    },
  ));

  it('should send messages', inject(
    [HttpTestingController, MessageService, APP_GRAPHQL_ENDPOINT],
    (http: HttpTestingController, service: MessageService, url: string) => {
      const mockResponse = 'response';

      service
        .sendMessage('message', 'user', 'channelid')
        .subscribe(response => {
          expect(response).toEqual(mockResponse);
        });

      const mockReq = http.expectOne(url);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockResponse);

      http.verify();
    },
  ));

  it('should throw error when fail to send message', inject(
    [HttpTestingController, MessageService, APP_GRAPHQL_ENDPOINT],
    (http: HttpTestingController, service: MessageService, url: string) => {
      const mockResponse = {
        errors: [{ message: 'error' }],
      };

      service.sendMessage('message', 'user', 'channelid').subscribe({
        error: (error: string) => {
          expect(error).toEqual('Can not send message');
        },
      });

      const mockReq = http.expectOne(url);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockResponse);

      http.verify();
    },
  ));
});
