// import {apiClient,} from 'app/services/client';
import FetchApi from "./client";
import ApiConfig from "app/config/api-config";

export const getHolidaysList = async () => {
  return FetchApi({
    endpoint: `${ApiConfig.HOLIDAYS}`,
    method: "GET",
  });
};

export const getEventsList = async () => {
  return FetchApi({
    endpoint: `${ApiConfig.EVENTS}`,
    method: "GET",
  });
};

// export const getLeave = async () => {
//   return FetchApi({
//     endpoint: `${ApiConfig.DRIVER}`,
//     method: "GET",
//   });
// };

// export const postLeave = async () => {
//   return FetchApi({
//     endpoint: `${ApiConfig.DRIVER}`,
//     method: "POST",
//   });
// };

