import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit'; // Importing from `utils` makes them more type-safe ✅
import {ILoading} from './types';
import {useInjectReducer, useInjectSaga} from 'redux-injectors';

// The initial state of the Homepage
export const initialState: ILoading = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    enableLoading(state: ILoading) {
      state.isLoading = true;
    },
    disableLoading(state: ILoading) {
      state.isLoading = false;
    },
  },
});

/**
 * `actions` will be used to trigger change in the state from where ever you want
 */
export const {actions: loadingActions} = loadingSlice;
export default loadingSlice.reducer;
