import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import AppStyles from "../config/styles";
import { Typography } from "./Typography";
import Separator from "./Separator";
import { Close } from "./svgComponents";
import NavigationService from "../navigation/NavigationService";

function MenuPressPopup(props) {
  const { dataForNavigation, setMenuOptions } = props;
  console.log("dataForNavigation",dataForNavigation);
  console.log("plate",dataForNavigation.vehicleDetails.plate);
  // console.log("setMenuOptions",setMenuOptions);
  
  function navigationHandler(url: string) {
    NavigationService.navigate(url, {
      profileInfo: dataForNavigation?.profileInfo,
      vehicleDetails: dataForNavigation?.vehicleDetails,
    });
    setMenuOptions(false);
  }

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        zIndex: 10,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(110,110,110,.5)",
      }}
      activeOpacity={1}
      onPress={props?.onPress}
    >
      <View
        style={{
          width: "40%",
          position: "absolute",
          right: moderateScale(18),
          justifyContent: "space-around",
          backgroundColor: "white",
          alignItems: "center",
          borderRadius: moderateScale(5),
        }}
      >
        <View style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography.H5 style={styles.menuOptions}>
              {dataForNavigation?.vehicleDetails.plate}
            </Typography.H5>
            <TouchableOpacity style={styles.closeBtn} onPress={props?.onPress}>
              <Close size={moderateScale(12)} />
            </TouchableOpacity>
          </View>

          {props?.menuOptions?.length > 0 &&
            props.menuOptions.map((item, index) => {
              return (
                <View key={index}>
                  <Separator style={{ width: "100%" }} />
                  <TouchableOpacity onPress={() => navigationHandler(item.url)}>
                    <Typography.H5Light style={styles.menuOptions}>
                      {item.name}
                    </Typography.H5Light>
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default MenuPressPopup;

const styles = StyleSheet.create({
  menuOptions: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(12),
    maxWidth: "100%",
    flex: 0.75,
    flexWrap: "wrap",
  },
  closeBtn: {
    flex: 0.25,
  },
});
