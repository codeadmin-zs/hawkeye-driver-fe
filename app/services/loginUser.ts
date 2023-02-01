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

// export default async function loginUser(username: string, password: string) {
//   let uniqueId = await DeviceInfo.getUniqueId();
//   console.log('reached==', username, password);
//   const response = await authClient
//     .post(ApiConfig.SESSIONS + uniqueId, {
//       un: username,
//       pwd: password,
//       fcmToken: '3242sdw3',
//       rgn: '1',
//     })
//     .then(resp => {
//       console.log('resp123', resp);
//       return resp.data;
//     })
//     .catch(function (error) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log(error.response);
//         return error.response;
//       }
//     });
//   const jsonResp = JSON.stringify(response);
//   console.log('jsonResp', response.status, response);
//   return jsonResp;
// }
