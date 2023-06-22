import React, { FunctionComponent } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { Typography } from "./Typography";
import InfoMessageIcon from "../assets/Svgs/InfoMessageIcon.svg";
import { moderateScale } from "react-native-size-matters";
import AppStyles from "app/config/styles";

interface MessagePodProps {
  messageTitle: string;
  message: string;
  date: string;
  messageType?: "error" | "info";
  onPress?: () => void;
  readStatus:Boolean;
}

const MessagePod: FunctionComponent<any> = ({
  messageTitle,
  message,
  date,
  messageType = "error",
  onPress,
  readStatus,
}: MessagePodProps) => {
  let iconContainerColor = "#0094FF";
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  switch (messageType) {
    case "error":
      iconContainerColor = "#FF0000";
      break;
    default:
      iconContainerColor = "#0094FF";
      break;
  }

  // const titleColor = readStatus ? AppStyles.color.COLOR_GREY_TRANSP : AppStyles.color.COLOR_BLACK;
  const titleColor = readStatus ? AppStyles.color.COLOR_GREY : AppStyles.color.COLOR_BLACK;
  return (
    <TouchableOpacity style={styles.rootContainer} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View
            style={
              {...styles.iconContainer,
               backgroundColor: iconContainerColor 
            }}
          >
            <InfoMessageIcon />
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Typography.H4 style={{...styles.title, color: titleColor}}>{messageTitle}</Typography.H4>
          <Typography.H6Light>{date}</Typography.H6Light>
        </View>
      </View>
      {message && (
        <Typography.H6Light style={styles.message} numberOfLines={1}>
          {message}
        </Typography.H6Light>
      )}
    </TouchableOpacity>
  );
};

export default MessagePod;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    rootContainer: {
      elevaton: 30,
      width: "100%",
      backgroundColor: colors.surfaceBackground,
      borderRadius: moderateScale(5),
      marginVertical: "1%",
    },
    container: {
      flexDirection: "row",
      paddingVertical: "2%",
    },
    title: { 
      color: "#ff0000",
      numberOfLines: 1 
    },
    message: { 
      paddingBottom: "3%", 
      paddingLeft: "5%" 
    },
    iconContainer: {
      height: moderateScale(30),
      width: moderateScale(30),
      borderRadius: moderateScale(30),
      alignItems: "center",
      justifyContent: "center",
    },
    detailsContainer: { width: "74%" },
    logoContainer: {
      width: "16%",
      justifyContent: "center",
      alignItems: "center",
    },
  });
