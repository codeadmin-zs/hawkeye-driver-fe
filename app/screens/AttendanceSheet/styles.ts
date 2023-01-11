import {StyleSheet} from 'react-native';

export const makeStyles = (colors: any, isParental) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    fillBox: {
      width: '100%',
      backgroundColor: colors.primary,
      height: '5%',
    },
    attendanceBoxContainer: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: '4%',
      justifyContent: 'space-between',
      marginTop: '2%',
    },
    StudentPodContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '92%',
      alignSelf: 'center',
      top: '-6%',
    },
    textBoxContainer: {
      flex: 1,
      width: '100%',
    },
  });
