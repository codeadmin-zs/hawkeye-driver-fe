import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

export const PaperThemeDefault = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#144072',
    secondary: '#AFD9FF',
    ternary: '#0090D9',
    link: '#3043F1',
    passive: '#909090',
    podContainer: '#ECEBEB',
    surfaceBackground: '#FFFFFF',
    screenBackground: '#FFFFFF',
    button: {
      text: '#FFFFFF',
      invertText: '#000000',
    },
  },
  // fonts: configureFonts({config: fontConfig}),
};

export const PaperThemeDark = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#144072',
    secondary: '#AFD9FF',
    ternary: '#0090D9',
    link: '#3043F1',
    passive: '#909090',
    podContainer: '#ECEBEB',
    surfaceBackground: '#FFFFFF',
    screenBackground: '#FFFFFF',
    button: {
      text: '#FFFFFF',
      invertText: '#000000',
    },
  },
  // fonts: configureFonts({config: fontConfig}),
};

export const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
};

export const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#303030',
    card: '#222222',
    text: '#ffffff',
  },
};
