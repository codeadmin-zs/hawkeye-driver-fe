import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
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

const dim = Dimensions.Screen;

const ScheduledTrip: React.FC = ({ route }) => {
  const { routeParam } = route.params;
  const { stations } = routeParam;
  const driverName = storeHelpers.getUserDetails()?.name;

  const [routes, setRoutes] = useState([
    {
      latitude: 37.3318456,
      longitude: -122.0296002,
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
    },
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
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
      }));
     

      setDestination(routesArray[routesArray.length - 1]);
      setOrigin(routesArray[0]);
      setRoutes(routesArray);
    }
  }, [stations]);

  let mapRef = useRef<HTMLElement>(null);
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [showMap, setShowMap] = useState(false);
  const [showSatellite, setShowSatellite] = useState(false);
  const Data = [
    {
      stopName: "School",
      time: "ETA : 8.00 AM",
      textColor: colors.primary,
      etaColor: "#000",
    },
    {
      stopName: "Kariyam",
      time: "ETA : 7.50 AM",
      textColor: colors.primary,
      etaColor: "#000",
    },
    {
      stopName: "Sreekaryam",
      time: "ETA : 7.45 AM",
      textColor: colors.primary,
      etaColor: "#000",
    },
    {
      stopName: "Pothencode",
      time: "ETA : 7.40 AM",
      textColor: colors.primary,
      etaColor: "#000",
    },
    {
      stopName: "Ulloor",
      time: "ETA : 7.30 AM",
      textColor: colors.primary,
      etaColor: "#000",
    },
    {
      stopName: "Kesavadasapuram",
      time: "ETA : 7.20 AM",
      textColor: "#EC0000",
      etaColor: "#000",
    },
    {
      stopName: "LIC Jn",
      time: "ETA : 7.15 AM",
      textColor: colors.primary,
      etaColor: "#000",
    },
    {
      stopName: "Pattom",
      time: "ETA : 7.10 AM",
      textColor: colors.primary,
      etaColor: "#000",
    },
    {
      stopName: "Kuravankonam",
      time: "ETA : 7.00 AM",
      textColor: colors.primary,
      etaColor: "#000",
    },
    {
      stopName: "Kowdiar",
      time: "ETA : 6.55 AM",
      textColor: colors.primary,
      etaColor: "#000",
    },
    {
      stopName: "Vellayambalam",
      time: "ETA : 6.50 AM",
      textColor: colors.primary,
      etaColor: "#000",
    },
    {
      stopName: "Vazhuthacaud",
      time: "ETA : 6.45 AM",
      textColor: colors.passive,
      etaColor: colors.passive,
    },
    {
      stopName: "DPI",
      time: "ETA : 6.35 AM",
      textColor: colors.passive,
      etaColor: colors.passive,
    },
    {
      stopName: "Jagathy",
      time: "ETA : 6.30 AM",
      textColor: colors.passive,
      etaColor: colors.passive,
    },
  ];

  const onRegionChange = (region) => {
    setRoutes(region);
  };

  useEffect(()=>{

 
  },[routes])

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
        {/* <View style={{ width: "100%", alignItems: "center" }}>
          <StudentCountBox data={stations}/>
        </View> */}

        {showMap && routes?.length > 0 ? (
          <View style={{ width: "100%" }}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              initialRegion={{
                latitude: parseFloat(routes[0]?.latitude), //or Number(LATITUDE)
                longitude: parseFloat(routes[0]?.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              region={{
                latitude: parseFloat(routes[0]?.latitude), //or Number(LATITUDE)
                longitude: parseFloat(routes[0]?.longitude),
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
              showsUserLocation={true}
              rotateEnabled={false}
              zoomTapEnabled={true}
              style={{
                height: "100%",
                width: "100%",
              }}
              // onRegionChange={region => onRegionChange(region)}
              ref={(ref) => {
                mapRef = ref;
              }}
              ref={mapRef}
              onLayout={
                () => {
                 routes?.length > 0 &&
                    // !this.state.showMarker &&
                    mapRef &&
                    mapRef?.fitToCoordinates?.(routes, {
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
              {routes.map((coords) => (
                <Marker
                  coordinate={{
                    latitude: JSON.parse(coords?.latitude),
                    longitude: JSON.parse(coords?.longitude),
                  }}
                />
              ))}

              <MapViewDirections
                origin={routes && routes[0]}
                destination={routes && routes[routes.length - 1]}
                waypoints={routes}
                apikey={googleApiKey}
                strokeWidth={3}
                strokeColor="hotpink"
                splitWaypoints={true}
              />
            </MapView>
          </View>
        ) : (
          <ScrollView
            style={{ height: dim.height * 0.6 }}
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
                      {moment(item.eta,'HH:mm:ss').format('hh:mm A')}
                    </Typography.H6>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default ScheduledTrip;
