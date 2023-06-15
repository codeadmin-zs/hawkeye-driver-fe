import React, {useState,useEffect } from "react";
import { View, TouchableOpacity,StyleSheet } from "react-native";
import { Typography } from "app/components/Typography";
import { t } from "app/i18n";
import { moderateScale } from "react-native-size-matters";
import AppStyles from "app/config/styles";
import moment from "moment";
import ExpandableList from "./ExpandableList";
import NoResourceFound from "./NoResourceFound";
import {getStopsOfRoute} from "app/services/vehicles";
import RouteListView from "app/components/RouteListView";


const ScheduledRoutes: React.FC = (props) => {
  const { profileInfo, routesOfvehicle, stops, isDateClickedOnce } = props;
  console.log("profileInfo-sched", profileInfo);
  console.log("routesOfvehicle-scheduled", routesOfvehicle);

  const [stop, setStop] = useState([]);

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
  };

 //fetchRoute is to make api call only once the route is pressed
 const fetchRoute = async (guid, index) => {
  //if condition to avoid unnecessary api call on repeated press of route
  if (!stops[index]) {
    const tempData = [...stops];

    const stopsResponse = await getStopsOfRoute(guid);
    console.log("stopsResponse", stopsResponse);

    const stopsCopy = stopsResponse.body;
    // stopsCopy.accordionPosition = index;
    tempData[index] = stopsCopy;
    setStop(tempData);
  }
};

  // console.log("currentPos", currentPos);


  return (
    <View>
      {routesOfvehicle?.length > 0 ? (
        <>
          <>
            <Typography.H6Light
              style={{
                alignSelf: "flex-start",
                marginLeft: moderateScale(20),
                marginTop: moderateScale(8),
                color: AppStyles.color.COLOR_DARK_GREY,
              }}
            >
              {routesOfvehicle?.length} {findRouteNoun()} found
              {isDateClickedOnce ? findDateOfRoute() : ""}
            </Typography.H6Light>
          </>
          {routesOfvehicle?.length > 0 && (
            <View style={{ width: "92%", marginTop: moderateScale(6) }}>
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
                      {stop?.length > 0 && stop[index] && (
                        <>
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
                                  showRouteOnMap(stops[index].stopsDetail);
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
                            stops={stops[index]?.stopsDetail}
                          />
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
    // backgroundColor:"red"
  },
  expandableContainer:{
    paddingHorizontal:moderateScale(40),
    paddingBottom: moderateScale(6),
  }
});

export default ScheduledRoutes;
