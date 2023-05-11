import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import AppStyles from "../../config/styles";

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    topContainer: {
      width: "100%",
      backgroundColor: colors.primary,
      paddingBottom: "2%",
    },
    studentPod: {
      width: "92%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    MainContainer: {
      // backgroundColor:'red',
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
      //   backgroundColor: "yellow",
      paddingTop: moderateScale(11),
      paddingBottom: moderateScale(11),
    },
    DateContainer: {
      width: "92%",
      overflow: "hidden",
      backgroundColor: "#FFFFFF",
      borderRadius: moderateScale(5),
      flexDirection: "column",
      alignItems: "center",
    },
    DateBarContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    CalenderElementStyle: {
      paddingHorizontal: moderateScale(11),
      paddingVertical: moderateScale(9),
      flexGrow: 1,
      alignSelf: "flex-end",
      alignItems: "center",
    },
    list: {
      width: "92%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    errorMsg: {
      position: "absolute",
      top: "25%",
      left: "15%",
      height: moderateScale(150),
      justifyContent: "space-between",
      alignItems: "center",
    },
    extraBoldFont: {
      fontWeight: "900",
      fontSize: moderateScale(15),
    },
    flexContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    buttonStyle: {
      paddingVertical: moderateScale(10),
      paddingHorizontal: moderateScale(15),
      backgroundColor: AppStyles.color.COLOR_DARK_BLUE,
      borderRadius: moderateScale(5),
    },
  });
