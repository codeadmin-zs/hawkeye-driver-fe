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
import defaultMap from "../assets/Images/map.jpg";
import AppStyles from "../config/styles";
import { moderateScale } from "react-native-size-matters";

import {
  MovingCar,
  StopwatchIcon,
  CustomMarker,
  ButtonStop,
  Pause,
  Play,
  MarkerCircle,
} from "../components/svgComponents";

import MessageBox from "../components/MessageBox";

let i = 0;

const LATITUDE_DELTA = 0.0003;
const LONGITUDE_DELTA = 0.0002;

const MapViewPod: FunctionComponent<any> = (props) => {
  const { fullTrips, goingBack } = props;
  const { colors } = useTheme();
  const markerRef = useRef();
  const mapRef = useRef();

  let firstCoord = {
    latitude: fullTrips[0] && JSON.parse(fullTrips[0].lat),
    longitude: fullTrips[0] && JSON.parse(fullTrips[0].lang),
  };
  let lastCoord = {
    latitude:
      fullTrips[fullTrips.length - 1] &&
      JSON.parse(fullTrips[fullTrips.length - 1].lat),
    longitude:
      fullTrips[fullTrips.length - 1] &&
      JSON.parse(fullTrips[fullTrips.length - 1].lang),
  };

  const [isPaused, setIsPaused] = useState(true);
  const [expandAlarmBox, setExpandAlarmBox] = useState(false);
  const [pressedAlarmDetails, setPressedAlarmDetails] = useState({});
  const [mapType, setMapType] = useState("standard");
  const [coordinatesState, setCoordinatesState] = useState([]);
  const [alarmCoords, setAlarmCoords] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);

  let alarmCoordsArray = [];
  let coordinatesArray = [];

  const [markerState, setMarkerState] = useState(
    new AnimatedRegion({
      latitude: firstCoord.latitude,
      longitude: firstCoord.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    })
  );

  const [startAnimation, setStartAnimation] = useState(false);
  const [coordsForAnimation, setCoordsForAnimation] = useState([]);

  useEffect(() => {
    coordinatesArray = fullTrips.map((item) => {
      if (item.alarmText !== "") {
        const newAlarmCoord = {
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lang),
          ...item,
        };
        alarmCoordsArray.push(newAlarmCoord);
      }
      return {
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lang),
      };
    });
    setCoordinatesState(coordinatesArray);
    setAlarmCoords(alarmCoordsArray);
  }, [fullTrips]);

  useEffect(() => {
    if (startAnimation && !isPaused && i < coordinatesState?.length) {
      const intervalId = setInterval(() => {
        if (i < coordinatesState?.length) {
          const newCoord = coordinatesState[i];
          setCoordsForAnimation((prev) => [...prev, newCoord]);

          animateMarker(
            coordinatesState[i]?.latitude,
            coordinatesState[i]?.longitude
          );
          i += 1;
        } else {
          setStartAnimation(false);
          setIsPaused(true);
          setCoordsForAnimation([]);
          setReachedEnd(true);
          clearInterval(intervalId);
        }
      }, 400);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [startAnimation]);

  const fitMapToView = async () => {
    mapRef.current.fitToCoordinates(coordinatesState, {
      edgePadding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
      animated: false,
    });
  };

  useEffect(() => {
    fitMapToView();
  }, [coordinatesState]);

  const animateMarker = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 400);
      }
    } else {
      markerState.timing(newCoordinate).start();
    }
  };

  const viewTripHandler = () => {
    fitMapToView();
    setIsPaused(false);
    setStartAnimation(true);
  };
  const pauseAnimationHandler = () => {
    setStartAnimation(false);
    setIsPaused(true);
  };

  const resetHandler = () => {
    setStartAnimation(false);
    setIsPaused(true);
    setCoordsForAnimation([]);
    setMarkerState(
      new AnimatedRegion({
        latitude: firstCoord?.latitude,
        longitude: firstCoord?.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      })
    );
    setReachedEnd(false);
    i = 0;
  };

  const alarmPressHandler = (alarmCoord, fullAlarmDetails) => {
    setStartAnimation(false);
    setIsPaused(true);

    setPressedAlarmDetails((prev) => fullAlarmDetails);
    setExpandAlarmBox(true);
  };

  const toggleMessageBox = () => {
    setPressedAlarmDetails({});
    setExpandAlarmBox(false);
  };

  const toggleMapType = () => {
    if (mapType === "standard") setMapType("satellite");
    if (mapType === "satellite") setMapType("standard");
  };

  useEffect(() => {
    resetHandler();
  }, [goingBack]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        ref={mapRef}
        onLayout={() => {
          if (coordinatesState.length > 0) {
          
            mapRef.current.fitToCoordinates(coordinatesState, {
              edgePadding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10,
              },
              animated: true,
            });
          }
        }}
        mapType={mapType}
      
        loadingEnabled={false}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 25.155,
          longitude: 55.409,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapPadding={{ top: 10, right: 10, bottom: 10, left: 10 }}
        rotateEnabled={false}
      >
        {
          <Polyline
            coordinates={coordinatesState?.length > 0 ? coordinatesState : []}
            strokeColor={AppStyles.color.COLOR_SECONDARY_BLUE}
            strokeWidth={5}
          ></Polyline>
        }

        <Polyline
          coordinates={coordsForAnimation}
          strokeColor={AppStyles.color.COLOR_RED}
          strokeWidth={5}
        ></Polyline>

        <View style={{ position: "relative" }}>
          {alarmCoords?.length > 0
            ? alarmCoords.map((item, index) => (
                <Marker
                  key={index}
                  tracksViewChanges={false}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                  onPress={(alarmCoord) => alarmPressHandler(alarmCoord, item)}
                >
                  <View
                    style={{
                      height: moderateScale(20),
                      width: moderateScale(20),
                      borderRadius: 15,
                      borderWidth: 2,
                      borderColor: "red",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        height: moderateScale(10),
                        width: moderateScale(10),
                        borderRadius: 15,
                        borderWidth: 2,
                        borderColor: "red",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </View>
                </Marker>
              ))
            : null}
        </View>
        <Marker coordinate={firstCoord}>
          <CustomMarker size={30} color={AppStyles.color.COLOR_RED} />
        </Marker>
        <Marker coordinate={lastCoord}>
          <CustomMarker size={30} color={AppStyles.color.COLOR_GREEN} />
        </Marker>

        <Marker.Animated
          style={{
            paddingVertical: 1,
            paddingHorizontal: 1,
            borderRadius: 1,
            elevation: 1,
          }}
          tracksViewChanges={false}
          tracksInfoWindowChanges={false}
          tappable={false}
          ref={markerRef}
          coordinate={markerState ? markerState : []}
        >
          <MovingCar size={30} color={AppStyles.color.COLOR_GREEN} />
        </Marker.Animated>
      </MapView>
      {expandAlarmBox && (
        <MessageBox
          Label="Close"
          message="Hi"
          alarmDetails={pressedAlarmDetails ? pressedAlarmDetails : []}
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
        >
          {((!startAnimation && fullTrips.length > 0) || reachedEnd) && (
            <View style={styles.buttonStyle}>
              <Pressable onPress={viewTripHandler}>
                <Play size={20} color={AppStyles.color.COLOR_WHITE} />
              </Pressable>
            </View>
          )}
          {startAnimation && (
            <View style={styles.buttonStyle}>
              <Pressable onPress={pauseAnimationHandler}>
                <Text style={{ marginLeft: "auto", marginRight: "auto" }}>
                  <Pause size={20} color={AppStyles.color.COLOR_WHITE} />
                </Text>
              </Pressable>
            </View>
          )}
          {startAnimation && (
            <View
              style={{ ...styles.buttonStyle, marginLeft: moderateScale(8) }}
            >
              <Pressable onPress={resetHandler}>
                <Text style={{ marginLeft: "auto", marginRight: "auto" }}>
                  <ButtonStop size={20} color={AppStyles.color.COLOR_WHITE} />
                </Text>
              </Pressable>
            </View>
          )}
        </View>
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

export default MapViewPod;

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
