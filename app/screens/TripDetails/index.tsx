import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import moment from "moment";
import { Header, HudView } from "../../components";
import { t } from "../../i18n";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import NavigationService from "../../navigation/NavigationService";
import { TripSummaryPod } from "../../components/TripSummaryPod";
import TripListViewPod from "../../components/TripListViewPod";
import { useTheme } from "react-native-paper";
import { makeStyles } from "./styles";
import MapView from "react-native-maps";
import { MapViewPod } from "../../components";
import MapViewDirections from "react-native-maps-directions";
import { Marker } from "react-native-maps";

import {
  getVehiclePaths,
  getTrips,
  getTripDetails,
} from "../../services/vehicles";

const TripDetails: React.FC = ({ route }) => {
  const { vehicleData } = route.params;
  console.log("vehicleDatatrip",vehicleData);
  

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [showMap, setShowMap] = useState(true);
  const [showList, setShowList] = useState(false);
  const [fullTrips, setFullTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [goingBack, setIsGoingBack] = useState(false);

  const switchToMapView = () => {
    setShowList(false);
    setShowMap(true);
  };

  const switchToListView = () => {
    setShowMap(false);
    setShowList(true);
  };

  const goBackHandler = () => {
    setIsGoingBack(true);
    NavigationService.goBack();
  };

  useEffect(() => {
    async function getFullTripDetails(asset) {
      setIsLoading(true);
      const response = await getTripDetails(
        asset.plate,
        moment(asset.startDate, "DD-MM-YYYY hh:mm:ss").format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        moment(asset.endDate, "DD-MM-YYYY hh:mm:ss").format(
          "YYYY-MM-DD HH:mm:ss"
        )
      );

      const fullTripDetails = response.body;
      setFullTrips(fullTripDetails);
      setIsLoading(false);
    }

    getFullTripDetails(vehicleData);
  }, []);

  return (
    <>
      <Header
        title={t("tripDetails.title")}
        leftIcon={<LeftArrow />}
        leftIconPress={goBackHandler}
      />
      <View style={styles.topContainer}>
        <View style={styles.studentPod}>
          <TripSummaryPod data={vehicleData} showArrow={false} />
        </View>
      </View>
      {!isLoading ? (
        <View style={styles.mapContainer}>
          <View style={styles.toggleBar}>
            <View style={showMap ? styles.activeTab : styles.inActive}>
              <Pressable
                onPress={switchToMapView}
                style={{ width: "100%", alignItems: "center" }}
              >
                <Text
                  style={{
                    color: showMap ? colors.primary : colors.passive,
                    fontWeight: showMap ? "bold" : "normal",
                  }}
                >
                  Map View
                </Text>
              </Pressable>
            </View>
            <View style={showList ? styles.activeTab : styles.inActive}>
              <Pressable
                onPress={switchToListView}
                style={{ width: "100%", alignItems: "center" }}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: showList ? "bold" : "normal",
                  }}
                >
                  List View
                </Text>
              </Pressable>
            </View>
          </View>
          {showMap && fullTrips && (
            <>
              <MapViewPod
                fullTrips={fullTrips}
                goingBack={goingBack}
              ></MapViewPod>
            </>
          )}
          {showList && fullTrips?.length > 0 && (
            <View style={{ flex: 1, paddingHorizontal: "2%" }}>
              <FlatList
                data={fullTrips}
                renderItem={({ item }) => (
                  <TripListViewPod {...item} colors={colors} />
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          )}
        </View>
      ) : (
        <HudView />
      )}
    </>
  );
};

export default TripDetails;
