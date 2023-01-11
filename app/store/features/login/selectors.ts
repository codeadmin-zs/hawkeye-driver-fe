import { createSelector } from '@reduxjs/toolkit';

export const loginSelector = (state: any) => state.isLoggedIn;
