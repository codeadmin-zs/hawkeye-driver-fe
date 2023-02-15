// import {apiClient,} from 'app/services/client';
import FetchApi from './client';
import ApiConfig from 'app/config/api-config';

export const getMessages = async () => {
  return FetchApi({
    endpoint: `${ApiConfig.MESSAGES}`,
    method: 'GET',
  });
};

