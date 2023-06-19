import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavigationService from "app/navigation/NavigationService";
import { moderateScale } from "react-native-size-matters";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../store/features/loading/slice";

import { DateTab, Header, TrackPod, NoResourceFound } from "app/components";
import ExpandableList from "app/components/ExpandableList";
import { t } from "../../i18n";
import { Typography } from "../../components/Typography";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import { makeStyles } from "./styles";
import { FutureDateTab } from "app/components/FutureDateTab";
import AppStyles from "../../config/styles";
import {
  getVehicleDetails,
  getVehiclePaths,
  getRoutesOfVehicle,
  getStopsOfRoute,
} from "../../services/vehicles";
import BusPod from "../../components/BusPod";
import RouteListView from "app/components/RouteListView";
import ScheduledRoutes from "app/components/ScheduledRoutes";

const MyBus: React.FC = ({ route }) => {
  const { profileInfo, vehicleDetails = null } = route.params;
  console.log("profileInfo222", profileInfo);
  console.log("vehicleDetails222", vehicleDetails);
  console.log("busname", vehicleDetails?.guid);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [date, setDate] = useState({
    startDate: moment().format("YYYY-MM-DD"),
  });
  const [stops, setStops] = useState([]);
  const [stopsCoordinates, setStopsCoordinates] = useState([]);
  const [routes, setRoutes] = useState();
  const [isDateClickedOnce, setIsDateClickedOnce] = useState(false);

  const [getVehiclesData, setGetVehiclesData] = useState({});
  // const [dateDetails, setDateDetails] = useState(initialDate);
  const [vehicleRoutes, setVehicleRoutes] = useState();
  const [getStops, setGetStops] = useState([]);
  // console.log("dateeee",dateDetails.startDate);

  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loading?.isLoading);

  const dateChangeHandler = (date) => {
    console.log("date", date);
    setDate((prev) => {
      return { ...prev, startDate: date };
    });
  };

  useEffect(() => {
    const getVehicles = async () => {
      dispatch(loadingActions.enableLoading());
      const vehicleResponse = await getVehicleDetails(vehicleDetails?.guid);
      console.log("&&&vehicleResponse", vehicleResponse);
      console.log("vehicleGuid", moment(date.startDate).format("YYYY-MM-DD"));
      const vehiclesRes = vehicleResponse?.body;
      setGetVehiclesData(vehiclesRes);

      let routesRespp = null;
      if (isDateClickedOnce) {
        routesRespp = await getRoutesOfVehicle(
          vehicleDetails?.guid,
          moment(date.startDate).format("YYYY-MM-DD")
        );
      } else {
        routesRespp = await getRoutesOfVehicle(vehicleDetails?.guid, null);
      }
      // const vehicleRoutes = routesRespp?.body;
      console.log("getVehicleRoutes", routesRespp?.body);
      const routesOfVehicle = routesRespp?.body;
      setVehicleRoutes(routesRespp?.body);
      setStops(new Array(routesRespp?.body?.length));
      // setStopsCoordinates(new Array(routeResponse.body?.length));

      dispatch(loadingActions.disableLoading());
    };
    getVehicles();
  }, [date]);

  const goBack = () => NavigationService.goBack();

  return (
    <View style={styles.container}>
      <Header
        title={t("myBus.title")}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <View style={styles.topContainer}>
        <FutureDateTab
          startDate={date.startDate}
          onChangeDate={(date) => dateChangeHandler(date)}
          isDateClickedOnce={isDateClickedOnce}
          setIsDateClickedOnce={setIsDateClickedOnce}
        />
        <View style={styles.busPod}>
          <BusPod
            busNumber={vehicleDetails?.name}
            plateNumber={vehicleDetails?.plate}
            // time={"8:10 AM"}
            driverName={profileInfo.name}
            // showDots={true}
          />
        </View>
      </View>
      {isLoading ? (
        <View style={styles.fullView}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              // width: "80%",
              paddingHorizontal:moderateScale(35)
            }}
          >
            <ScheduledRoutes
              profileInfo={profileInfo}
              routesOfvehicle={vehicleRoutes}
              stops={stops}
              isDateClickedOnce={false}
              vehicleDetails={vehicleDetails}
              date={date}
              showRoutesNumber={true}
            />
            {/* {vehicleRoutes?.length > 0 ? (
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
                    {vehicleRoutes?.length} {findRouteNoun()} found
                    {isDateClickedOnce ? findDateOfRoute() : ""}
                  </Typography.H6Light>
                </>
               
                {vehicleRoutes?.length > 0 && (
                  <View style={{ width: "92%", marginTop: moderateScale(6) }}>
                    {vehicleRoutes?.map((item, index) => (
                      <>
                        <View>
                          <View
                            style={{ marginBottom: moderateScale(4) }}
                          ></View>
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
                            {stops?.length > 0 && stops[index] && (
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
                                        color:
                                          AppStyles.color.COLOR_SECONDARY_BLUE,
                                      }}
                                      onPress={() =>
                                       { showRouteOnMap(stops[index].stopsDetail)
                                      console.log("button pressed");
                                      }
                                      }
                                    >
                                      {t("map.viewOnMap")}
                                    </Typography.H5Light>
                                  </TouchableOpacity>
                                </View>
                                <RouteListView
                                  profileInfo={profileInfo}
                                  vehicleRoutes={vehicleRoutes}
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
            )} */}
          </View>
        </ScrollView>
      )}
    </View>
  );
};
// const styles = StyleSheet.create({
//   text: {
//     color: "black",
//     fontSize: moderateScale(32),
//   },
//   titleContainerStyle: {
//     borderColor: AppStyles.color.COLOR_MEDIUM_LIGHT_GREY,
//     borderWidth: 12,
//     // backgroundColor:"red"
//   },
// });

export default MyBus;
