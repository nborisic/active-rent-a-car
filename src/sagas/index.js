import { all } from 'redux-saga/effects';

import spark from 'redux-spark';

export default function* rootSaga() {
  yield all([
    ...spark.getAllSagas(),
  ]);
}
