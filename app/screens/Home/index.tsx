import React from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';

import {useDispatch} from 'react-redux';
import * as loginActions from 'app/store/actions/loginActions';
import NavigationService from 'app/navigation/NavigationService';
import styles from './styles';
import UserDetailsInfo from './components/UserDetailsInfo';
import WithLogoMenuHeader from '../../components/WithLogoMenuHeader';
import Dimensions from '../../utils/helper';
import {Typography} from '../../components/Typography';

import Track from '../../assets/Svgs/Track.svg';
import Schedule from '../../assets/Svgs/Schedule.svg';
import MyProfile from '../../assets/Svgs/MyProfile.svg';
import Children from '../../assets/Svgs/Children.svg';
import Messages from '../../assets/Svgs/Messages.svg';
import Holiday from '../../assets/Svgs/Holiday.svg';
import {t} from '../../i18n';

const dim = Dimensions.Screen;

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());

  const MenuData = [
    {
      title: t('home.track'),
      bgColor: '#FBE151',
      iconBgColor: '#DAC241',
      textColor: '#000',
      onPress: () => NavigationService.navigate('BusList'),
      iconName: 'Track',
      icon: <Track />,
    },
    {
      title: t('home.pickUpSchedule'),
      bgColor: '#8E8E77',
      iconBgColor: '#C6C6A0',
      textColor: '#fff',
      onPress: () => NavigationService.navigate('Children',{navType: 'pickup'}),
      iconName: 'Schedule',
      icon: <Schedule />,
    },
    {
      title: t('home.myProfile'),
      bgColor: '#39CCC3',
      iconBgColor: '#26ACA4',
      textColor: '#fff',
      onPress: () => NavigationService.navigate('MyProfile'),
      iconName: 'MyProfile',
      icon: <MyProfile />,
    },
    {
      title: t('home.children'),
      bgColor: '#E97A73',
      iconBgColor: '#CD6059',
      textColor: '#fff',
      onPress: () => NavigationService.navigate('Children',{navType:'profile'}),
      iconName: 'Children',
      icon: <Children />,
    },
    {
      title: t('home.messages'),
      bgColor: '#4767BB',
      iconBgColor: '#6F8FE1',
      textColor: '#fff',
      onPress: () => NavigationService.navigate('Messages'),
      iconName: 'Messages',
      icon: <Messages />,
    },
    {
      title: t('home.holidayList'),
      bgColor: '#5DD261',
      iconBgColor: '#3EB843',
      textColor: '#fff',
      onPress: () => NavigationService.navigate('HolidayList'),
      iconName: 'Holiday',
      icon: <Holiday />,
    },
  ];

  return (
    <View style={styles.container}>
      <WithLogoMenuHeader />
      <UserDetailsInfo />
      <Typography.H5 style={{color: 'red', textAlign: 'center'}}>
        {`Your Bus ${t('home.busArrivalMsg')}`}
      </Typography.H5>
      <Typography.Link
        style={{textAlign: 'center'}}
        onPress={() => NavigationService.navigate('Children',{navType:'profile'})}>
        {t('home.applyLeave')}
      </Typography.Link>
      <FlatList
        style={styles.tileContainer}
        contentContainerStyle={styles.tileContentContainer}
        data={MenuData}
        renderItem={({item, index, separators}) => (
          <TouchableOpacity
            style={[styles.menuTileStyle, {backgroundColor: item.bgColor}]}
            onPress={item.onPress}>
            <View
              style={[
                styles.menuIconContainer,
                {backgroundColor: item.iconBgColor},
              ]}>
              {item.icon}
            </View>
            <Typography.H5Light
              style={{
                ...styles.menuTitle,
                color: item.textColor,
                paddingHorizontal: '2%',
              }}>
              {item.title}
            </Typography.H5Light>
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </View>
  );
};

export default Home;
