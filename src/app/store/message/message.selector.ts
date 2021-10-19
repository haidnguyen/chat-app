import { createFeatureSelector, createSelector } from '@ngrx/store';

import { doFetchLatestMessages } from './message.action';
import { adapter, FEATURE_KEY, MessageState } from './message.reducer';

const selectMessageState = createFeatureSelector<MessageState>(FEATURE_KEY);
const { selectAll } = adapter.getSelectors();

export const selectIsLoading = createSelector(
  selectMessageState,
  state => state.loadingActions.length > 0,
);
export const selectIsFetchingLatestMessage = createSelector(
  selectMessageState,
  state => state.loadingActions.includes(doFetchLatestMessages.type),
);
export const selectAllMessages = createSelector(selectMessageState, selectAll);
export const selectUnsentMessageIds = createSelector(
  selectMessageState,
  state => state.unsentMessageIds,
);
