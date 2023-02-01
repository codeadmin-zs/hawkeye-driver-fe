import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { Typography } from "../../../components/Typography";
import Dimensions from "../../../utils/helper";
import StartTrackIcon from "../../../assets/Svgs/StartTrackIcon.svg";
import StopTrackIcon from "../../../assets/Svgs/El1.svg";
import moment from 'moment'; 

const dim = Dimensions.Screen;
import { makeStyles } from "../styles";

const PickupStop: React.FC = ({ pickupData, selectedRoute }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const selectedPath = pickupData.find((item)=> item.pathid === selectedRoute)
 console.log("stations==",selectedPath?.stations);
 
  return (
    <ScrollView style={{ height: dim.height * 0.6 }} contentContainerStyle={{}}>
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
          {selectedPath?.stations?.map((item) => (
            <View style={styles.dataItemContainer}>
              <Typography.H5
                style={{ color: selectedRoute === selectedPath.pathid ? "#EC0000" : "#000" }}
              >
                {item.name}
              </Typography.H5>
              <Typography.H6
                style={{ color: selectedRoute === selectedPath.pathidid ? "#EC0000" : "#000" }}
              >
                {moment(item.eta,'HH:mm:ss').format('hh:mm A')}
              </Typography.H6>
              <View style={styles.boardingInfoBox}>
            <Typography.H6 style={{color: 'green'}}>Boarded - {moment(item.boarded).format('hh:mm A')}</Typography.H6>
            <Typography.H6 style={{color: 'red'}}>Not Boarded - {moment(item.notboarded).format('hh:mm A')}</Typography.H6>
        </View>
            </View>

          ))}
           
        </View>
        
      </View>
     
    </ScrollView>
  );
};

export default PickupStop;
