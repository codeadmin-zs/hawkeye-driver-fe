import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import AppStyles from "../../config/styles";

export const makeStyles = () =>
  StyleSheet.create({
    horizontalBtn: {
      height: moderateScale(10),
      backgroundColor: AppStyles.color.COLOR_DARK_BLUE,
      borderRadius: moderateScale(5),
      position: "absolute",
      bottom: moderateScale(14),
      left: "40%",
      right: "40%",
    },
    refreshBtn: {
      borderRadius: moderateScale(5),
      position: "absolute",
      zIndex: 10,
      top: "1%",
      right: "2%",
      padding: moderateScale(10),
    },

    dataContainer: {
      marginTop: "3%",
      width: "100%",
      flexDirection: "row",
    },
    headerContainer:{
      backgroundColor:AppStyles.color.COLOR_DARK_BLUE,
      padding:moderateScale(15)
    }
  });
