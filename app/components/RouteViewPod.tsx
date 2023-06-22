import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import {
  View,
  Pressable,
  Text,
  Platform,
  Image,
  StyleSheet,
} from "react-native";

import { useTheme } from "react-native-paper";
import MapView, {
  PROVIDER_GOOGLE,
  Polyline,
  Circle,
  Marker,
  AnimatedRegion,
} from "react-native-maps";
import satelliteMap from "../assets/Images/satelite.jpg";
import defaultMap from "app/assets/Images/map.jpg";
import AppStyles from "../config/styles";
import { moderateScale } from "react-native-size-matters";
import { BusMarkerIcon } from "./svgComponents";
import {
  MovingCar,
  StopwatchIcon,
  CustomMarker,
  ButtonStop,
  Pause,
  Play,
  MarkerCircle,
} from "./svgComponents";

import MessageBox from "./MessageBox";

let i = 0;

const LATITUDE_DELTA = 0.0003;
const LONGITUDE_DELTA = 0.0002;

const RouteViewPod: FunctionComponent<any> = (props) => {
  const {
    fullTrips,
    currentPos,
    liveLocationData,
    assetPressHandler,
    showAsset = true,
  } = props;
  const { colors } = useTheme();

  const mapRef = useRef();

  const [expandAlarmBox, setExpandAlarmBox] = useState(false);
  const [pressedStopDetails, setPressedStopDetails] = useState({});
  const [mapType, setMapType] = useState("standard");

  const [stopCoords, setStopCoords] = useState([]);
  const [coordinatesState, setCoordinatesState] = useState([]);
  const [liveLocation, setLiveLocation] = useState([]);
  const [assetDirection, setAssetDirection] = useState("");

  let coordinatesArray = [];

  useEffect(() => {
    coordinatesArray = fullTrips.map((item) => {
      return {
        ...item,
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
      };
    });

    setCoordinatesState(coordinatesArray);
    setStopCoords(coordinatesArray);
    setLiveLocation(currentPos);
    setAssetDirection(liveLocationData?.direction + "deg");
    fitMapToView();
  }, [fullTrips, currentPos]);

  const fitMapToView = async () => {
    mapRef.current.fitToCoordinates([...stopCoords, currentPos], {
      edgePadding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
      animated: false,
    });
  };

  const toggleMessageBox = () => {
    setPressedStopDetails({});
    setExpandAlarmBox(false);
  };

  const stopPressHandler = (stopCoord, fullStopDetails) => {
    setExpandAlarmBox(true);
    setPressedStopDetails((prev) => fullStopDetails);
  };

  const toggleMapType = () => {
    if (mapType === "standard") {
      setMapType("satellite");
    }
    if (mapType === "satellite") {
      setMapType("standard");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        ref={mapRef}
        onLayout={() => {
          if (stopCoords.length > 0) {
            mapRef.current.fitToCoordinates([...stopCoords, currentPos], {
              edgePadding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10,
              },
             
            });
          }
        }}
        mapType={mapType}
        loadingEnabled={false}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: currentPos.latitude ? currentPos.latitude : 23.65989,
          longitude: currentPos.longitude ? currentPos.longitude : 57.92044,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapPadding={{ top: 10, right: 10, bottom: 10, left: 10 }}
        rotateEnabled={false}
      >
        <Polyline
          coordinates={stopCoords?.length > 0 ? stopCoords : []}
          strokeColor={AppStyles.color.COLOR_DARK_BLUE}
          strokeWidth={4}
        ></Polyline>

        <View style={{ position: "relative" }}>
          {stopCoords?.length > 0
            ? stopCoords.map((item, index) => (
                <Marker
                  key={index}
                  tracksViewChanges={false}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                  onPress={(stopCoord) => stopPressHandler(stopCoord, item)}
                >
                  <View
                    style={{
                      height: moderateScale(7),
                      width: moderateScale(7),
                      borderRadius: 15,
                      backgroundColor: AppStyles.color.COLOR_DARK_RED,

                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </Marker>
              ))
            : null}
        </View>
        <View>
          {showAsset && (
            <Marker coordinate={currentPos} onPress={assetPressHandler}>
              <BusMarkerIcon
                width={30}
                height={30}
                color={AppStyles.color.COLOR_BLACK}
                direction={assetDirection}
              />
            </Marker>
          )}
        </View>

        <Marker
          coordinate={{
            latitude: parseFloat(fullTrips[0].latitude),
            longitude: parseFloat(fullTrips[0].longitude),
          }}
          onPress={(stopCoord) => stopPressHandler(stopCoord, fullTrips[0])}
        >
          <CustomMarker size={25} color={AppStyles.color.COLOR_GREEN} />
        </Marker>

        <Marker
          coordinate={{
            latitude: parseFloat(fullTrips[fullTrips.length - 1].latitude),
            longitude: parseFloat(fullTrips[fullTrips.length - 1].longitude),
          }}
          onPress={(stopCoord) =>
            stopPressHandler(stopCoord, fullTrips[fullTrips.length - 1])
          }
        >
          <CustomMarker size={25} color={AppStyles.color.COLOR_DARK_RED} />
        </Marker>
      </MapView>
      {expandAlarmBox && (
        <MessageBox
          Label="Close"
          message="Hi"
          stopDetails={pressedStopDetails ? pressedStopDetails : []}
          onPress={toggleMessageBox}
        ></MessageBox>
      )}
      <View style={styles.buttonContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",

            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 0,
          }}
        ></View>
      </View>
      <View
        style={{
          position: "absolute",
          right: "4%",
          bottom: "3%",
          backgroundColor: AppStyles.color.COLOR_GREY,

          borderRadius: moderateScale(5),
        }}
      >
        <Pressable onPress={toggleMapType}>
          <Image
            style={{ height: moderateScale(40), width: moderateScale(40) }}
            source={mapType === "standard" ? satelliteMap : defaultMap}
          ></Image>
        </Pressable>
      </View>
    </View>
  );
};

export default RouteViewPod;

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: moderateScale(10),
    position: "absolute",
    bottom: "2%",
  },
  buttonStyle: {
    padding: moderateScale(15),
    backgroundColor: AppStyles.color.COLOR_DARK_BLUE,
    borderRadius: moderateScale(25),
  },
});
