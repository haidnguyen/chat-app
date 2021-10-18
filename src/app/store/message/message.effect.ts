import { Injectable } from '@angular/core';
import { MessageService } from '@app/services/message.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  doFetchLatestMessages,
  doFetchLatestMessagesFulfilled,
  doFetchLatestMessagesRejected,
} from '.';

@Injectable()
export class MessageEffect {
  constructor(
    private action$: Actions,
    private messageService: MessageService,
  ) {}

  fetchLatestMessagesEffect = createEffect(() =>
    this.action$.pipe(
      ofType(doFetchLatestMessages),
      switchMap(({ channelId }) =>
        this.messageService.getLatestMessages(channelId).pipe(
          map(response =>
            doFetchLatestMessagesFulfilled({
              messages: response.data.fetchLatestMessages,
            }),
          ),
          catchError(() =>
            of(
              doFetchLatestMessagesRejected({
                error: 'Can not fetch latest messages',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
