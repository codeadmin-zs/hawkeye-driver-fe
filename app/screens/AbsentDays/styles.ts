import {StyleSheet} from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
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
      paddingTop: '3%',
      width: '92%',
      height: '100%',
      backgroundColor: '#fff',
      alignSelf: 'center',
      top: '-2%',
    },
    absentDateText: {
      paddingTop: '2%',
      paddingLeft: '4%',
    },
    absentReasonText: {
      paddingBottom: '2%',
      paddingLeft: '4%',
    },
    line: {
      width: '100%',
      borderBottomWidth: 1,
      borderColor: colors.passive,
    },
  });
