import FetchApi from './client';
import ApiConfig from 'app/config/api-config';
import DeviceInfo from 'react-native-device-info';
import {storeHelpers} from '../store';

export const getDriverDetails = () => {
  
    return FetchApi({
      endpoint: `${ApiConfig.DRIVER}${storeHelpers.getUserId()}`,
      method: 'GET',
    });
  };