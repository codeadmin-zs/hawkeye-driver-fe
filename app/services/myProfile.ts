import FetchApi from './client';
import ApiConfig from 'app/config/api-config';
import DeviceInfo from 'react-native-device-info';

export const getMyProfile = async () => {

  return FetchApi({
    endpoint: `${ApiConfig.MY_PROFILE}`,
    method: 'GET',
    isAuthReq: true,
  });
};
