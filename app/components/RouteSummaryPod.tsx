import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text,Pressable } from "react-native";
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
import { DownArrow } from "./svgComponents";


const dim = Dimensions.Screen;

// to position the dot at the center of the dotted line
const widthOfMarkerContainer = dim.width * 0.18;
const widthOfDot = moderateScale(10);
const negativeMargin = (-1 * (widthOfMarkerContainer + widthOfDot)) / 2;

function RouteSummaryPod(props) {
  const { stops } = props;
  const routeStops = props.stops;
  const startStop = props?.stops[0];
  const endStop = props?.stops[props.stops.length - 1];

  const [expandList, setExpandList] = useState(false);

  function toggleList() {
    setExpandList((prev) => !prev);
    if (props.onPress) {
      props.onPress();
    }
  }


  return (
    <View style={{ backgroundColor: AppStyles.color.COLOR_WHITE }}>
       <Pressable onPress={toggleList}>
        <View
        >
            {typeof props.title === "string" ? (
 <Typography.H5Light style={{ ...props.titleStyle }}>
 {props.title}
</Typography.H5Light>
            ):(
              props.title
            )}
         
          <View
            style={{
              transform: expandList
                ? [{ rotateX: "180deg" }]
                : [{ rotateX: "0deg" }], flex: 1,
                justifyContent: 'center',
                alignItems: 'center',marginVertical:moderateScale(15)
            }}
          >
            <DownArrow
              width={moderateScale(30)}
              height={moderateScale(25)}
              color={"black"}
            />
          </View>
        </View>
      </Pressable>
      {expandList && (
        <>
      <ScrollView
        contentContainerStyle={{
          marginTop: moderateScale(13),
        }}
      >
        <View style={styles.dataContainer}>
          <View
            style={{
              justifyContent: "space-between",
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
                  <View style={{ flexDirection: "row" }}>
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
      <View style={styles.stopsDistance}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Typography.H3 style={{color:AppStyles.color.COLOR_RED,marginRight:4}}>58 min</Typography.H3>
          <Typography.H3Light style={{color:AppStyles.color.COLOR_GREY_TRANSP}}>(15Km)</Typography.H3Light>
        </View>
        <View style={styles.stopsNumber}>
          <Typography.H1 style={{ marginRight: "4%" }}>
            {routeStops.length}
          </Typography.H1>
          <Typography.H5Light>Stops</Typography.H5Light>
        </View>
      </View>
      </>
        )}

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

    padding: 0,
    marginLeft: moderateScale(33),
    height: 10,
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
  stopsNames: {
    width: "81%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stopsNumber: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  stopsDistance: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
	paddingHorizontal:"8%"
  },
});