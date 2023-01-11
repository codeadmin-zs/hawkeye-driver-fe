import React, {FunctionComponent, ReactNode} from 'react';
import {View, ImageBackground, StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import Dimensions from '../utils/helper';
import {Typography} from './Typography';
import Logo from '../assets/Logo.svg';
import UserIcon from '../assets/Svgs/UserIcon.svg';
import {moderateScale} from 'react-native-size-matters';

const dim = Dimensions.Screen;

interface WithLogoHeaderProps {
  children: ReactNode;
}

const HolidayPod: FunctionComponent<any> = props => {
  const {colors} = useTheme();
  const styles = makeStyles(colors, props.type);

  return (
    <View style={styles.container}>
      <View style={styles.verticalLine} />
      <View style={styles.detailsContainer}>
        <Typography.H4 style={{color: '#000', numberOfLines: 1}}>
          {props.date}
        </Typography.H4>
        <Typography.H6Light style={{color: '#000'}}>
          {props.text}
        </Typography.H6Light>
      </View>
    </View>
  );
};

export default HolidayPod;

const makeStyles = (colors: any, type) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      marginHorizontal: '4%',
      marginVertical: '1%',
      padding: '4%',
      backgroundColor: colors.surfaceBackground,
      elevaton: 10,
    },
    detailsContainer: {width: '100%', paddingLeft: '3%'},
    verticalLine: {
      width: moderateScale(3),
      backgroundColor: type === 'holiday' ? '#22BA09' : '#F6B553',
      marginLeft: '4%',
    },
    logoContainer: {
      width: '30%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
