import {StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import AppStyles from "../../config/styles";

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
    titleContainerStyle: {
      borderColor: AppStyles.color.COLOR_MEDIUM_LIGHT_GREY,
      borderWidth: 5,
      padding: moderateScale(15),
      paddingHorizontal:moderateScale(15)
    },
    titleStyle: {
      fontSize: moderateScale(14),
    },

    listStyle: {
      backgroundColor: "transparent",
    },
  });
