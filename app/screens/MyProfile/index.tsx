import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Button, TextInput, useTheme} from 'react-native-paper';

import {useDispatch, useSelector} from 'react-redux';
import {loadingActions} from '../../store/features/loading/slice';
import NavigationService from 'app/navigation/NavigationService';
import {Header} from '../../components';
import LeftArrow from '../../assets/Svgs/LeftArrow.svg';
import UserIcon from '../../assets/Svgs/UserIcon.svg';
import {Typography} from '../../components/Typography';
import {t} from '../../i18n';
import {makeStyles} from './styles';
import {getMyProfile} from '../../services/myProfile';

const MyProfile: React.FC = () => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.loading?.isLoading);

  const [profileData, setProfileData] = useState({});

  const goBack = () => NavigationService.goBack();
  
  useEffect(() => {
    dispatch(loadingActions.enableLoading());
    let response = null;
    const fetchData = async () => {
      response = await getMyProfile();
      dispatch(loadingActions.disableLoading());
      setProfileData(response?.body);
    };
    fetchData();
    console.log('response==', response);
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={'My Profile'}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      {isLoading ? (
        <View style={styles.fullView}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
            <UserIcon />
            <Typography.H5Light style={{paddingTop: 8}}>
              {profileData.name}
            </Typography.H5Light>
          </View>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <View style={styles.profileTitleBox}>
              <Typography.H5Light style={{color: '#fff'}}>
                {t('profile.details')}
              </Typography.H5Light>
            </View>
            <View style={{width: '50%'}} />
          </View>
          <View style={styles.textBoxContainer}>
            <TextInput
              label={t('general.mobileNum')}
              placeholder={t('general.mobileNum')}
              style={styles.textBox}
              value={profileData?.contact_number}
            />
            <TextInput
              label={t('general.email')}
              placeholder={t('general.email')}
              style={styles.textBox}
              value={profileData.email}
            />
            <TextInput
              label={t('general.address')}
              placeholder={t('childProfile.address')}
              style={styles.textBox}
              value={profileData.perm_addr_line1}
            />
            <TextInput
              // label={t('general.address')}
              placeholder={t('childProfile.address')}
              style={styles.textBox}
              value={`${profileData.perm_addr_line2},${profileData.perm_addr_line3},${profileData.perm_addr_line4}`}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default MyProfile;
