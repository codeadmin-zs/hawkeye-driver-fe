import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";
import AppStyles from "../config/styles";
import {
  RoundOdo,
  PartialOdo,
  ClockIcon,
  LiveLocation,
  StartTrackIcon,
} from "../components/svgComponents";

const scaledWidth = moderateScale(10);
const scaledHeight = moderateScale(10);

const TripListViewPod = (props) => {
  const {
    statusText,
    speed,
    createtime,
    colors,
    driverid,
    lat,
    lang,
    alarmText,
  } = props;
  return (
    <View style={styles.pod}>
      <Text
        style={{
          fontWeight: "bold",
          color: colors.text,
          fontSize: moderateScale(16),
        }}
      >
        {driverid}
      </Text>
      <View>
        <Text
          style={{
            fontWeight: "bold",
            color: colors.text,
            marginBottom: moderateScale(10),
          }}
        >
          Status : {statusText}
        </Text>
      </View>
      <View style={styles.wrapper}>
        <StartTrackIcon
          width={scaledWidth}
          height={scaledHeight}
          color={AppStyles.color.COLOR_DARK_GREY}
        />
        <Text
          style={{
            marginLeft: moderateScale(8),
            color: AppStyles.color.COLOR_DARK_GREY,
          }}
        >
          Coords : {lat},{lang}
        </Text>
      </View>
      {alarmText && (
        <View style={styles.wrapper}>
          <Text style={{ color: AppStyles.color.COLOR_RED }}>
            Alarm : {alarmText}
          </Text>
        </View>
      )}
      <View style={styles.wrapper}>
        <PartialOdo
          width={scaledWidth}
          height={scaledHeight}
          iconColor={colors?.text}
        />
        <Text style={{ marginLeft: moderateScale(8) }}>{speed} km/hr</Text>
      </View>
      <View style={styles.wrapper}>
        <ClockIcon
          width={scaledWidth}
          height={scaledHeight}
          iconColor={"gray"}
        />
        <Text style={{ marginLeft: moderateScale(8) }}>
          {createtime?.split(" ")[1]}{" "}
        </Text>
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
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TripListViewPod;
