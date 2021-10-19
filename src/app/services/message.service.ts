import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_GRAPHQL_ENDPOINT } from '@app/core';
import { GraphResponse } from '@app/models/graph-response';
import { Message } from '@app/models/message';
import { gql } from '@app/utils/gql';
import { of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

type GetLatestMessagesResponse = GraphResponse<{
  fetchLatestMessages: Message[];
}>;

const query = gql`
  query getLatestMessages($channel: String!) {
    fetchLatestMessages(channelId: $channel) {
      messageId
      text
      userId
      datetime
    }
  }
`;

type SendMessageReponse = GraphResponse<{
  postMessage: Message;
}>;

const sendMessageQuery = gql`
  mutation sendMessage($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      messageId
      datetime
      userId
      text
    }
  }
`;

type GetMoreMessageResponse = GraphResponse<{
  fetchMoreMessages: Message[];
}>;

const getMoreMessageQuery = gql`
  query getMoreMessage(
    $channelId: String!
    $messageId: String!
    $old: Boolean!
  ) {
    fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old) {
      messageId
      datetime
      userId
      text
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    @Inject(APP_GRAPHQL_ENDPOINT) private url: string,
    private http: HttpClient,
  ) {}

  getLatestMessages(channel: string) {
    return this.http.post<GetLatestMessagesResponse>(
      this.url,
      query({ channel }),
    );
  }

  sendMessage(message: string, userId: string, channelId: string) {
    return this.http
      .post<SendMessageReponse>(
        this.url,
        sendMessageQuery({ channelId, text: message, userId }),
      )
      .pipe(
        switchMap(response => {
          if (response.errors) {
            return throwError('Can not send message');
          }
          return of(response);
        }),
      );
  }

  getMoreMessage(channelId: string, messageId: string, old: boolean) {
    return this.http.post<GetMoreMessageResponse>(
      this.url,
      getMoreMessageQuery({ channelId, messageId, old }),
    );
  }
}
