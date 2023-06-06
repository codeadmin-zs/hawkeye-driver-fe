import React, { FunctionComponent, ReactNode, useState } from "react";
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
import { BusAttendant, Dots } from "../components/svgComponents";
import ActionBar from "./ActionBar";
import UserIcon from "../assets/Svgs/UserIcon.svg";
import { moderateScale } from "react-native-size-matters";
import { Driver } from "./svgComponents";
import AppStyles from "../config/styles";

const dim = Dimensions.Screen;

interface BusPodProps {
  busNumber: string;
  time: string;
  plateNumber: string;
  attendandName: string;
  driverName: string;
  onPress?: any;
  onMenuPress?: any;
}

const BusPod: FunctionComponent<any> = ({
  busNumber,
  time,
  plateNumber,
  attendandName,
  driverName,
  onPress,
  onMenuPress,
}: BusPodProps) => {
  const { colors } = useTheme();

  const styles = makeStyles(colors);
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.podContainer}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <View style={styles.logoBox}>
                <Bus />
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View
                style={[
                  styles.subContainer,
                  { justifyContent: "space-between" },
                ]}
              >
                <Typography.H4>{busNumber}</Typography.H4>
                <Typography.H6>{time}</Typography.H6>
              </View>
              <View style={styles.subContainer}>
                <Typography.H5 style={{ color: "#909090", paddingLeft: "1%" }}>
                  {`${plateNumber}`}
                </Typography.H5>
              </View>
            </View>
          </View>
          <View style={styles.bottomBox}>
            <View
              style={{
                paddingLeft: "4%",
                width: "80%",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={styles.bottomDataContainer}
                onPress={() => Linking.openURL(`tel:5500`)}
              >
                <View style={styles.iconBg}>
                  <Driver
                    size={moderateScale(12)}
                    color={AppStyles.color.COLOR_SECONDARY_BLUE}
                  />
                </View>
                <Typography.H6
                  style={{ paddingHorizontal: "6%" }}
                  numberOfLines={1}
                >
                  {driverName}
                </Typography.H6>
                <Phone />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bottomDataContainer}
                onPress={() => Linking.openURL(`tel:5511`)}
              >
                <View style={styles.iconBg}>
                  <BusAttendant
                    size={moderateScale(12)}
                    color={AppStyles.color.COLOR_SECONDARY_BLUE}
                  />
                </View>
                <Typography.H6Light
                  style={{ paddingHorizontal: "6%" }}
                  numberOfLines={1}
                >
                  {attendandName}
                </Typography.H6Light>
                <Phone />
              </TouchableOpacity>
            </View>
            <View
              style={{
                padding: 5,
                width: moderateScale(16),
                flex: 0.2,
              }}
            >
              <TouchableOpacity
                onPress={onMenuPress}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                hitSlop={{ top: 4, bottom: 4, left: 8, right: 8 }}
              >
                <Dots />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default BusPod;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    podContainer: {
      width: "100%",
      backgroundColor: colors.surfaceBackground,
      marginBottom: moderateScale(6),
      borderRadius: 5,
    },
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      backgroundColor: colors.surfaceBackground,
      paddingVertical: "3%",
      paddingHorizontal: "2%",
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
    },
    detailsContainer: { width: "75%" },
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
      justifyContent: "space-between",
      paddingBottom: "4%",
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
      marginBottom: "2%",
    },
    bottomDataContainer: {
      flexDirection: "row",
      alignItems: "center",
      minHeight: moderateScale(24),
      flex: 0.5,
      marginRight: moderateScale(5),
    },
    iconBg: {
      backgroundColor: AppStyles.color.COLOR_LIGHT_BLUE,
      height: moderateScale(16),
      width: moderateScale(16),
      borderRadius: moderateScale(13),
      alignItems: "center",
      justifyContent: "center",
    },
  });
