/**
 *  Redux saga class init
 */
import { takeEvery, all } from 'redux-saga/effects';
import * as types from '../actions/types';
import * as loginSaga from '../features/login/saga';

export default function* watch() {
  yield all([takeEvery('login/loginRequest', loginSaga.loginAsync)]);
}
