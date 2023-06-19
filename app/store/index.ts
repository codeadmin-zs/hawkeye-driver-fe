import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  persistCombineReducers,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../store/rootReducer';  //where reducers is a object of reducers;
import sagas from '../store/sagas';
import loadingReducer from './features/loading/slice';
import loginReducer from './features/login/slice';
import themeReducer from './features/theme/slice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login','profile'],
  debug: true, //to get useful logging
};

const devMode = process.env.NODE_ENV === 'development';
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware];

if (devMode) {
  middleware.push(logger);
}

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: devMode,
  middleware,
});

const persistor = persistStore(store);

const storeHelpers = {
  getAccessToken: () => store.getState().login.accessToken,
  getUserId: () => store.getState().login.id,
  getUserName: () => store.getState().profile.name,
  getUserDetails: () => store.getState().profile.profileDetails
};

const configStore = () => {
  return {persistor, store};
};

sagaMiddleware.run(sagas);

export {storeHelpers};

export default configStore;
