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

const MyBus: React.FC = ({ route }) => {
  const { profileInfo, vehicleDetails = null } = route.params;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [date, setDate] = useState({
    startDate: moment().format("YYYY-MM-DD"),
  });
  const [stops, setStops] = useState([]);
  const [routes, setRoutes] = useState();

  const [getVehiclesData, setGetVehiclesData] = useState({});
  const [vehicleRoutes, setVehicleRoutes] = useState();
  const [getStops, setGetStops] = useState([]);

  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loading?.isLoading);

  const dateChangeHandler = (date) => {
    setDate((prev) => {
      return { ...prev, startDate: date };
    });
  };

  useEffect(() => {
    const getVehicles = async () => {
      dispatch(loadingActions.enableLoading());
      const vehicleResponse = await getVehicleDetails(vehicleDetails?.guid);

      const vehiclesRes = vehicleResponse?.body;
      setGetVehiclesData(vehiclesRes);

      let routesRespp = null;
      routesRespp = await getRoutesOfVehicle(
        vehicleDetails?.guid,
        moment(date.startDate).format("YYYY-MM-DD")
      );
      setVehicleRoutes(routesRespp?.body);
      setStops(new Array(routesRespp?.body?.length));

      dispatch(loadingActions.disableLoading());
    
    };
    getVehicles();
  }, [date]);

  const fetchRoute = async (guid, index) => {
    if (!stops[index]) {
      const tempData = [...stops];

      const stopsResponse = await getStopsOfRoute(guid);

      const stopsCopy = stopsResponse.body;

      stopsCopy.accordionPosition = index;
      tempData[index] = stopsCopy;
      setStops(tempData);
    }
  };

  const getRouteName = (index) => {
    if (stops[index]) {
      return ` - ${stops[index].route?.name}`;
    } else return "";
  };

  const showRouteOnMap = (stops) => {
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
        />
        <View style={styles.busPod}>
          <BusPod
            busNumber={vehicleDetails?.name}
            plateNumber={vehicleDetails?.plate}
            attendandName={"Revathi"}
            driverName={profileInfo.name}
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
              width: "100%",
            }}
          >
            {vehicleRoutes?.length > 0 ? (
              <>
                {vehicleRoutes?.length === 1 ? (
                  <Typography.H5Light
                    style={{
                      alignSelf: "flex-start",
                      marginLeft: moderateScale(20),
                      marginTop: moderateScale(8),
                    }}
                  >
                    {vehicleRoutes?.length} route found on{" "}
                    {moment(date.startDate).format("DD-MMM-YYYY")}
                  </Typography.H5Light>
                ) : (
                  <Typography.H5Light
                    style={{
                      alignSelf: "flex-start",
                      marginLeft: moderateScale(20),
                      marginTop: moderateScale(8),
                    }}
                  >
                    {vehicleRoutes?.length} routes found on{" "}
                    {moment(date.startDate).format("DD-MMM-YYYY")}
                  </Typography.H5Light>
                )}
                {vehicleRoutes?.length > 0 && (
                  <View style={{ width: "92%", marginTop: moderateScale(6) }}>
                    {vehicleRoutes?.map((item, index) => (
                      <>
                        <ExpandableList
                          key={index}
                          title={"Route " + (index + 1) + getRouteName(index)}
                          titleContainerStyle={styles.titleContainerStyle}
                          listStyle={styles.listStyle}
                          titleStyle={styles.titleStyle}
                          onPress={() => fetchRoute(item.route_guid, index)}
                        >
                          {stops?.length > 0 && stops[index] && (
                            <>
                              <RouteListView
                                profileInfo={profileInfo}
                                vehicleRoutes={vehicleRoutes}
                                stops={stops[index]}
                              />
                              <View
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  top: moderateScale(10),
                                }}
                              >
                                <TouchableOpacity>
                                  <Typography.H5Light
                                    style={{
                                      color:
                                        AppStyles.color.COLOR_SECONDARY_BLUE,
                                    }}
                                    onPress={() => showRouteOnMap(stops[index].stopsDetail)}
                                  >
                                    {t("map.viewOnMap")}
                                  </Typography.H5Light>
                                </TouchableOpacity>
                              </View>
                            </>
                          )}
                        </ExpandableList>
                      </>
                    ))}
                  </View>
                )}
              </>
            ) : (
              <NoResourceFound title={t("errors.noRouteFound")} />
            )}
          </View>
        </ScrollView>
      )}
      {/* <RouteListView
        profileInfo={profileInfo}
        vehicleRoutes={vehicleRoutes}
        stops={stops}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: moderateScale(32),
  },
});

export default MyBus;
