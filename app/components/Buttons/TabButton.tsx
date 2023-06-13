import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Keyboard} from 'react-native';

// //Package
import {scale, moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
export const TabButton = props => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.tabButtonContainer,
        {
          backgroundColor: props.backgroundColor,
          height: props.height,
          borderBottomWidth: props.borderWidth,
          borderColor: props.borderColor,
        },
      ]}
      onPress={() => {
        props.onPress();
      }}>
      <Text
        numberOfLines={1}
        style={[styles.tabButtonText, {color: props.textColor}]}>
        {props.Label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  continueContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: scale(30),
  },
  continueButtonTouchable: {
    height: '100%',
    width: '100%',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(40),
  },
  continueButtonText: {
    fontSize: 16,
    color: '#fafafa',
  },
  continueButtonTextContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  continueButtonArrowContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
  },
  buttonTouchable: {
    height: moderateScale(40),
    width: '100%',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(10),
  },
  buttonWhiteTouchable: {
    height: moderateScale(40),
    width: '49.9%',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),

    borderRadius: moderateScale(0),
  },
  tabButtonContainer: {
    width: '46%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  datebuttonWhiteTouchable: {
    height: '97%',
    width: '98.5%',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
    backgroundColor: 'white',
    borderRadius: moderateScale(5),
  },
  buttonTouchable1: {
    height: '97%',
    width: '99%',
    zIndex: 2,
    paddingHorizontal: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: moderateScale(5),
  },
  buttonText: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  buttonWhiteText: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
});
