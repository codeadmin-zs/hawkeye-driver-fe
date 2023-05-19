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
import AppStyles from "app/config/styles";

const dim = Dimensions.Screen;

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
        <Typography.H3 color={AppStyles.color.COLOR_DARK_GREY}>
          {data.name}
        </Typography.H3>
        <View style={styles.busDetails}>
          <Typography.H5Light
            style={{ color: AppStyles.color.COLOR_DARK_GREY }}
          >
            Bus : {vehicle.name}
          </Typography.H5Light>
          <Typography.H5Light
            style={{
              color: AppStyles.color.COLOR_DARK_GREY,
              marginLeft: moderateScale(20),
            }}
          >
            Plate : {vehicle.plate}
          </Typography.H5Light>
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
      minHeight: 80,
    },
    detailsContainer: { width: "70%" },
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
