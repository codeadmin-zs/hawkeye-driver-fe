// import {apiClient,} from 'app/services/client';
import FetchApi from './client';
import ApiConfig from 'app/config/api-config';
import DeviceInfo from 'react-native-device-info';

export const loginUser = async (username: string, password: string) => {
  let uniqueId = await DeviceInfo.getUniqueId();

  return FetchApi({
    endpoint: `${ApiConfig.SESSIONS}${uniqueId}`,
    method: 'POST',
    auth: false,
    isAuth: true,
    payload: {
      un: username,
      pwd: password,
      fcmToken: '3242sdw3',
      rgn: '1',
    },
  });
};
