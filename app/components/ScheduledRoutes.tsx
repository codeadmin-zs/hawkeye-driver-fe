import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import NavigationService from "app/navigation/NavigationService";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Typography } from "app/components/Typography";
import { t } from "app/i18n";
import { moderateScale } from "react-native-size-matters";
import AppStyles from "app/config/styles";
import moment from "moment";
import ExpandableList from "./ExpandableList";
import NoResourceFound from "./NoResourceFound";
import { getStopsOfRoute } from "app/services/vehicles";
import RouteListView from "app/components/RouteListView";

const ScheduledRoutes: React.FC = (props) => {
  const {
    profileInfo,
    routesOfvehicle,
    isDateClickedOnce,
    vehicleDetails,
    date,
    showRoutesNumber = false,
  } = props;
  console.log("profileInfo-sched", profileInfo);
  console.log("routesOfvehicle-scheduled", routesOfvehicle);

  const [stops, setStops] = useState([]);
  const [allStops, setAllStops] = useState([]);

  const findRouteNoun = () => {
    if (routesOfvehicle?.length === 1) {
      return "route";
    } else {
      return "routes";
    }
  };

  const findDateOfRoute = () => {
    if (isDateClickedOnce) {
      return (
        <Typography.H6Light
          style={{
            alignSelf: "flex-start",
            marginLeft: moderateScale(20),
            marginTop: moderateScale(8),
            color: AppStyles.color.COLOR_DARK_GREY,
          }}
        >
          {" "}
          {t("myBus.on")} {moment(date.startDate).format("DD-MMM-YYYY")}
        </Typography.H6Light>
      );
    }
  };

  const renderRouteHeader = (routeName, startDate, endDate, repeatedDays) => {
    if (repeatedDays) {
      return (
        <View
          style={{
            marginTop: moderateScale(8),
            marginBottom: moderateScale(4),
          }}
        >
          <Typography.H5>{routeName}</Typography.H5>
          <Typography.H6 style={{ color: AppStyles.color.COLOR_DARK_BLUE }}>
            {t("myBus.scheduleEvery")}
            {repeatedDays.replace(/,/g, ", ")}
          </Typography.H6>
        </View>
      );
    } else {
      return (
        <View
          style={{
            marginTop: moderateScale(8),
            marginBottom: moderateScale(4),
          }}
        >
          <Typography.H5>{routeName}</Typography.H5>
          <Typography.H6 style={{ color: AppStyles.color.COLOR_DARK_BLUE }}>
            {t("myBus.schedule")} - {moment(startDate).format("DD-MMM-YYYY")}{" "}
            {t("myBus.to")} {moment(endDate).format("DD-MMM-YYYY")}
          </Typography.H6>
        </View>
      );
    }
  };

  const showRouteOnMap = (stops) => {
    console.log("stops[0]", stops[0].latitude);
    console.log("stops-mybus", stops);
    const currentPos = {
      latitude: JSON.parse(stops[0].latitude),
      longitude: JSON.parse(stops[0].longitude),
    };
    NavigationService.navigate("RouteView", {
      vehicleDetails: vehicleDetails,
      fullTrips: stops,
      currentPos: currentPos,
      date: date,
      profileInfo: profileInfo,
    });
  };

  //fetchRoute is to make api call only once the route is pressed
  const fetchRoute = async (guid, index) => {
    //if condition to avoid unnecessary api call on repeated press of route
    if (!allStops[index]) {
      const tempData = [...allStops];

      const stopsResponse = await getStopsOfRoute(guid);
      console.log("stopsResponse", stopsResponse);
      // setStops(stopsResponse.body)

      const stopsCopy = stopsResponse.body;
      // stopsCopy.accordionPosition = index;
      tempData[index] = stopsCopy;
      setAllStops(tempData);
    }
  };

  return (
    <View>
      {routesOfvehicle?.length > 0 ? (
        <>
          <>
            {showRoutesNumber && (
              <View>
                <Typography.H6Light
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: moderateScale(25),
                    marginTop: moderateScale(8),
                    color: AppStyles.color.COLOR_DARK_GREY,
                  }}
                >
                  {routesOfvehicle?.length} {findRouteNoun()} found
                  {isDateClickedOnce ? findDateOfRoute() : ""}
                </Typography.H6Light>
              </View>
            )}
          </>
          {routesOfvehicle?.length > 0 && (
            <View
              style={{
                width: "100%",
                marginTop: moderateScale(6),
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {routesOfvehicle?.map((item, index) => (
                <>
                  <View style={styles.expandableContainer}>
                    {/* <View style={{ marginBottom: moderateScale(4) }}></View> */}
                    <ExpandableList
                      key={index}
                      title={renderRouteHeader(
                        item.routeName,
                        item.startdate,
                        item.enddate,
                        item.repeateddays
                      )}
                      titleContainerStyle={styles.titleContainerStyle}
                      listStyle={styles.listStyle}
                      titleStyle={styles.titleStyle}
                      onPress={() => fetchRoute(item.route_guid, index)}
                    >
                      {allStops?.length > 0 && allStops[index] && (
                        <>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor:
                                AppStyles.color.COLOR_MEDIUM_LIGHT_GREY,
                              padding: 10,
                            }}
                          >
                            <View
                              style={{
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: "center",
                              }}
                            >
                              <TouchableOpacity>
                                <Typography.H5Light
                                  style={{
                                    color: AppStyles.color.COLOR_SECONDARY_BLUE,
                                  }}
                                  onPress={() => {
                                    showRouteOnMap(
                                      allStops[index]?.stopsDetail
                                    );
                                    console.log("button pressed");
                                  }}
                                >
                                  {t("map.viewOnMap")}
                                </Typography.H5Light>
                              </TouchableOpacity>
                            </View>
                            <RouteListView
                              profileInfo={profileInfo}
                              vehicleRoutes={routesOfvehicle}
                              stops={allStops[index]?.stopsDetail}
                            />
                          </View>
                        </>
                      )}
                    </ExpandableList>
                  </View>
                </>
              ))}
            </View>
          )}
        </>
      ) : (
        <NoResourceFound title={t("errors.noRouteFound")} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: moderateScale(32),
  },
  titleContainerStyle: {
    borderColor: AppStyles.color.COLOR_MEDIUM_LIGHT_GREY,
    borderWidth: 1,
    padding: moderateScale(25),
    backgroundColor: AppStyles.color.COLOR_WHITE,
    // backgroundColor:"red"
  },
  expandableContainer: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(6),
  },
  titleStyle: {
    fontSize: moderateScale(14),
  },
  listStyle: {
    backgroundColor: "transparent",
  },
});

export default ScheduledRoutes;
