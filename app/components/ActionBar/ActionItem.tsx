import React from 'react';
import {Image, StyleSheet, View,TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const ActionItem = ({children,onPress}) => {
  return (
    <View style={styles.ActionItemContainer}>
      <TouchableOpacity style={{zIndex: 0.5 }} onPressIn={()=>onPress()}>{children}</TouchableOpacity>
    </View>
  );
};

export default ActionItem;

const styles = StyleSheet.create({
  ActionItemContainer: {
    width: '13.33%',
    aspectRatio: 1 * 1,
    borderRadius: moderateScale(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEEDFF',
  },
});
