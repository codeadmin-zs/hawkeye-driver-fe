import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

import metrics from "../config/metrics";

import { HalfButton } from "./button";
import AppStyles from "../config/styles";

export default function MessageBox(props) {
  const { alarmDetails } = props;

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        zIndex: 10,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(110,110,110,.5)",
      }}
      activeOpacity={1}
      onPress={props.onPress}
    >
      <View
        style={{
          width: "75%",
          paddingHorizontal: moderateScale(25),
          paddingVertical: moderateScale(15),

          justifyContent: "space-around",
          backgroundColor: "white",
          alignItems: "center",
          borderRadius: moderateScale(5),
        }}
      >
        <View style={{ marginBottom: "6%" }}>
          <Text
            style={{
              fontWeight: "900",
              fontSize: moderateScale(16),
              marginLeft: "auto",
              marginRight: "auto",
              marginVertical: "2%",
            }}
          >
            STATUS
          </Text>
          <Text
            style={{
              color: AppStyles.color.COLOR_BLACK,
              fontWeight: "bold",
              textDecorationLine: "underline",
              textDecorationColor: AppStyles.color.COLOR_BLACK,
            }}
          >
            Alarm Details
          </Text>
          <Text style={{ color: AppStyles.color.COLOR_BLACK }}>
            Alarm : {alarmDetails?.alarmText}
          </Text>
          <View
            style={{
              fontFamily: "Poppins-SemiBold",
              color: AppStyles.color.COLOR_MEDIUM_DARK_GREY,
              fontSize: moderateScale(16),
              textAlign: "center",
            }}
          >
            <Text>Speed : {alarmDetails?.speed} km/hr</Text>
            <Text>Direction : {alarmDetails?.sdirect}</Text>
            <Text>Status : {alarmDetails?.statusText}</Text>
            <Text>Driver Name : {alarmDetails?.driverid}</Text>
            <Text>Date : {alarmDetails?.createtime}</Text>
          </View>
        </View>
        <Pressable
          onPress={props.onPress}
          style={{
            paddingVertical: moderateScale(8),
            paddingHorizontal: moderateScale(14),
            backgroundColor: AppStyles.color.COLOR_DARK_BLUE,
            borderRadius: moderateScale(5),
          }}
        >
          <Text
            style={{
              color: AppStyles.color.COLOR_WHITE,
              fontSize: moderateScale(12),
              fontWeight: "bold",
            }}
          >
            {props.Label}
          </Text>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
}
