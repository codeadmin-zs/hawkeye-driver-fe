import { put, call, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import { getDriverDetails } from "../../../services/driver";

import { loadingActions } from "../loading/slice";
import { profileActions } from "./slice";

export function* profileAsync() {
  const response = yield call(getDriverDetails);

  if (response?.body && response?.status === 200) {
    yield put(profileActions.profileDetailsResponse(response));
    yield put(loadingActions.disableLoading());
  } else if (response && response[0] === 401) {
    yield put(profileActions.profileDetailsError());
    yield put(loadingActions.disableLoading());
  } else {
    yield put(loadingActions.disableLoading());
  }
}
