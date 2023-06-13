import {StyleSheet} from 'react-native';
import { moderateScale } from "react-native-size-matters";

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    fullView: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    contentContainer: {width: '100%', paddingHorizontal: '4%'},
    headerContainer: {flexDirection: 'row', alignItems: 'center', justifyContent:"space-between"},
    headerContainerEvents:{flexDirection: 'row', alignItems: 'center'},
    messageText: {
      width: "100%",
      backgroundColor: "white",
      borderRadius: moderateScale(5),
      paddingLeft: "5%",
      marginVertical: "3%",
      paddingVertical: "3%",
    },
    holidayHeader:{
      flexDirection: 'row',
      alignItems:"center"
      
    }
  });
