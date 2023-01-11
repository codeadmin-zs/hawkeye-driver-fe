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

const AttendancePod: FunctionComponent<any> = props => {
  const {colors} = useTheme();
  const {data} = props;

  if (!data) {
    return null;
  }
  const styles = makeStyles(colors);
  console.log(colors);
  return (
    <TouchableOpacity style={styles.container} onPress={props?.onPress}>
      <View style={styles.logoContainer}>
        <UserIcon />
      </View>
      <View style={styles.detailsContainer}>
        <Typography.H4 color={'#000'}>{data.name}</Typography.H4>
        <Typography.H6Light style={{color: '#000'}}>
          {data.admissionNumber}
        </Typography.H6Light>
        <Typography.H6Light style={{color: '#000'}}>
          {data.class}
        </Typography.H6Light>
      </View>
    </TouchableOpacity>
  );
};

export default AttendancePod;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      marginVertical: '1%',
      backgroundColor: colors.surfaceBackground,
      elevaton: 30,
      paddingVertical: '3%',
      borderRadius: 5,
    },
    detailsContainer: {width: '50%'},
    logoContainer: {
      width: '30%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
