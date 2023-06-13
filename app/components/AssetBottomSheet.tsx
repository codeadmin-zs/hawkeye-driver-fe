import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

import { Typography } from "./Typography";
import metrics from "../config/metrics";

import AppStyles from "../config/styles";
import Separator from "./Separator";
import moment from "moment";
import StudentPod from "./StudentPod";
import {
  StartTrackIcon,
  Calendar,
  ClockIcon,
  SchoolBus,
  InfoIcon,
} from "./svgComponents";
import { getAssetFilters } from "../utils/utilFuncs";
import ExpandableList from "./ExpandableList";

export default function AssetBottomSheet(props) {
  const { locationData, childData } = props;

  const [assetState, setAssetState] = useState({});
  const [locationAddr, setLocationAddr] = useState("");

  function findState(state) {
    const [filteredState] = getAssetFilters().filter(
      (item) => item.id === state
    );
    setAssetState(filteredState);
  }

  function getLocationAddr(state) {
    // logic to fetch address
    if (locationAddr) {
      setLocationAddr("");
    } else {
      setLocationAddr("Oman");
    }
  }

  function shortenAddress(latlang) {
    const locationArr = latlang.split(",");
    const lat = locationArr[0].slice(0, 7);
    const lang = locationArr[1].slice(0, 8);
    return lat + "," + lang;
  }

  useEffect(() => {
    findState(locationData[0]?.state);
  }, [locationData]);

  return props.showDetails ? (
    <>
      <TouchableWithoutFeedback onPress={props.onDismiss}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
        }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={props.onDismiss}>
              <View style={[styles.line, styles.common]} />
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.imageContainer}>
              <SchoolBus
                width={moderateScale(60)}
                height={moderateScale(60)}
                color={assetState?.color}
              />
              <Text style={styles.text}>{assetState?.filterName}</Text>
            </View>

            <View style={styles.infoContainer}>
              <View>
                <Text style={{ ...styles.text, fontSize: moderateScale(18) }}>
                  {locationData[0]?.plate}
                </Text>
                <View style={{ ...styles.flexContainer, alignItems: "center" }}>
                  <StartTrackIcon
                    width={10}
                    height={13}
                    color={AppStyles.color.COLOR_DARK_GREY}
                  />
                  <Text
                    style={{
                      marginLeft: moderateScale(10),
                      ...styles.text,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    LAT/LONG :{" "}
                    <Text style={{ color: AppStyles.color.COLOR_DARK_BLUE }}>
                      {locationAddr
                        ? locationAddr
                        : shortenAddress(locationData[0]?.latlang)}
                    </Text>
                    <TouchableOpacity
                      onPress={() => getLocationAddr(locationData[0]?.latlang)}
                    >
                      <View
                        style={{
                          backgroundColor: AppStyles.color.COLOR_BLACK,
                          borderRadius: moderateScale(10),
                          height: moderateScale(15),
                          width: moderateScale(15),
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: moderateScale(5),
                        }}
                      >
                        <InfoIcon width={10} height={10} color={"white"} />
                      </View>
                    </TouchableOpacity>
                  </Text>
                </View>
              </View>
              <View
                style={{
                  ...styles.flexContainer,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ ...styles.flexContainer, alignItems: "center" }}>
                  <Calendar
                    width={12}
                    height={15}
                    color={AppStyles.color.COLOR_DARK_GREY}
                  />
                  <Text
                    style={{ marginLeft: moderateScale(10), ...styles.text }}
                  >
                    {moment(locationData[0]?.time).format("DD/MM/YYYY")}
                  </Text>
                </View>
                <View style={{ ...styles.flexContainer, alignItems: "center" }}>
                  <ClockIcon
                    width={10}
                    height={13}
                    iconColor={AppStyles.color.COLOR_DARK_GREY}
                  />
                  <Text
                    style={{ marginLeft: moderateScale(8), ...styles.text }}
                  >
                    {moment(locationData[0]?.time).format("h:mm A")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.stopContainer}>
            <View style={styles.stop}>
              <View style={styles.redDot}></View>
              <Text style={{ marginLeft: moderateScale(18), ...styles.text }}>
                Last Stop: <Text style={{}}>Lulu Hypermarket Barka</Text>
              </Text>
            </View>
            <View style={styles.stop}>
              <View style={styles.greenDot}></View>
              <Text style={{ marginLeft: moderateScale(18), ...styles.text }}>
                Next Stop: <Text style={{}}>Chavadimukku Trivandrum</Text>
              </Text>
            </View>
          </View>
          <View style={styles.horizontalLine} />
          {Array.isArray(childData) && childData.length > 0 ? (
            <ExpandableList title={"Children"}>
              {childData.map((child, index) => (
                <>
                  <Typography.H6Light>{child.name}</Typography.H6Light>
                  {index !== childData.length - 1 ? <Separator /> : null}
                </>
              ))}
            </ExpandableList>
          ) : (
            <StudentPod data={childData} />
          )}
        </View>
      </View>
    </>
  ) : null;
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    paddingHorizontal: "4%",
    paddingBottom: "2%",
    marginTop: "auto",
    backgroundColor: "white",
    width: metrics.screenWidth,
    bottom: 0,
    left: 0,
    minHeight: metrics.screenHeight * 0.1,
    borderTopRightRadius: moderateScale(18),
    borderTopLeftRadius: moderateScale(18),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display: "flex",
  },
  imageContainer: {
    width: "25%",
    alignItems: "center",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
  },
  infoContainer: {
    padding: moderateScale(5),
    width: "75%",
  },
  listContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },

  listItem: {
    backgroundColor: AppStyles.color.COLOR_WHITE,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: moderateScale(20),
    height: moderateScale(40),
    borderBottomWidth: 1,
    borderColor: "#C4C4C4",
  },
  listItemText: {
    fontSize: moderateScale(14),
    fontFamily: "Poppins-Medium",
    color: AppStyles.color.COLOR_MEDIUM_DARK_GREY,
    fontWeight: "500",
  },
  header: {
    paddingVertical: moderateScale(2),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-SemiBold",
    color: AppStyles.color.COLOR_MEDIUM_DARK_GREY,
    fontWeight: "600",
  },
  common: {
    shadowColor: "#000",
    shadowOffset: {
      height: -3,
      width: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
  },
  line: {
    width: moderateScale(75),
    height: moderateScale(5),
    backgroundColor: AppStyles.color.COLOR_DARK_BLUE,
    alignSelf: "center",
    marginVertical: 5,
    borderRadius: 2,
  },
  horizontalLine: {
    backgroundColor: "rgba(202, 202, 202, 0.5)",
    marginTop: moderateScale(5),
    height: 1,
    width: metrics.screenWidth,
    alignSelf: "center",
  },
  stopContainer: {
    paddingVertical: "2%",
  },
  stop: {
    display: "flex",
    flexDirection: "row",

    position: "relative",
    left: moderateScale(3),
  },
  redDot: {
    borderRadius: moderateScale(5),
    backgroundColor: AppStyles.color.COLOR_DARK_RED,
    width: moderateScale(6),
    height: moderateScale(6),
    position: "absolute",
    top: moderateScale(7),
  },
  greenDot: {
    borderRadius: moderateScale(5),
    backgroundColor: AppStyles.color.COLOR_GREEN,
    width: moderateScale(6),
    height: moderateScale(6),
    position: "absolute",
    top: moderateScale(7),
  },
  text: {
    fontSize: moderateScale(14),
    fontFamily: "Poppins-Medium",
    color: AppStyles.color.COLOR_MEDIUM_DARK_GREY,
    fontWeight: "500",
  },
});
