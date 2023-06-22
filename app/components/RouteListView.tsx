import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { StartTrackIcon, StopTrackIcon } from "../components/svgComponents";
import AppStyles from "../config/styles";
import { moderateScale } from "react-native-size-matters";
import Dimensions from "../utils/helper";
import { Typography } from "./Typography";
import { t } from "../i18n";
import moment from "moment";
import Separator from "./Separator";
import { getRoutesOfVehicle, getStopsOfRoute } from "app/services/vehicles";
import { Colors } from "react-native-paper";

const dim = Dimensions.Screen;

// to position the dot at the center of the dotted line
const widthOfMarkerContainer = dim.width * 0.18;
const widthOfDot = moderateScale(10);
const negativeMargin = (-1 * (widthOfMarkerContainer + widthOfDot)) / 2;

function RouteListView(props) {
  const { stops } = props;
  console.log("SDWED", props);
  console.log("routename",props?.stops?.route?.name);

  return (
    <ScrollView
      style={{marginBottom:moderateScale(15) }}
      contentContainerStyle={{
        marginTop: moderateScale(20),
      }}
    >
      <View style={styles.dataContainer}>
        <View style={styles.marker}>
          <StartTrackIcon
            width={moderateScale(15)}
            height={moderateScale(23)}
            color={AppStyles.color.COLOR_SECONDARY_BLUE}
          />
          <View style={styles.line} />
          <StopTrackIcon
            width={moderateScale(20)}
            height={moderateScale(20)}
            color={AppStyles.color.COLOR_SECONDARY_BLUE}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            paddingBottom: "3.2%",
          }}
        >
          <Typography.H3 style={{ color: AppStyles.color.COLOR_BLACK }}>
            {props?.profileInfo?.schoolName}
          </Typography.H3>
          <Separator style={{ marginVertical: "2%", marginRight: "8%" }} />
          <View style={styles.dot}></View>
          {stops?.map((item, index) => (
            <>
              <View
                style={{
                  marginVertical: "1%",
                  borderBottomWidth: 1,
                  borderBottomColor: AppStyles.color.COLOR_MEDIUM_LIGHT_GREY,
                  marginRight: "8%",
                  position: "relative",
                }}
              >
                <View style={styles.dot}></View>
                <Typography.H5 style={{ color: AppStyles.color.COLOR_BLACK }}>
                  {item?.stopName}
                </Typography.H5>
                <Typography.H6 style={{ color: AppStyles.color.COLOR_GREY }}>
                  {t("myBus.eta")} :
                  {moment(item?.eta, "HH:mm:ss").format("hh:mm A")}
                </Typography.H6>
              </View>
            </>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default RouteListView;

const styles = StyleSheet.create({
  toggleBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    backgroundColor: AppStyles.color.COLOR_WHITE,
  },
  activeTab: {
    borderBottomColor: AppStyles.color.COLOR_DARK_BLUE,
    borderBottomWidth: 3,
    paddingVertical: "2%",
    width: "50%",
  },
  inActive: {
    paddingVertical: "2%",
    width: "50%",
  },
  line: {
    flex: 1,
    borderLeftWidth: 1,
    borderStyle: "dashed",
    borderLeftColor: "#0090D9",
    padding: 0,
    margin: 0,
  },
  marker: {
    width: widthOfMarkerContainer,
    flexDirection: "column",
    alignItems: "center",
  },
  dataContainer: {
    width: "100%",
    flexDirection: "row",
  },
  dot: {
    backgroundColor: AppStyles.color.COLOR_SECONDARY_BLUE,
    height: widthOfDot,
    width: widthOfDot,
    borderRadius: widthOfDot / 2,
    position: "absolute",
    marginLeft: negativeMargin,
  },
});
