import React from "react";
import { View, ActivityIndicator, Text, TouchableOpacity,StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Dimensions from "../utils/helper";
import { Typography } from "./Typography";
import { moderateScale } from "react-native-size-matters";

const dim = Dimensions.Screen;

const HudView = (props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  let title = props?.title ? props.title : "Please wait";

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={props.onPress}
    >
      <View style={styles.contentContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.text}>{title}...</Text>
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      zIndex: 10,
      height: dim.height,
      width: dim.width,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(110,110,110,.5)",
    },
    contentContainer: {
      width: "75%",
      paddingHorizontal: moderateScale(25),
      height: moderateScale(80),
      backgroundColor: "white",
      alignItems: "center",
      flexDirection: "row",
      borderRadius: moderateScale(5),
    },
    text: { marginHorizontal: moderateScale(20), fontFamily: "Roboto-Regular" },
  });

export default HudView;
