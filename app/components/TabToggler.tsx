import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import AppStyles from "../config/styles";

let noOfTabs;

function TabToggler(props) {
  const { headersList, activeTab, switchTab } = props;

  noOfTabs = headersList.length;

  return (
    <View style={styles.toggleBar}>
      {headersList?.length > 0 &&
        headersList.map((item, index) => {
          return (
            <View
              style={activeTab === index ? styles.activeTab : styles.inActive}
            >
              <Pressable
                onPress={() => {
                  switchTab(index);
                }}
                style={{ width: "100%", alignItems: "center" }}
              >
                <Text
                  style={{
                    color: AppStyles.color.COLOR_GREY,
                    fontWeight: activeTab === index ? "bold" : "normal",
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            </View>
          );
        })}
    </View>
  );
}

export default TabToggler;

const styles = StyleSheet.create({
  toggleBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    backgroundColor: AppStyles.color.COLOR_WHITE,
  },
  activeTab: {
    borderBottomColor: AppStyles.color.COLOR_DARK_BLUE,
    borderBottomWidth: 3,
    paddingVertical: "2%",
    width: "50%",
  },
  inActive: {
    paddingVertical: "2%",
    width: "50%",
  },
});
