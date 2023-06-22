import { View, StyleSheet } from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";
import AppStyles from "../config/styles";
const TripDots = ({ repeat }) => {
  const newArr = new Array(repeat).fill(0);

  return (
    <>
      {newArr.map((item, index) => (
        <View style={styles.dash} key={index}></View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  dash: {
    width: moderateScale(2),
    height: moderateScale(6),
    backgroundColor: AppStyles.color.COLOR_SECONDARY_BLUE,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: moderateScale(3),
  },
});

export default TripDots;
