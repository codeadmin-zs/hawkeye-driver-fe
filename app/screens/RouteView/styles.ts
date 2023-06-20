import { StyleSheet } from "react-native";
import AppStyles from "../../config/styles";
import { moderateScale } from "react-native-size-matters";

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    topContainer: {
      width: "100%",
      backgroundColor: colors.primary,
      paddingBottom: "2%",
    },
    busPodContainer: {
      width: "92%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    tabButtonBox: {
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    contentContainer: {
      width: "100%",
    },
    podContainer: {
      padding: "4%",
      backgroundColor: colors.primary,
    },
    Line: {
      flex: 1,
      borderLeftWidth: 1,
      borderStyle: "dashed",
      borderLeftColor: "#0090D9",
      padding: 0,
      margin: 0,
    },
    Marker: {
      width: "18%",
      flexDirection: "column",
      alignItems: "center",
    },
    dataContainer: {
      marginTop: "3%",
      width: "100%",
      flexDirection: "row",
    },
    dataItemContainer: {
      marginVertical: "1%",
      borderBottomWidth: 1,
      borderBottomColor: colors.passive,
      marginRight: "8%",
    },
    dataItemBox: {
      flex: 1,
      justifyContent: "space-between",
      paddingBottom: "3.2%",
    },
    fullView: {
      justifyContent: "center",
      width: "100%",
      height: "50%",
    },
    titleContainerStyle: {
      backgroundColor: AppStyles.color.COLOR_WHITE,
      padding: moderateScale(5),
    },
    titleStyle: {
      fontSize: moderateScale(14),
    },

    listStyle: {
      backgroundColor: "transparent",
    },
  });
