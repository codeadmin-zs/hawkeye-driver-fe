import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import moment from "moment";
import { useTheme } from "react-native-paper";
import Dimensions from "../utils/helper";
import { Typography } from "./Typography";

const dim = Dimensions.Screen;

const MapViewBottomSheet = ({ data, visible, onDismiss }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { colors } = useTheme();

  const { markerData, index } = data;

  const styles = makeStyles(colors);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  return modalVisible ? (
    <>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onDismiss} style={{}}>
              <View style={[styles.line, styles.common]} />
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.listContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: "2%",
              }}
            >
              <View
                style={{
                  height: moderateScale(16),
                  width: moderateScale(16),
                  borderRadius: moderateScale(16),
                  backgroundColor: "#EC0000",
                }}
              />
              <View style={{ paddingLeft: "8%" }}>
                <Typography.H5Light style={{ color: "#474545" }}>
                  {markerData?.title}
                </Typography.H5Light>
                <Typography.H5 style={{}}>
                  {moment(markerData?.eta, "HH:mm:ss").format("hh:mm A")}
                </Typography.H5>
              </View>
            </View>
            <View>
              <Typography.H4>{`${index}th`}</Typography.H4>
              <Typography.H4>{"Stop"}</Typography.H4>
            </View>
          </View>
        </View>
      </View>
    </>
  ) : null;
};

export default MapViewBottomSheet;

const makeStyles = (colors: any) =>
  StyleSheet.create({
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
      width: dim.width,
      bottom: 0,
      left: 0,
      minHeight: dim.height * 0.1,
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
    },
    listContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: "2%",
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
      color: colors.COLOR_MEDIUM_DARK_GREY,
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
      backgroundColor: "#C4C4C4",
      alignSelf: "center",
      marginVertical: 5,
      borderRadius: 2,
    },
    horizontalLine: {
      backgroundColor: "rgba(202, 202, 202, 0.5)",
      marginTop: moderateScale(5),
      height: 1,
      width: dim.width,
      alignSelf: "center",
    },
  });
