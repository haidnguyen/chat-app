import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageState, FEATURE_KEY, adapter } from './message.reducer';

const selectMessageState = createFeatureSelector<MessageState>(FEATURE_KEY);
const { selectAll } = adapter.getSelectors();

export const selectIsLoading = createSelector(
  selectMessageState,
  state => state.loadingActions.length > 0,
);
export const selectAllMessages = createSelector(selectMessageState, selectAll);
