import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useTheme } from "react-native-paper";
import { Typography } from "./Typography";
import { Button } from "./Buttons/button";
import Dimensions from "../utils/helper";

const dim = Dimensions.Screen;

interface MessageBoxProps {
  showMessage?: boolean;
  onPress?: any;
  onBgPress?: any;
  label?: string;
  message?: string;
}

export default function MessageBox({
  showMessage = true,
  onPress,
  onBgPress,
  label,
  message,
}: MessageBoxProps) {
  const [displayMessage, setDisplayMessage] = useState(showMessage);
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const closeMessage = () => {
    setDisplayMessage(false);
  };

  useEffect(()=>{
    setDisplayMessage(showMessage)
  },[showMessage])

  const onBackgroundPress = onBgPress || closeMessage;
  const onButtonPress = onPress || closeMessage;
 
  if (displayMessage) {
    return (
      <TouchableOpacity
        style={styles.rootContainer}
        activeOpacity={1}
        onPress={()=> onBackgroundPress()}
      >
        <View style={styles.container}>
          <Text style={styles.messageText}>{message}</Text>
          <Button.Primary onPress={()=> onButtonPress()}>
            <Text style={{ color: colors.surface }}>{label}</Text>
          </Button.Primary>
        </View>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
}

const makeStyles = (colors: any) =>
  StyleSheet.create({
    rootContainer: {
      position: "absolute",
      zIndex: 10,
      height: dim.height,
      width: dim.width,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(110,110,110,.5)",
    },
    container: {
      width: "75%",
      paddingHorizontal: moderateScale(25),
      paddingVertical: moderateScale(15),
      height: moderateScale(175),
      justifyContent: "space-around",
      backgroundColor: "white",
      alignItems: "center",
      borderRadius: moderateScale(5),
    },
    title: { color: "#000", numberOfLines: 1 },
    messageText: {
      fontFamily: "Poppins-SemiBold",
      color: colors.passive,
      fontSize: moderateScale(16),
      textAlign: "center",
    },
  });
