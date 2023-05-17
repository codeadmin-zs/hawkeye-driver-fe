import {put, call, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {loginUser} from '../../../services/loginUser';

import {loadingActions} from '../loading/slice';
import {loginActions} from './slice';

export function* loginAsync(actions: any) {

  const response = yield call(
    loginUser,
    actions.payload.userName,
    actions.payload.password,
  );
  yield put(loginActions.loginResponse(response));
  if (response && response[0] === 201) {
    yield put(loadingActions.disableLoading());
  } else if (response && response[0] === 401) {
    yield put(loginActions.loginError());
    yield put(loadingActions.disableLoading());
  } else {
    yield put(loadingActions.disableLoading());
  }
}
