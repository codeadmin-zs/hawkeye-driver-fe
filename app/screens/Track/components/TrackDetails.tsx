import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { Typography } from "../../../components/Typography";
import Dimensions from "../../../utils/helper";
import StartTrackIcon from "../../../assets/Svgs/StartTrackIcon.svg";
import StopTrackIcon from "../../../assets/Svgs/El1.svg";
import moment from "moment";

const dim = Dimensions.Screen;

const TrackDetails: React.FC = ({ stations }: any) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const origin = stations[0];
  const destination = stations[stations.length - 1];
  return (
    <View style={{borderRadius:5,marginBottom:'2%',paddingBottom:"2%",backgroundColor:'#fff'}}>
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
      <View style={styles.dataItemBox}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: "2%"
          }}
        >
          <Typography.H6 style={{color:"#474545"}}>{origin?.title}</Typography.H6>
          <Typography.H6>{`ETA ${moment(origin?.eta, "HH:mm:ss").format(
            "hh:mm A"
          )}`}</Typography.H6>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: "1%"
          }}
        >
          <Typography.H6 style={{color:"#474545"}}>{destination?.title}</Typography.H6>
          <Typography.H6>{`ETA ${moment(destination?.eta, "HH:mm:ss").format(
            "hh:mm A"
          )}`}</Typography.H6>
        </View>
      </View>
      
    </View>
    </View>
  );
};

export default TrackDetails;

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    tabButtonBox: {
      flexGrow: 0,
      width: "100%",
      flexDirection: "row",
      backgroundColor: "#fff",
    },
    contentContainer: {
      width: "100%",
    },
    podContainer: {
      padding: "4%",
      backgroundColor: colors.primary,
    },
    Line: {
      flex: 1,
      borderLeftWidth: 1,
      borderStyle: "dashed",
      borderLeftColor: "#0090D9",
      padding: 0,
      margin: 0,
    },
    Marker: {
      width: "10%",
      flexDirection: "column",
      alignItems: "center",
    },
    dataContainer: {
      marginTop: "3%",
      width: "100%",
      flexDirection: "row",
    },
    dataItemContainer: {
      marginVertical: "2%",
     
    //   marginRight: "1%",
    },
    dataItemBox: {
      flex: 1,
      justifyContent: "space-between",
    //   paddingBottom: "1%",
      paddingRight: "4%",
      paddingLeft:'1%'
    },
    fullView: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
    },
    boardingInfoBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
