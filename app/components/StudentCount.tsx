import React, { FunctionComponent, ReactNode } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "react-native-paper";
import Dimensions from "../utils/helper";
import { Typography } from "./Typography";
import UserIcon from "../assets/Svgs/UserIcon.svg";

const dim = Dimensions.Screen;

interface StudentCountProps {
  children: ReactNode;
}

const StudentCount: FunctionComponent<any> = ({boardedCount,notBoardedCount,yetBoardedCount}) => {
  const { colors } = useTheme();

  //   if (!data) {
  //     return null;
  //   }
  const styles = makeStyles(colors);

  return (
    <View style={styles.detailsContainer}>
      <Typography.H5Light style={{ color: "green" }}>
        {`Boarded : ${boardedCount}`}
      </Typography.H5Light>
      <Typography.H5Light style={{ color: "red" }}>
        {`Not Boarded : ${notBoardedCount}`}
      </Typography.H5Light>
      <Typography.H5Light>{`Yet To Board : ${yetBoardedCount}`}</Typography.H5Light>
    </View>
  );
};

export default StudentCount;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    detailsContainer: {
      width: "92%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "2%",
      marginBottom: '1%',
      alignSelf:'center'
    },
  });
