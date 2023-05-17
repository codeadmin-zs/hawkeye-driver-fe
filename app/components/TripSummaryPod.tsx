import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import React from "react";
import { moderateScale } from "react-native-size-matters";
import AppStyles from "../config/styles";
import StartTrackIcon from "../assets/Svgs/StartTrackIcon.svg";
import Origin from "../assets/Svgs/El1.svg";
import RightArrow from "../assets/Svgs/RightArrow.svg";
import Bus from "../assets/Svgs/Bus.svg";
import { SchoolBus, RoundOdo, PartialOdo } from "../components/svgComponents";
import TripDots from "./TripDots";

export const TripSummaryPod = ({ data, showArrow = true }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.pod}>
      <View style={styles.header}>
        <SchoolBus width={28} height={20} color={"#0090D9"} />
        <Text style={styles.headerText}>{data.plate}</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.leftContainer}>
          <View style={{ marginLeft: "auto", marginRight: "auto" }}>
            <StartTrackIcon />
          </View>
          <TripDots repeat={10} />

          <View
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: moderateScale(-4),
            }}
          >
            <Origin />
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Text style={{ fontWeight: "bold" }}>
            Destination :{" "}
            <Text style={{ color: colors.primary }}>
              {data.startLat} / {data.startLang}
            </Text>
          </Text>
          <Text>{data.endDate}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.tripSpeedDetailsContainer}>
              {/* <RoundOdo width={10} height={10} iconColor={"gray"} /> */}
              <View style={styles.tripSpeedDetails}>
                <PartialOdo width={10} height={10} iconColor={"gray"} />
                <Text
                  style={{ marginLeft: moderateScale(8), fontWeight: "bold" }}
                >
                  {data.totalodo} Kms
                </Text>
              </View>
              <View style={styles.tripSpeedDetails}>
                <RoundOdo width={10} height={10} iconColor={"gray"} />
                <Text style={{ marginLeft: moderateScale(8) }}>
                  Max Speed: {data.maxspeed} Km/h
                </Text>
              </View>
              <View style={styles.tripSpeedDetails}>
                <RoundOdo width={10} height={10} iconColor={"gray"} />
                <Text style={{ marginLeft: moderateScale(8) }}>
                  No Of Alarms: {data.totalalarmcnt}
                </Text>
              </View>
            </View>
            {showArrow && <RightArrow />}
          </View>
          <Text style={{ fontWeight: "bold" }}>
            Origin :{" "}
            <Text style={{ color: colors.primary }}>
              {data.startLat} / {data.endLang}
            </Text>
          </Text>
          <Text>{data.startDate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pod: {
    backgroundColor: AppStyles.color.COLOR_WHITE,
    padding: moderateScale(6),
    width: "100%",
    minHeight: 80,
    marginVertical: "2%",
    borderRadius: moderateScale(5),
  },
  header: {
    marginBottom: moderateScale(10),
    display: "flex",
    flexDirection: "row",
  },
  headerText: {
    fontWeight: "bold",
    marginLeft: moderateScale(5),
  },
  details: {
    display: "flex",
    flexDirection: "row",
  },
  leftContainer: {
    width: "10%",
  },
  rightContainer: {
    width: "85%",
  },
  tripSpeedDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  tripSpeedDetailsContainer: {
    marginVertical: moderateScale(8),
  },
});
