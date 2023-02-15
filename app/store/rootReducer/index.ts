/*
 * combines all th existing reducers
 */
import loadingReducer from '../features/loading/slice';
import loginReducer from '../features/login/slice';
import themeReducer from '../features/theme/slice';
import profileReducer from '../features/profile/slice';

const rootReducer = {
  login: loginReducer,
  loading: loadingReducer,
  theme: themeReducer,
  profile: profileReducer,
};

export default rootReducer;
