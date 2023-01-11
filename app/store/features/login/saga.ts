import {put, call, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {loginUser} from '../../../services/loginUser';

import {loadingActions} from '../loading/slice';
import {loginActions} from './slice';

export function* loginAsync(actions: any) {
  console.log('actions===', actions);

  const response = yield call(
    loginUser,
    actions.payload.userName,
    actions.payload.password,
  );
  console.log('response==', response?.status, response);
  yield put(loginActions.loginResponse(response));
  if (response && response[0] === 201) {
    // yield put(loginActions.loginResponse(response));
    yield put(loadingActions.disableLoading());
  } else if (response && response[0] === 401) {
    yield put(loginActions.loginError());
    yield put(loadingActions.disableLoading());
  } else {
    yield put(loadingActions.disableLoading());
  }
}
