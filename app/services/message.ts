import FetchApi from './client';
import ApiConfig from 'app/config/api-config';

export const getMessages = async () => {
  return FetchApi({
    endpoint: `${ApiConfig.MESSAGES}`,
    method: 'GET',
  });
};

export const createMessage=async(data)=>{
  return FetchApi({
    endpoint: `${ApiConfig.MESSAGES}`,
    method: 'POST',
  })
}

export const oneMessageRead=async(guid)=>{
  return FetchApi({
    endpoint: `${ApiConfig.MESSAGES}/${guid}/${ApiConfig.READS}`,
    method:'POST'
  })
}

export const allMessageRead=async()=>{
  return FetchApi({
    endpoint: `${ApiConfig.MESSAGES}/${ApiConfig.READS}`,
    method:'POST'
  })
}
// console.log("data",data);

