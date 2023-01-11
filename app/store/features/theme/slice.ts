import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit'; // Importing from `utils` makes them more type-safe ✅
import {IThemeState} from './types';
import {useInjectReducer, useInjectSaga} from 'redux-injectors';

// The initial state of the Homepage
export const initialState: IThemeState = {
  isDark: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state: IThemeState, action: any) {
      state.isDark = action.isDark;
    },
  },
});

/**
 * `actions` will be used to trigger change in the state from where ever you want
 */
export const {actions: themeActions} = themeSlice;
export default themeSlice.reducer;

// export const useThemeSlice = () => {
//   useInjectReducer({key: slice.name, reducer: slice.reducer});
//   return {actions: slice.actions};
// };
