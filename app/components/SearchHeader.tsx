import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { SearchIcon } from "./svgComponents";
import AppStyles from "app/config/styles";
import { TextInput } from "react-native";

const SearchHeader = (props) => {
  const { isClicked, setIsClicked, searchText, setSearchText, searchHandler } =
    props;

  return (
    <View style={[styles.container, props?.style]}>
      <TouchableOpacity style={styles.main} activeOpacity={1}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "2%",
          }}
        >
          <SearchIcon
            color={AppStyles.color.COLOR_DARK_BLUE}
            height={moderateScale(22)}
            width={moderateScale(22)}
          />
        </View>

        <View style={styles.inputDataText}>
          <TextInput
            placeholder="Search"
            style={styles.searchText}
            underlineColorAndroid="transparent"
            onChangeText={(text) => searchHandler(text)}
            onFocus={() => setIsClicked(true)}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  main: {
    height: moderateScale(45),

    width: "92%",

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingHorizontal: moderateScale(15),

    elevation: 2,

    backgroundColor: AppStyles.color.COLOR_WHITE,

    borderRadius: 8,
  },

  container: {
    minHeight: moderateScale(45),

    width: "100%",

    flexDirection: "row",

    justifyContent: "center",

    backgroundColor: AppStyles.color.COLOR_DARK_BLUE,

    paddingBottom: moderateScale(10),
  },

  inputDataText: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    flex: 1,

    paddingLeft: "2%",

    borderRadius: moderateScale(3),

    underlineColorAndroid: "transparent",
  },

  searchText: {
    fontSize: moderateScale(14),

    color: AppStyles.color.COLOR_GREY,

    fontFamily: "Poppins-Regular",

    fontWeight: "400",

    backgroundColor: "transparent",

    width: "90%",

    borderColor: "transparent",

    borderBottomWidth: 0,
  },
});
