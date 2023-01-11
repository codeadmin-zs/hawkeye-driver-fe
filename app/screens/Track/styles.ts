import {StyleSheet} from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      width: '100%',
    },
    podContainer: {
      padding: '4%',
      backgroundColor: colors.primary,
    },
    Line: {
      flex: 1,
      borderLeftWidth: 1,
      borderStyle: 'dashed',
      borderLeftColor: '#0090D9',
      padding: 0,
      margin: 0,
    },
    Marker: {
      width: '18%',
      flexDirection: 'column',
      alignItems: 'center',
    },
    dataContainer: {
      marginTop: '3%',
      width: '100%',
      flexDirection: 'row',
    },

    tabButtonBox: {
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
  });
