import {StyleSheet} from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    topContainer: {
        width: "100%",
        backgroundColor: colors.primary,
        paddingBottom: "2%",
      },
  })