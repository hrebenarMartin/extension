import { createCallAndRetry } from 'app/sagas/effects/callAndRetry';
import { put } from 'redux-saga/effects';
import { receivedContributors, refreshContributorsFailed } from 'app/actions';
import fetchContributors from 'api/fetchContributors';

export default function* refreshContributorsSaga() {
  const callAndRetry = createCallAndRetry({
    maximumRetryDelayInMinutes: 120,
    maximumAttempts: 6,
    onError: function*(error: Error) {
      yield put(refreshContributorsFailed(error));
    }
  });
  const contributors = yield callAndRetry(fetchContributors);

  if (contributors) {
    yield put(receivedContributors(contributors));
  }
}
