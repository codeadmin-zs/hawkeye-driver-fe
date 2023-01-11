import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import BusTrack from '../../assets/Svgs/BusTrack.svg';
import NavigationService from 'app/navigation/NavigationService';

import ActionItem from './ActionItem';

const ActionBar = ({...props}) => {
  return (
    <>
      <View style={{}}>
        <View style={styles.ActionBarContainer}>
          <ActionItem onPress={() => NavigationService.navigate('Track')}>
            <BusTrack />
          </ActionItem>
        </View>
      </View>
    </>
  );
};

export default ActionBar;

const styles = StyleSheet.create({
  ActionBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  AlarmInfoContainer: {
    width: '100%',
    fontFamily: 'Poppins',
    fontWeight: '400',
    Size: moderateScale(11),
    backgroundColor: '#DEEDFF',
    borderRadius: moderateScale(3),
    margin: 0,
    marginTop: moderateScale(10),
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
  },
});
