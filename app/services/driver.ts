import FetchApi from './client';
import ApiConfig from 'app/config/api-config';
import DeviceInfo from 'react-native-device-info';
import {storeHelpers} from '../store';
import { formatLeaveApiParams } from "../utils/formatParams";

export const getDriverDetails = () => {
  
    return FetchApi({
      endpoint: `${ApiConfig.DRIVER}/${storeHelpers.getUserId()}`,
      method: 'GET',
    });
  };

  export const getLeavesData = async () => {
    console.log(
      "reached getdriver api",
      `${ApiConfig.USERS}${ApiConfig.LEAVES}`
    );
  
    return FetchApi({
      endpoint: `${ApiConfig.USERS}${ApiConfig.LEAVES}`,
      method: "GET",
    });
  };
  
  export const applyDriverLeave = async (guid, formattedParams) => {
    console.log("reached apply leave api", formattedParams);
    
    return FetchApi({
      endpoint: `${ApiConfig.USERS}${guid}/${ApiConfig.LEAVES}`,
      method: "POST",
      payload: formattedParams,
    });
  };