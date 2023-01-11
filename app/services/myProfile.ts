// import {apiClient,} from 'app/services/client';
import FetchApi from './client';
import ApiConfig from 'app/config/api-config';
import DeviceInfo from 'react-native-device-info';

export const getMyProfile = async () => {
  console.log('reached myProfile api');

  return FetchApi({
    endpoint: `${ApiConfig.MY_PROFILE}`,
    method: 'GET',
    isAuth: true,
  });
};
