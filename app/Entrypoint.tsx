/**
 * React Native App
 * Everything starts from the Entry-point
 */
import React from 'react';
import {StatusBar, ActivityIndicator} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

import {
  PaperThemeDefault,
  PaperThemeDark,
  CombinedDefaultTheme,
  CombinedDarkTheme,
} from 'app/config/theme-config';
import Navigator from 'app/navigation';
import configStore from './store';
import {PersistGate} from 'redux-persist/es/integration/react';
import {IThemeState} from 'app/models/reducers/theme';
import {persistStore} from 'redux-persist';

const {persistor, store} = configStore();

interface IState {
  themeReducer: IThemeState;
}

const RootNavigation: React.FC = () => {
  const isDark = useSelector((state: IState) => state.themeReducer?.isDark);
  const paperTheme = isDark ? PaperThemeDark : PaperThemeDefault;
  const combinedTheme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <Navigator theme={combinedTheme} />
    </PaperProvider>
  );
};

const EntryPoint: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor="#144072" barStyle="light-content" />
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <RootNavigation />
        </PersistGate>
      </Provider>
    </>
  );
};

export default EntryPoint;
