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

const PickupSchedule: React.FC = ({ route }) => {
  const { profileInfo, vehicleDetails } = route.params;
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
      const vehicleResponse = await getVehicleDetails(vehicleDetails[0]?.guid);
      const vehiclesRes = vehicleResponse?.body;
      setGetVehiclesData(vehiclesRes);

      let routesRespp = null;
      if (isDateClickedOnce) {
        routesRespp = await getRoutesOfVehicle(
          vehicleDetails[0]?.guid,
          moment(date.startDate).format("YYYY-MM-DD")
        );
      } else {
        routesRespp = await getRoutesOfVehicle(vehicleDetails[0]?.guid, null);
      }
      setVehicleRoutes(routesRespp?.body);
      setStops(new Array(routesRespp?.body?.length));

      dispatch(loadingActions.disableLoading());
    };
    getVehicles();
  }, [date]);

  const goBack = () => NavigationService.goBack();

  return (
    <View style={styles.container}>
      <Header
        title={t("pickUpSchedule.title")}
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
            <ScheduledRoutes
              profileInfo={profileInfo}
              routesOfvehicle={vehicleRoutes}
              stops={stops}
              isDateClickedOnce={false}
              vehicleDetails={vehicleDetails}
              date={date}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default PickupSchedule;
