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
import Coords from '../assets/Svgs/Coordinates.svg';
import Bus from '../assets/Svgs/Bus.svg';
import Phone from '../assets/Svgs/Phone.svg';
import Menu from '../assets/Svgs/3Dot.svg';

const dim = Dimensions.Screen;

interface WithLogoHeaderProps {
  children: ReactNode;
}

const TrackPod: FunctionComponent<any> = props => {
  const {colors} = useTheme();

  const styles = makeStyles(colors);
  console.log(colors);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Bus />
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View
            style={{
              flex: 1,
              marginRight: '4%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Typography.H4>Bus Number</Typography.H4>
            <Typography.H6>Bus Number</Typography.H6>
          </View>
          <View
            style={{
              flex: 1,
              marginRight: '4%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Coords height={12} width={10} />
            <Typography.H5 style={{color: '#909090', paddingLeft: '1%'}}>
              LAT/LONG:
            </Typography.H5>
            <Typography.H5Light style={{color: '#0000EE', paddingLeft: '1%'}}>
              25.286394/55.329437
            </Typography.H5Light>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          backgroundColor: colors.surfaceBackground,
          flexDirection: 'row',
          paddingBottom: '4%',
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
        }}>
        <View style={{width: '90%', paddingLeft: '10%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: '10%',
            }}>
            <Typography.H6>Mohammed Abdullah Salim Matar...</Typography.H6>
            <Phone />
          </View>
          <Typography.H6Light>Bus Attendand Name</Typography.H6Light>
        </View>
        <View style={{width: '10%'}}>
          <Menu />
        </View>
      </View>
    </>
  );
};

export default TrackPod;

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
  });
