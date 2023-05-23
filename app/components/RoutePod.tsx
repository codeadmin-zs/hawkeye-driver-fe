import React, { FunctionComponent, ReactNode, useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useTheme } from "react-native-paper";
import Dimensions from "../utils/helper";
import { Typography } from "./Typography";
import Coords from "../assets/Svgs/Coordinates.svg";
import Bus from "../assets/Svgs/Bus.svg";
import Phone from "../assets/Svgs/Phone.svg";
import Menu from "../assets/Svgs/3Dot.svg";
import ActionBar from "./ActionBar";
import UserIcon from "../assets/Svgs/UserIcon.svg";
import { moderateScale } from "react-native-size-matters";
import moment from "moment";
import TrackDetails from "../screens/Track/components/TrackDetails";
import TrackPod from "app/components/TrackPod";
import { storeHelpers } from "app/store";

const dim = Dimensions.Screen;

interface BusPodProps {
  routeName: string;
  time: string;
  plateNumber: string;
  attendandName: string;
  driverName: string;
  onPress?: any;
}

const RoutePod: FunctionComponent<any> = ({
  routeData,
  driverName,
  onPress,
}) => {
  const { colors } = useTheme();
  const { pathname, etime, pathid, plateNo, btime, stations } = routeData;

  const styles = makeStyles(colors);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.detailsContainer}>
        <TrackPod trackData={routeData} driverName={driverName} />
      </View>
      <View style={styles.driverNameContainer}>
        <UserIcon height={moderateScale(20)} width={moderateScale(20)} />
        <Typography.H6 style={{ paddingHorizontal: "3%" }}>
          {storeHelpers.getUserName()}
        </Typography.H6>
      </View>

      <View style={{ width: "100%" }}>
        <TrackDetails stations={stations} />
      </View>
    </TouchableOpacity>
  );
};

export default RoutePod;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      backgroundColor: colors.surfaceBackground,
      paddingVertical: "3%",
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
    },
    detailsContainer: { width: "100%" },
    logoContainer: {
      width: "20%",
      justifyContent: "center",
      alignItems: "center",
    },
    logoBox: {
      borderRadius: 5,
      padding: "10%",
      marginHorizontal: "10%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#DEEDFF",
    },
    subContainer: {
      flex: 1,
      marginRight: "4%",
      flexDirection: "row",
      alignItems: "center",
    },
    bottomBox: {
      width: "100%",
      backgroundColor: colors.surfaceBackground,
      flexDirection: "row",
      paddingBottom: "1%",
    },
    bottomDataContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingRight: "10%",
      flex: 1,
    },
    boardingInfoBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      marginBottom: "2%",
      paddingHorizontal: "2%",
      paddingBottom: "2%",
    },
    driverNameContainer: {
      paddingTop: "1%",
      flexDirection: "row",
      paddingLeft: "3%",
      paddingBottom: "2%",
      width: "100%",
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      borderColor: "rgba(202, 202, 202, 0.8)",
    },
  });
