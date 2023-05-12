import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

// import AppStyles from '../../config/styles';
// import metrics from '../../config/metrics';
import {useTheme} from 'react-native-paper';
import Skelton from '../assets/Svgs/Skelton.svg';
import NoResourceImg from '../assets/Svgs/NoResourceImg.svg';

import {moderateScale} from 'react-native-size-matters';

import Dimensions from '../utils/helper';

const dim = Dimensions.Screen;

const NoResourceFound = (props: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const itemsNumber = Math.floor(dim.height / moderateScale(70));
  const times = Array(itemsNumber).fill(0);

  const renderBackgroundSkelton = () => {
    return times.map((prop, key) => {
      return (
        <View
        key={key}
          style={{
            width: '100%',
            alignItems: 'center',
            marginBottom: moderateScale(15),
          }}>
          <Skelton height={moderateScale(70)} width={'92%'} />
        </View>
      );
    });
  };
  return (
    <View style={styles.fullScreen}>
      {renderBackgroundSkelton()}
      <View
        style={{flex: 1, left: 0, bottom: 0, top: 0, right: 0}}
        position={'absolute'}>
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
          }}>
          <NoResourceImg height={'90%'} width={'70%'} />
        </View>
        <View style={{flex: 4, marginTop: moderateScale(-40)}}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subTitle}>{props.subTitle}</Text>
        </View>
      </View>
    </View>
  );
};

export default NoResourceFound;
const makeStyles = (colors: any) =>
  StyleSheet.create({
    fullScreen: {
      flexGrow: 1,
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    imageBackground: {
      width: '100%',
      flexGrow: 1,
      backgroundColor: 'red',
      aspectRatio: 1,
      // marginTop:-20
    },
    title: {
      fontFamily: 'Poppins-SemiBold',
      fontWeight: '600',
      fontSize: moderateScale(20),
      color: '#505050',
      textAlign: 'center',
    },
    subTitle: {
      fontFamily: 'Poppins-Medium',
      fontWeight: '500',
      fontSize: moderateScale(14),
      color: '#909090',
      textAlign: 'center',
    },
  });
