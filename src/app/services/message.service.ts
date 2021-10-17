import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_GRAPHQL_ENDPOINT } from '@app/core';
import { GraphResponse } from '@app/models/graph-response';
import { Message } from '@app/models/message';
import { gql } from '@app/utils/gql';

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
}
