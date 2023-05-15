// import {apiClient,} from 'app/services/client';
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
  
  //HARDCODED VALUE
  export const applyDriverLeave = async (guid, formattedParams) => {
    console.log("reached apply leave api", formattedParams);
    console.log();
    
    return FetchApi({
      endpoint: `${ApiConfig.DRIVER}${guid}${ApiConfig.LEAVES}`,
      method: "POST",
      payload: formattedParams,
    });
  };


  // export const getLeave = async () => {
  //   return FetchApi({
  //     endpoint: `${ApiConfig.DRIVER}`,
  //     method: "GET",
  //   });
  // };
  // export const getLeavesData = async (guid) => {
  //   return FetchApi({
  //     endpoint: `${ApiConfig.DRIVER}${guid}${ApiConfig.LEAVES}`,
  //     method: "GET",
  //   });
  // };

  // export const applyLeave = async ( guid, date, reason) => {
  //   return FetchApi({
  //     endpoint: `${ApiConfig.DRIVER}${guid}${ApiConfig.LEAVES}`,
  //     method: "POST",
  //     payload: {
  //       absent_on: "2022/12/27",
  //       absent_type: 2,
  //       reason: "Family gettogether",
  //     },
  //   });