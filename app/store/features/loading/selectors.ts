import { createSelector } from '@reduxjs/toolkit';

export const loadingSelector = (state: any) => state.isLoggedIn;
