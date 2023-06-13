import { StyleSheet } from "react-native";
import AppStyles from "../../config/styles";

export const makeStyles = (colors: any) => {
  return StyleSheet.create({
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
    toggleBar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "100%",
      backgroundColor: AppStyles.color.COLOR_WHITE,
    },
    activeTab: {
      borderBottomColor: colors.primary,
      borderBottomWidth: 3,
      paddingVertical: "2%",
      width: "50%",
    },
    inActive: {
      paddingVertical: "2%",
      width: "50%",
    },
    mapContainer: {
      flex: 1,
      width: "100%",
    },
    map: {
      flex: 1,
    },
  });
};
