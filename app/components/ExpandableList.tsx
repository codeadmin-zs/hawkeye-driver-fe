import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import AppStyles from "../config/styles";
import { Typography } from "./Typography";
import { moderateScale } from "react-native-size-matters";
import { DownArrow } from "./svgComponents";

function ExpandableList(props) {
  const [expandList, setExpandList] = useState(false);

  function toggleList() {
    setExpandList((prev) => !prev);
    if (props.onPress) {
      props.onPress();
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleList}>
        <View
          style={{ ...styles.titleContainer, ...props.titleContainerStyle }}
        >
          <Typography.H5Light style={{ ...props.titleStyle }}>
            {props.title}
          </Typography.H5Light>
          <View
            style={{
              transform: expandList
                ? [{ rotateX: "180deg" }]
                : [{ rotateX: "0deg" }],
            }}
          >
            <DownArrow
              width={moderateScale(25)}
              height={moderateScale(22)}
              color={"black"}
            />
          </View>
        </View>
      </Pressable>
      {expandList && (
        <View style={{ ...styles.listContainer, ...props.listStyle }}>
          {props.children}
        </View>
      )}
    </View>
  );
}

export default ExpandableList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 5,
  },
  titleContainer: {
    backgroundColor: AppStyles.color.COLOR_LIGHT_BLUE,
    borderRadius: moderateScale(5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "2%",
    paddingVertical: "1%",
    marginBottom: "2%",
    width: "100%",
  },
  listContainer: {
    backgroundColor: "#f3fcff",
    width: "100%",
    borderRadius: moderateScale(5),
    padding: "2%",
  },
});
