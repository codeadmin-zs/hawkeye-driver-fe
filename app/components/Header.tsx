import React, { FunctionComponent, ReactNode } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "react-native-paper";
import Dimensions from "../utils/helper";
import { Typography } from "./Typography";
import Logo from "../assets/Logo.svg";
import { moderateScale } from "react-native-size-matters";

const dim = Dimensions.Screen;

interface WithLogoHeaderProps {
  children: ReactNode;
}

const Header: FunctionComponent<any> = (props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <SafeAreaView>
      <View style={styles.main}>
        <View style={[styles.contentContainer, { height: props?.height }]}>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={props.leftIconPress}
          >
            {props.leftIcon}
          </TouchableOpacity>
          <Typography.H4 style={styles.headerTitle}>
            {props.title}
          </Typography.H4>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={props.rightIconPress}
          >
            {props.rightIcon}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    main: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: "3%",
      backgroundColor: colors.primary,
    },
    contentContainer: {
      width: "92%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    container: {
      width: "92%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: moderateScale(18),
      fontWeight: "600",
      color: colors.surfaceBackground,
    },
    inputDataText: {
      height: "65%",
      elevation: moderateScale(2),
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: colors.primary,
      paddingHorizontal: moderateScale(15),
      borderRadius: moderateScale(3),
    },
  });
