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
import Coords from "../assets/Svgs/Coordinates.svg";
import Bus from "../assets/Svgs/Bus.svg";
import Phone from "../assets/Svgs/Phone.svg";
import Menu from "../assets/Svgs/3Dot.svg";
import { storeHelpers } from "app/store";
import moment from "moment";
import UserIcon from "../assets/Svgs/UserIcon.svg";
import { moderateScale } from "react-native-size-matters";

const dim = Dimensions.Screen;

interface WithLogoHeaderProps {
  children: ReactNode;
}

const TrackPod: FunctionComponent<any> = (props) => {
  const { colors } = useTheme();
  const { plateNo, pathid, pathname, btime, etime, stations } =
    props?.trackData;

  const styles = makeStyles(colors);
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Bus />
      </View>
      <View style={styles.detailsContainer}>
        <Typography.H4>{pathname}</Typography.H4>

        <Typography.H5 style={{ color: "#474545", margin: 0  }}>
        <Typography.H5 style={{ color: "#909090",margin:0  }}>Route No : </Typography.H5>
        {`${pathid}`}
        </Typography.H5>

        <Typography.H5 style={{ color: "#909090",margin:0 }}>
          {plateNo}
        </Typography.H5>
        
      </View>
     
    </View>
  );
};

export default TrackPod;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      backgroundColor: colors.surfaceBackground,
      paddingVertical: "3%",
      borderRadius: 5,
    },
    detailsContainer: { width: "80%", paddingLeft: "2%" ,},
    logoContainer: {},
    logoBox: {
      borderRadius: 5,
      padding: "5%",
      marginHorizontal: "2%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#DEEDFF",
      width: "20%",
    },
    dataItemContainer: {
      width: "80%",
      borderBottomColor: colors.passive,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: "2%",
      backgroundColor: "#fff",
    },
    placeDataContainer: {
      width: "100%",
      borderBottomColor: colors.passive,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "2%",
      backgroundColor: "#fff",
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
    },
    driverNameContainer:{
      paddingTop:'1%',
      flexDirection: "row",
      width: '100%'
    }
  });
