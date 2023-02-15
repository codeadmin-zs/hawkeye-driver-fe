import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit'; // Importing from `utils` makes them more type-safe ✅
import {ProfileState} from './types';
import * as profileSaga from './saga';

import {useInjectReducer, useInjectSaga} from 'redux-injectors';
import { Alert } from 'react-native';

// The initial state of the Homepage
export const initialState: ProfileState = {
  profileDetails: [],
  name: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileDetailsResponse(state: ProfileState, action: any) {
        
      state.name = action?.payload?.body?.name;
      state.profileDetails = action?.payload?.body;
    },
    profileDetailsRequest(state: ProfileState) {
      state.profileDetails= [];
      state.name= '';
    },
    profileDetailsError(state: ProfileState) {
        state.profileDetails= [];
        state.name= '';
    },
  },
});

/**
 * `actions` will be used to trigger change in the state from where ever you want
 */
export const {actions: profileActions} = profileSlice;
export default profileSlice.reducer;

export const useProfileSlice = () => {
  useInjectReducer({key: profileSlice.name, reducer: profileSlice.reducer});
  useInjectSaga({key: 'profile/profileDetailsRequest', saga: profileSaga.profileAsync});
  return {actions: profileSlice.actions};
};
