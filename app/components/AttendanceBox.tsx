import React, {FunctionComponent, ReactNode} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Dimensions from '../utils/helper';
import {Typography} from './Typography';
import Logo from '../assets/Logo.svg';
import UserIcon from '../assets/Svgs/UserIcon.svg';

const dim = Dimensions.Screen;

interface WithLogoHeaderProps {
  children: ReactNode;
}

const AttendanceBox: FunctionComponent<any> = props => {
  const {colors} = useTheme();

  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: props.bgColor}]}
      onPress={props.onPress}
      disabled={props.onPress ? false : true}>
      <Typography.H4 style={{fontWeight: 'bold', color: props.textColor}}>
        {props.count}
      </Typography.H4>
      <Typography.H5 style={{...styles.label, color: props.textColor}}>
        {props.label}
      </Typography.H5>
    </TouchableOpacity>
  );
};

export default AttendanceBox;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      padding: '4%',
      elevaton: 10,
      paddingVertical: '3%',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    label: {fontFamily: 'Poppins-semiBold'},
  });
