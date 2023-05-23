import FetchApi from './client';
import ApiConfig from 'app/config/api-config';
import DeviceInfo from 'react-native-device-info';
import {storeHelpers} from '../store';

export const getDriverDetails = () => {
  
    return FetchApi({
      endpoint: `${ApiConfig.DRIVER}/${storeHelpers.getUserId()}`,
      method: 'GET',
    });
  };

  export const getLeavesData = async () => {
    console.log(
      "reached getdriver api",
      `${ApiConfig.DRIVER}${ApiConfig.LEAVES}`
    );
  
    return FetchApi({
      endpoint: `${ApiConfig.DRIVER}${ApiConfig.LEAVES}`,
      method: "GET",
    });
  };