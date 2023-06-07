/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import Dimensions from "../../utils/helper";
 //Package
import { scale, moderateScale } from "react-native-size-matters";
import LinearGradient from "react-native-linear-gradient";

const dim = Dimensions.Screen;

const ButtonThemeTypes: any = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

const getBackgroundColor = (buttonType: any) => {
  const theme = useTheme();
  switch (buttonType) {
    case ButtonThemeTypes.PRIMARY:
      return theme.colors.primary;
    case ButtonThemeTypes.SECONDARY:
      return theme.colors.passive;
    default:
      return theme.colors.primary;
  }
};

const BaseButton = ({
  width,
  height = moderateScale(40),
  isDisabled,
  buttonType,
  onPress,
  children,
  style,
}) => {
  const theme = useTheme();
  const styles = makeStyles(theme.colors);
  return (
    <TouchableOpacity
      activeOpacity={0.66}
      disabled={isDisabled}
      style={[
        {
          backgroundColor: getBackgroundColor(buttonType),
          borderRadius: 5,
          width: width,
          height,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 2,
        },
        { ...style },
      ]}
      onPress={() => {
        onPress();
      }}
    >
      <Text numberOfLines={1} style={[styles.buttonText]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const Primary = ({
  onPress,
  children,
  isDisabled = false,
  height,
  width,
  style = {},
}) => {
  return (
    <BaseButton
      buttonType={ButtonThemeTypes.PRIMARY}
      onPress={onPress}
      isDisabled={isDisabled}
      children={children}
      height={height}
      width={width}
      style={style}
    />
  );
};

const Secondary = ({
  onPress,
  children,
  isDisabled = false,
  height,
  width,
  style = {},
}) => {
  return (
    <BaseButton
      buttonType={ButtonThemeTypes.SECONDARY}
      onPress={onPress}
      isDisabled={isDisabled}
      children={children}
      height={height}
      width={width}
      style={style}
    />
  );
};

export const Button = {
  Primary,
  Secondary,
};

const makeStyles = (colors) =>
  StyleSheet.create({
    linearGradient: {
      alignSelf: "center",
      height: dim.height * 0.07,
      borderRadius: 30,
      alignItems: "center",
      width: dim.width * 0.7,
      justifyContent: "center",
      marginTop: 10,
    },
    viewTextInput: {
      backgroundColor: "white",
      height: dim.height * 0.065,
      borderRadius: 30,
      flexDirection: "row",
      width: dim.width * 0.69,
      alignItems: "center",
      justifyContent: "center",
    },
    textCancel: {
      color: colors.primary,
      textAlign: "center",
      alignSelf: "center",
      fontWeight: "bold",
      fontSize: 18,
    },
    continueContainer: {
      flex: 0.5,
      justifyContent: "center",
      alignItems: "flex-end",
      paddingRight: scale(30),
    },
    continueButton: {
      height: 40,
      width: dim.width * 0.375,
      borderRadius: 20,
    },
    continueButtonTouchable: {
      height: "100%",
      width: "100%",
      zIndex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 40,
    },
    continueButtonText: {
      fontSize: 16,
      color: "#fafafa",
    },
    continueButtonTextContainer: {
      width: "80%",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    continueButtonArrowContainer: {
      width: "20%",
      justifyContent: "center",
      alignItems: "flex-start",
      height: "100%",
    },
    addmemberButton: {
      height: "50%",
      width: "40%",
      borderRadius: 40,
      borderWidth: 1,
      borderColor: colors.primary,
      zIndex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    addmemberButtonText: {
      fontSize: 16,
      color: colors.primary,
      opacity: 0.7,
    },
    buttonLinear: {
      height: 40,
      width: dim.width,
      borderRadius: 0,
      elevation: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    datebuttonLinear: {
      height: 38,
      width: dim.width,
      borderRadius: 0,
      borderWidth: 0.75,
      borderColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonTouchable: {
      height: 40,
      width: "100%",
      zIndex: 2,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 15,
      borderRadius: 10,
    },
    buttonWhiteTouchable: {
      height: 40,
      width: "49.9%",
      zIndex: 2,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 15,

      borderRadius: 0,
    },
    tabButtonContainer: {
      width: "46%",
      justifyContent: "center",
      alignItems: "center",
    },
    tabButtonText: {
      fontSize: moderateScale(14),
      fontWeight: "500",
      fontFamily: "Poppins-Medium",
    },
    datebuttonWhiteTouchable: {
      height: "97%",
      width: "98.5%",
      zIndex: 2,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: moderateScale(15),
      backgroundColor: "white",
      borderRadius: moderateScale(5),
    },
    buttonTouchable1: {
      height: "97%",
      width: "99%",
      zIndex: 2,
      paddingHorizontal: moderateScale(15),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FAFAFA",
      borderRadius: moderateScale(5),
    },
    buttonText: {
      fontSize: moderateScale(14),
      fontFamily: "Poppins-SemiBold",
      fontWeight: "600",
    },
    buttonWhiteText: {
      fontSize: moderateScale(16),
      fontWeight: "500",
      color: "white",
      fontFamily: "Poppins-Medium",
    },
    whitebuttonText: {
      fontSize: moderateScale(16),
      color: colors.primary,
    },
  });
