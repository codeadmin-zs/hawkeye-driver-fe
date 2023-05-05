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
import Logo from "../assets/Logo.svg";
import UserIcon from "../assets/Svgs/UserIcon.svg";
import { moderateScale } from "react-native-size-matters";

const dim = Dimensions.Screen;

interface WithLogoHeaderProps {
  children: ReactNode;
}

const DriverPod: FunctionComponent<any> = (props) => {
  const { colors } = useTheme();
  const { data, vehicle } = props;

  if (!data) {
    return null;
  }
  const styles = makeStyles(colors);

  return (
    <TouchableOpacity style={styles.container} onPress={props?.onPress}>
      <View style={styles.logoContainer}>
        <UserIcon />
      </View>
      <View style={styles.detailsContainer}>
        <Typography.H4 color={"#000"}>{data.name}</Typography.H4>
        <View style={styles.busDetails}>
          <Typography.H6Light style={{ color: "#000" }}>
            Bus : {vehicle.name}
          </Typography.H6Light>
          <Typography.H6Light
            style={{ color: "#000", marginLeft: moderateScale(20) }}
          >
            Plate : {vehicle.plate}
          </Typography.H6Light>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DriverPod;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      marginVertical: "1%",
      backgroundColor: colors.surfaceBackground,
      elevaton: 30,
      paddingVertical: "3%",
      borderRadius: 5,
    },
    detailsContainer: { width: "75%" },
    logoContainer: {
      width: "30%",
      justifyContent: "center",
      alignItems: "center",
    },
    busDetails: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
  });
