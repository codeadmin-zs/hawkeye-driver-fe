/*
 * combines all th existing reducers
 */
import loadingReducer from '../features/loading/slice';
import loginReducer from '../features/login/slice';
import themeReducer from '../features/theme/slice';
const rootReducer = {
  login: loginReducer,
  loading: loadingReducer,
  theme: themeReducer,
};

export default rootReducer;
