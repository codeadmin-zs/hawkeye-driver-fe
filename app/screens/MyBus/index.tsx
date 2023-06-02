import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavigationService from "app/navigation/NavigationService";
import { moderateScale } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { useTheme } from "react-native-paper";

import { DateTab, Header, TrackPod } from "app/components";
import { t } from "../../i18n";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import { makeStyles } from "./styles";
import { FutureDateTab } from "app/components/FutureDateTab";
import {
  getVehicleDetails,
  getVehiclePaths,
  getRoutesOfVehicle,
  getStopsOfRoute,
} from "../../services/vehicles";
import BusPod from "../../components/BusPod";
import RouteListView from "app/components/RouteListView";

const MyBus: React.FC = ({ route }) => {
  const { profileInfo,vehicleDetails } = route.params;
  console.log("profileInfo222", profileInfo);
  console.log("vehicleDetails222",vehicleDetails);
  console.log("busname",vehicleDetails?.guid);
  
  
  const initialDate = {
    startDate: moment().format("YYYY-MM-DD"),
  };
  // console.log("startDate",initialDate.startDate);

  const [getVehiclesData, setGetVehiclesData] = useState({});
  const [dateDetails, setDateDetails] = useState(initialDate);
  const [vehicleRoutes, setVehicleRoutes] = useState({});
  const [getStops, setGetStops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("dateeee",dateDetails.startDate);

  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const dateChangeHandler = (date) => {
console.log('date',date)
    setDateDetails((prev) => {
      return { ...prev, startDate: moment(date).format("YYYY-MM-DD") };
    });
  };

  useEffect(() => {
    const getVehicles = async () => {
      const vehicleResponse = await getVehicleDetails(vehicleDetails?.guid);
      console.log("&&&&&vehicleResponse", vehicleResponse);
      console.log("vehicleGuid",vehicleDetails?.guid);
      
      const vehiclesRes = vehicleResponse?.body;
      setGetVehiclesData(vehiclesRes);

      const routesRespp = await getRoutesOfVehicle(
        vehicleDetails?.guid,
        dateDetails.startDate
      );
      const vehicleRoutes = routesRespp?.body;
      console.log("getVehicleRoutes", vehicleRoutes);
      setVehicleRoutes(vehicleRoutes);

      const stopsResponse = await getStopsOfRoute(vehicleRoutes[0]?.route_guid);
      console.log("routeStops", stopsResponse);
      const vehicleStops = stopsResponse?.body;
      console.log("vehicleStops", vehicleStops);

      const stop = vehicleStops;
      console.log("stops", stop);
      const routeName=vehicleStops?.route?.name
      console.log("routename",vehicleStops?.route?.name);
      
      // console.log("vehicleStops",vehicleStops?.route.startstop);
      // const allStops = [
      //   {
      //     // stopName: vehicleStops?.route?.startstopid,
      //     // eta: vehicleStops?.route?.eta,
      //     routename:vehicleStops?.route?.name
      //   },
      //   ...stop,
      //   // {
      //   //   stopName: vehicleStops?.route.endstopid,
      //   //   eta: vehicleStops?.route.eta,
      //   // }
      // ];
      console.log("allStops", stop);
      setGetStops(stop);
    };
    getVehicles();
  }, [dateDetails]);

  const goBack = () => NavigationService.goBack();

  return (
    <>
      <Header
        title={t("myBus.title")}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <View style={styles.topContainer}>
        <FutureDateTab
          startDate={dateDetails.startDate}
          onChangeDate={(date) => dateChangeHandler(date)}
        />
        <View style={styles.busPod}>
          <BusPod
            busNumber={vehicleDetails?.name}
            plateNumber={vehicleDetails.plate}
            time={"8:10 AM"}
            attendandName={"Revathi"}
            // driverName={profileInfo.name}
          />
        </View>
      </View>
      <RouteListView
        profileInfo={profileInfo}
        vehicleRoutes={vehicleRoutes}
        stops={getStops}
        
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: moderateScale(32),
  },
});

export default MyBus;
