import FetchApi from './client';
import ApiConfig from 'app/config/api-config';

export const getHolidaysList = async () => {
  return FetchApi({
    endpoint: `${ApiConfig.HOLIDAYS}`,
    method: 'GET',
  });
};

export const getEventsList = async () => {
  return FetchApi({
    endpoint: `${ApiConfig.EVENTS}`,
    method: 'GET',
  });
};
