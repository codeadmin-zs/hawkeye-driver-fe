import {StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    topContainer: {
      width: "100%",
      backgroundColor: colors.primary,
      paddingBottom: "2%",
    },
    fullView: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    busPod: {
      paddingHorizontal: moderateScale(13)
    },
  });
