import React, {FunctionComponent, ReactNode, useEffect, useState} from 'react';
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
import Logout from '../assets/Svgs/LogoutIcon.svg';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {loginActions} from '../store/features/login/slice';
import UserDetailsInfo from "../screens/Home/components/UserDetailsInfo";
import { getDriverDetails } from 'app/services/driver';

const dim = Dimensions.Screen;

interface WithLogoHeaderProps {
  children: ReactNode;
}

const WithLogoMenuHeader: FunctionComponent<any> = props => {
  const [schoolName,setSchoolName]=useState('')
  const theme = useTheme();
  const dispatch = useDispatch();
  const onLogout = () => {
    
    dispatch(loginActions.logoutRequest());
  }
  useEffect(() => {
    const fetchData = async () => {
        const driverDetails = await getDriverDetails();
        console.log("driverDetails", driverDetails);
        console.log("school",driverDetails.body.schoolName);
        setSchoolName(driverDetails.body.schoolName);
    };
    fetchData();
  }, []);
  
  return (
    <View style={styles.container(theme)}>
      <View style={styles.titleContainer(theme)}>
        <Typography.Title color={'#fff'}>Hawkeye</Typography.Title>
        <Typography.H6Light style={{color: '#fff', top: '-16%'}}>
          Your remote eye
        </Typography.H6Light>
        <Typography.H4 style={{color: '#F3F053', top: '-10%'}}>
          {schoolName}
        </Typography.H4>
      </View>
      <View style={styles.imageContainer(theme)}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', top: '-10%'}}
          onPress={onLogout}>
          <Logout fill={'#fff'} height={17} width={17} />
          <Typography.H4
            style={{
              color: '#fff',
              textAlign: 'center',
              paddingRight: '10%',
              paddingLeft: '5%',
            }}>
            Logout
          </Typography.H4>
        </TouchableOpacity>
        <Logo height={moderateScale(120)} width={moderateScale(150)} />
      </View>
    </View>
  );
};

export default WithLogoMenuHeader;

const styles = StyleSheet.create({
  container: theme => {
    return {
      height: dim.height * 0.2,
      flexDirection: 'row',
      width: '100%',
      backgroundColor: theme.colors.primary,
      borderBottomRightRadius: 30,
      borderBottomLeftRadius: 30,
    };
  },
  titleContainer: theme => {
    return {width: '60%', paddingLeft: '4%', justifyContent: 'center'};
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
