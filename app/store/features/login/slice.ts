import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit'; // Importing from `utils` makes them more type-safe ✅
import {LoginState} from './types';
import * as loginSaga from './saga';

import {useInjectReducer, useInjectSaga} from 'redux-injectors';
import { Alert } from 'react-native';

// The initial state of the Homepage
export const initialState: LoginState = {
  isLoggedIn: false,
  id: 0,
  roll: '',
  accessToken: '',
  userName: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginResponse(state: LoginState, action: any) {
      console.log("resp==",action?.payload?.body);
      state.id = action?.payload?.body.userId;
      state.accessToken = action?.payload?.body?.accessToken;
      state.isLoggedIn = true;
    },
    loginRequest(state: LoginState, action: any) {
      state.userName = action.payload.userName;
    },
    loginError(state: LoginState) {
      state.isLoggedIn = false;
    },
    logoutRequest(state: LoginState) {
      state.isLoggedIn = false;
    },
  },
});

/**
 * `actions` will be used to trigger change in the state from where ever you want
 */
export const {actions: loginActions} = loginSlice;
export default loginSlice.reducer;

export const useLoginSlice = () => {
  useInjectReducer({key: loginSlice.name, reducer: loginSlice.reducer});
  useInjectSaga({key: 'login/loginRequest', saga: loginSaga.loginAsync});
  return {actions: loginSlice.actions};
};
