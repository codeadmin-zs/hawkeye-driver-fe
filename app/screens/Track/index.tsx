import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { googleApiKey } from "app/constants";

import NavigationService from "app/navigation/NavigationService";
import { Header } from "../../components";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import UserIcon from "../../assets/Svgs/UserIcon.svg";
import { Typography } from "../../components/Typography";
import { TrackPod, StudentCountBox } from "../../components";
import { moderateScale } from "react-native-size-matters";
import StartTrackIcon from "../../assets/Svgs/StartTrackIcon.svg";
import StopTrackIcon from "../../assets/Svgs/El1.svg";
import Dot from "../../assets/Svgs/Dot.svg";
import { TabButton } from "../../components/Buttons/TabButton";
import MapView, {
  Marker,
  Polyline,
  Callout,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import Dimensions from "../../utils/helper";
import { makeStyles } from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { t } from "../../i18n";
import MapViewDirections from "react-native-maps-directions";
import { storeHelpers } from "app/store";
import moment from "moment";
import TrackDetails from "./components/TrackDetails";
import { MapViewBottomSheet } from "app/components";
import { useFocusEffect } from "@react-navigation/native";

const dim = Dimensions.Screen;
this.map = "";

const Track: React.FC = ({ route, navigation }) => {
  const { routeParam } = route.params;
  const { stations } = routeParam;
  const driverName = storeHelpers.getUserDetails()?.name;
  const [wayPoints, setWayPoints] = useState([]);
  const [routes, setRoutes] = useState([
  ]);
  const [origin, setOrigin] = useState({
    latitude: 37.3318456,
    longitude: -122.0296002,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });
  const [destination, setDestination] = useState({
    latitude: 37.771707,
    longitude: -122.4053769,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    if (stations?.length > 0) {
      let routesArray = stations.map((item: any) => ({
        latitude: item?.latitude,
        longitude: item?.longitude,
      }));
      setRoutes(routesArray);
      setDestination(routesArray[routesArray.length - 1]);
      setOrigin(routesArray[0]);

      let tempArray = routesArray;
      tempArray.splice(-1).splice(0);
      setWayPoints(tempArray);
    }
  }, [stations]);

  const mapRef = useRef(null);
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [showMap, setShowMap] = useState(true);
  const [showSatellite, setShowSatellite] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    markerData: {},
    index: 0,
  });
  const [showStopDetails, setShowStopDetails] = useState(false);

  const showModal = (coord, index) => {
    setShowStopDetails(true);
    setSelectedItem({ markerData: coord, index: index });
    mapRef?.current?.fitToCoordinates(routes[index - 1], {
      edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
      animated: false,
    });
  };

  const setMapCoords = () => {
    mapRef?.current?.fitToCoordinates?.(routes, {
      edgePadding: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
      },
      animated: false,
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {

      if (routes?.length > 0) {
        setMapCoords();
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setMapCoords();
  }, [routes]);

  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <Header
        title={t("Schedule Trip")}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <View style={styles.contentContainer}>
        <View style={styles.podContainer}>
          <TrackPod trackData={routeParam} driverName={driverName} />
        </View>
        <View style={styles.tabButtonBox}>
          <TabButton
            Label={t("track.mapView")}
            textColor={showMap ? colors.primary : colors.passive}
            borderWidth={showMap ? 3 : 1}
            borderColor={showMap ? colors.primary : colors.passive}
            onPress={() => setShowMap(true)}
            height={moderateScale(40)}
          />
          <TabButton
            Label={t("track.listView")}
            height={moderateScale(40)}
            textColor={showMap ? colors.passive : colors.primary}
            borderWidth={showMap ? 1 : 3}
            borderColor={showMap ? colors.passive : colors.primary}
            onPress={() => setShowMap(false)}
          />
        </View>

        <View
          style={{
            width: "100%",
            paddingHorizontal: "4%",
            backgroundColor: "#fff",
          }}
        >
          <TrackDetails stations={stations} />
        </View>

        {showMap && routes?.length > 0 ? (
          <View style={{ width: "100%", height: "64%" }}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              initialRegion={{
                latitude: parseFloat(routes[0]?.latitude), //or Number(LATITUDE)
                longitude: parseFloat(routes[0]?.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              mapPadding={{ top: 20, right: 20, bottom: 20, left: 20 }}
              showsUserLocation={true}
              followUserLocation={true}
              rotateEnabled={false}
              zoomTapEnabled={true}
              style={{
                height: "100%",
                width: "100%",
                padding: "5%",
              }}
              ref={mapRef}
              onLayout={() => {
                routes?.length > 0 &&
                  mapRef &&
                  mapRef?.current?.fitToCoordinates?.(routes, {
                    edgePadding: {
                      top: 10,
                      right: 10,
                      bottom: 10,
                      left: 10,
                    },
                    animated: false,
                  });
              }}
            >
              {wayPoints.map((coords, index) => (
                <Marker
                  coordinate={{
                    latitude: JSON.parse(coords?.latitude),
                    longitude: JSON.parse(coords?.longitude),
                  }}
                  onPress={() => showModal(stations[index], index + 1)}
                >
                  <View
                    style={{
                      backgroundColor: "#EC0000",
                      height: 7,
                      width: 7,
                      borderRadius: 7,
                    }}
                  />
                </Marker>
              ))}
              <Marker
                coordinate={{
                  latitude: JSON.parse(origin?.latitude),
                  longitude: JSON.parse(origin?.longitude),
                }}
                onPress={() => showModal(origin, 0)}
              >
                <StartTrackIcon
                  width={moderateScale(15)}
                  height={moderateScale(23)}
                  fill={"#0090D9"}
                />
              </Marker>
              <Marker
                coordinate={{
                  latitude: JSON.parse(destination?.latitude),
                  longitude: JSON.parse(destination?.longitude),
                }}
                // pinColor="red"
                onPress={() => showModal(destination, routes?.length)}
              >
                <StopTrackIcon
                  width={moderateScale(20)}
                  height={moderateScale(20)}
                  fill={"#0090D9"}
                />
              </Marker>

              <MapViewDirections
                origin={{
                  latitude: JSON.parse(origin?.latitude),
                  longitude: JSON.parse(origin?.longitude),
                }}
                destination={{
                  latitude: JSON.parse(destination?.latitude),
                  longitude: JSON.parse(destination?.longitude),
                }}
                waypoints={wayPoints.map((coords, index) => ({
                  latitude: JSON.parse(coords?.latitude),
                  longitude: JSON.parse(coords?.longitude),
                }))}
                apikey={googleApiKey}
                strokeWidth={3}
                strokeColor="#144072"
                onReady={(result) => {
                  mapRef?.current?.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: 10,
                      bottom: 10,
                      left: 10,
                      top: 10,
                    },
                  });
                }}
              />
            </MapView>
          </View>
        ) : (
          <ScrollView
            style={{ height: dim.height * 0.5 }}
            contentContainerStyle={{}}
          >
            <View style={styles.dataContainer}>
              <View style={styles.Marker}>
                <StartTrackIcon
                  width={moderateScale(15)}
                  height={moderateScale(23)}
                  fill={"#0090D9"}
                />
                <View style={styles.Line} />
                <StopTrackIcon
                  width={moderateScale(20)}
                  height={moderateScale(20)}
                  fill={"#0090D9"}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  paddingBottom: "3.2%",
                }}
              >
                {stations.map((item) => (
                  <View
                    style={{
                      marginVertical: "1%",
                      borderBottomWidth: 1,
                      borderBottomColor: colors.passive,
                      marginRight: "8%",
                    }}
                  >
                    <Typography.H5 style={{ color: item.textColor }}>
                      {item.title}
                    </Typography.H5>
                    <Typography.H6 style={{ color: item.etaColor }}>
                      {moment(item.eta, "HH:mm:ss").format("hh:mm A")}
                    </Typography.H6>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
      {showStopDetails && (
        <MapViewBottomSheet
          visible={showStopDetails}
          data={selectedItem}
          onDismiss={() => {
            setShowStopDetails(false);
            setSelectedItem({ markerData: {}, index: 0 });
          }}
        />
      )}
    </View>
  );
};

export default Track;
