import React, {FunctionComponent, ReactNode} from 'react';
import {View, ImageBackground, StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import Dimensions from '../../../utils/helper';
import {Typography} from '../../../components/Typography';
import Logo from '../assets/Logo.svg';
import moment from 'moment';

const dim = Dimensions.Screen;

interface WithLogoHeaderProps {
  children: ReactNode;
}

const UserDetailsInfo: FunctionComponent<any> = props => {
  const theme = useTheme();
  return (
    <View style={[styles.container(theme), props.containerStyle]}>
      <View style={[styles.titleContainer(theme)]}>
        <Typography.H3 style={{color: '#000',bottom: '-14%',}}>Rajendran Nair</Typography.H3>
        <Typography.H6Light style={{color: '#959595'}}>
          {moment().format("dddd, MMMM D YYYY")}
        </Typography.H6Light>
      </View>
      <View style={[styles.imageContainer(theme)]}>
        <Typography.H2Light style={{color:'#000',}}>
          {moment().format('LT')}
        </Typography.H2Light>
      </View>
    </View>
  );
};

export default UserDetailsInfo;

const styles = StyleSheet.create({
  container: theme => {
    return {
      flexDirection: 'row',
      width: '100%',
      paddingTop: dim.height * 0.02,
    };
  },
  titleContainer: theme => {
    return {width: '60%', padding: '4%'};
  },
  imageContainer: theme => {
    return {
      width: '40%',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingRight: '4%',
    };
  },
});
