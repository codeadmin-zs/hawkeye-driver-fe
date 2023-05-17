import React, {FunctionComponent, ReactNode} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Dimensions from '../utils/helper';
import {Typography} from './Typography';
import Coords from '../assets/Svgs/Coordinates.svg';
import Bus from '../assets/Svgs/Bus.svg';
import Phone from '../assets/Svgs/Phone.svg';
import Menu from '../assets/Svgs/3Dot.svg';
import ActionBar from './ActionBar';
import UserIcon from '../assets/Svgs/UserIcon.svg';
import {moderateScale} from 'react-native-size-matters';

const dim = Dimensions.Screen;

interface BusPodProps {
  busNumber: string;
  time: string;
  plateNumber: string;
  attendandName: string;
  driverName: string;
  onPress?: any;
}

const BusPod: FunctionComponent<any> = ({
  busNumber,
  time,
  plateNumber,
  attendandName,
  driverName,
  onPress,
}: BusPodProps) => {
  const {colors} = useTheme();

  const styles = makeStyles(colors);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Bus />
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View
            style={[styles.subContainer, {justifyContent: 'space-between'}]}>
            <Typography.H4>{busNumber}</Typography.H4>
            <Typography.H6>{time}</Typography.H6>
          </View>
          <View style={styles.subContainer}>
            <Typography.H5 style={{color: '#909090', paddingLeft: '1%'}}>
              {`${plateNumber}`}
            </Typography.H5>
          </View>
        </View>
      </View>
      <View style={styles.bottomBox}>
        <View style={{width: '90%', paddingLeft: '4%', flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.bottomDataContainer}
            onPress={() => Linking.openURL(`tel:5500`)}>
            <UserIcon height={moderateScale(20)} width={moderateScale(20)} />
            <Typography.H6 style={{paddingHorizontal: '6%'}}>
              {driverName}
            </Typography.H6>
            <Phone />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomDataContainer}
            onPress={() => Linking.openURL(`tel:5511`)}>
            <UserIcon height={moderateScale(20)} width={moderateScale(20)} />
            <Typography.H6Light style={{paddingHorizontal: '6%'}}>
              {attendandName}
            </Typography.H6Light>
            <Phone />
          </TouchableOpacity>
        </View>
        <View style={{width: '10%'}}>
          <Menu />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BusPod;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: colors.surfaceBackground,
      paddingVertical: '3%',
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
    },
    detailsContainer: {width: '75%', paddingLeft: '2%'},
    logoContainer: {
      width: '20%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoBox: {
      borderRadius: 5,
      padding: '10%',
      marginHorizontal: '10%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DEEDFF',
    },
    subContainer: {
      flex: 1,
      marginRight: '4%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    bottomBox: {
      width: '100%',
      backgroundColor: colors.surfaceBackground,
      flexDirection: 'row',
      paddingBottom: '4%',
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
      marginBottom: '2%',
    },
    bottomDataContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: '10%',
      flex: 1,
    },
  });
