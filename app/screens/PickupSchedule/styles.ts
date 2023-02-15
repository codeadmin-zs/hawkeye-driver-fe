import {StyleSheet} from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    tabButtonBox: {
      flexGrow:0,
      width:'100%',
      flexDirection: 'row',
      backgroundColor: '#fff',
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
    dataItemContainer: {
      marginVertical: '2%',
      borderBottomWidth: 1,
      borderBottomColor: colors.passive,
      marginRight: '8%',
    },
    dataItemBox: {
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: '1%',
    },
    fullView: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    boardingInfoBox: {
      width: '100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems: 'center'
    }
  });
