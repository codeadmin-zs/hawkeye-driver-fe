import {StyleSheet} from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    fillBox: {
      width: '100%',
      backgroundColor: colors.primary,
      height: '5%',
    },
    StudentPodContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '92%',
      alignSelf: 'center',
      top: '-6%',
    },
    textBoxContainer: {
      // flex: 1,
      width: '100%',
      alignItems: 'center',
      // justifyContent: 'space-between',
    },
    textInput: {
      backgroundColor: '#fffff9',
      width: '100%',
      marginVertical:'2%',
      paddingLeft: '2%',
    },
  });
