/**
 *  Redux saga class init
 */
import { takeEvery, all } from 'redux-saga/effects';
import * as types from '../actions/types';
import * as loginSaga from '../features/login/saga';
import * as profileSaga from '../features/profile/saga';

export default function* watch() {
  yield all([takeEvery('login/loginRequest', loginSaga.loginAsync)]);
  yield all([takeEvery('profile/profileDetailsRequest', profileSaga.profileAsync)]);
}
