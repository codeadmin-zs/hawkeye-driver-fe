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

function RouteSummaryPod(props) {
  const { stops } = props;
  console.log("livelocationSDWED", props);
  const routeStops = props.stops;
  console.log("routeStops", routeStops.length);

  const startStop = props?.stops[0];
  const endStop = props?.stops[props.stops.length - 1];
  console.log("length", props?.stops?.length);

  return (
    <View style={{ backgroundColor: AppStyles.color.COLOR_WHITE }}>
      <ScrollView
        style={{ marginBottom: moderateScale(15) }}
        contentContainerStyle={{
          marginTop: moderateScale(20),
        }}
      >
        <View style={styles.dataContainer}>
          <View
            style={{
              // flex: 1,
              justifyContent: "space-between",
              paddingBottom: "3.2%",
            }}
          >
            <>
              <View
                style={{
                  marginVertical: "1%",
                  borderBottomWidth: 1,
                  borderBottomColor: AppStyles.color.COLOR_GREY_WHITE,
                  marginRight: "8%",
                  position: "relative",
                }}
              >
                <View style={styles.dot}></View>

                <View>
                  <View style={{ flexDirection: "row", marginBottom: "1%" }}>
                    <View style={styles.marker}>
                      <StartTrackIcon
                        width={moderateScale(15)}
                        height={moderateScale(23)}
                        color={AppStyles.color.COLOR_SECONDARY_BLUE}
                      />
                    </View>
                    <View style={styles.stopsNames}>
                      <Typography.H5
                        style={{ color: AppStyles.color.COLOR_BLACK_TRANSP }}
                      >
                        {startStop?.stopName}
                      </Typography.H5>
                      <Typography.H6
                        style={{
                          color: AppStyles.color.COLOR_BLACK,
                          fontWeight: "bold",
                        }}
                      >
                        {t("myBus.ETA")} :{startStop?.eta}
                      </Typography.H6>
                    </View>
                  </View>

                  <View style={styles.line} />

                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.marker}>
                      <StopTrackIcon
                        width={moderateScale(15)}
                        height={moderateScale(23)}
                        color={AppStyles.color.COLOR_SECONDARY_BLUE}
                      />
                    </View>
                    <View style={styles.stopsNames}>
                      <Typography.H5
                        style={{ color: AppStyles.color.COLOR_BLACK_TRANSP }}
                      >
                        {endStop?.stopName}
                      </Typography.H5>
                      <Typography.H6
                        style={{
                          color: AppStyles.color.COLOR_BLACK,
                          fontWeight: "bold",
                        }}
                      >
                        {t("myBus.ETA")} :{endStop?.eta}
                      </Typography.H6>
                    </View>
                  </View>
                </View>
              </View>
            </>
          </View>
        </View>
      </ScrollView>
      <View style={styles.stopsNumber}>
        <Typography.H1 style={{ marginRight: "2%" }}>
          {routeStops.length}
          {""}
        </Typography.H1>
        <Typography.H5Light>stops</Typography.H5Light>
      </View>
    </View>
  );
}

export default RouteSummaryPod;

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
    backgroundColor: "red",
    padding: 0,
    margin: 0,
    // marginLeft:"10%"
  },
  marker: {
    width: widthOfMarkerContainer,
    flexDirection: "column",
    alignItems: "center",
  },
  dataContainer: {
    marginTop: "3%",
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
  stopsNames: {
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stopsNumber: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: "3%",
  },
});
