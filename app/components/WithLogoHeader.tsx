import React, {FunctionComponent, ReactNode} from 'react';
import {View, ImageBackground, StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import Dimensions from '../utils/helper';
import {Typography} from './Typography';
import Logo from '../assets/Logo.svg';
import {moderateScale} from 'react-native-size-matters';

const dim = Dimensions.Screen;

interface WithLogoHeaderProps {
  children: ReactNode;
}

const WithLogoHeader: FunctionComponent<any> = props => {
  const theme = useTheme();
  return (
    <View style={styles.container(theme)}>
      <View style={styles.titleContainer(theme)}>
        <Typography.Title color={'#fff'}>Hawkeye</Typography.Title>
        <Typography.H5Light style={{color: '#fff', top: '-14%'}}>
          Your remote eye
        </Typography.H5Light>
      </View>
      <View style={styles.imageContainer(theme)}>
        <Logo height={moderateScale(160)} width={moderateScale(175)} />
      </View>
    </View>
  );
};

export default WithLogoHeader;

const styles = StyleSheet.create({
  container: theme => {
    return {
      height: dim.height * 0.2,
      flexDirection: 'row',
      width: '100%',
      backgroundColor: theme.colors.primary,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
    };
  },
  titleContainer: theme => {
    return {width: '60%', paddingLeft: '4%'};
  },
  imageContainer: theme => {
    return {
      width: '40%',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      top: dim.height * 0.03,
    };
  },
});
