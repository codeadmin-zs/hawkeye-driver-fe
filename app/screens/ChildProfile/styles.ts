import {StyleSheet} from 'react-native';

export const makeStyles = (colors: any,isParental) =>
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
    attendanceTitleBox: {
      width: '50%',
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: '2.5%',
      top: '-3%',
    },
    attendanceContainer: {
      top: '-3%',
      flexDirection: 'row',
      width: '100%',
      backgroundColor: '#fff',
      paddingVertical: '2%',
    },
    attendanceBox: {
      width: '30%',
      backgroundColor: colors.secondary,
      alignItems: 'center',
      justifyContent: 'space-around',
      borderRadius: 10,
      marginLeft: '3%',
      paddingVertical: '2%',
    },
    detailsButton: {
      width: '50%',
      backgroundColor: isParental ? '#fff' : colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: '2.5%',
    },
    textBox: {
      backgroundColor: '#fff',
      marginVertical: '1%',
    },
    textBoxContainer: {
      backgroundColor: '#fff',
      width: '96%',
      alignSelf: 'center',
    },
    tabButtonContainer: {flexDirection: 'row', width: '100%', marginTop: 10},
    parentDetails: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isParental ? colors.primary : '#fff',
    },
    fullView: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
  });
