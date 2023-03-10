// import {apiClient,} from 'app/services/client';
import FetchApi from "./client";
import ApiConfig from "app/config/api-config";
import DeviceInfo from "react-native-device-info";
import { storeHelpers } from "../store";

export const getChildrens = async () => {
  return FetchApi({
    endpoint: `${ApiConfig.PARENTS}${storeHelpers.getUserId()}${
      ApiConfig.CHILDRENS
    }`,
    method: "GET",
  });
};

export const getChildrenDetails = async (childId) => {
  return FetchApi({
    endpoint: `${ApiConfig.STUDENTS}${childId}`,
    method: "GET",
  });
};

export const getParentDetailsOfChild = async (childId) => {
  return FetchApi({
    endpoint: `${ApiConfig.STUDENTS}${childId}${ApiConfig.PARENT}`,
    method: "GET",
  });
};

export const getLeavesData = async (childId) => {
  return FetchApi({
    endpoint: `${ApiConfig.STUDENTS}${childId}${ApiConfig.LEAVES}`,
    method: "GET",
  });
};

export const applyLeave = async (childId, date, reason) => {
  return FetchApi({
    endpoint: `${ApiConfig.STUDENTS}${childId}${ApiConfig.LEAVES}`,
    method: "POST",
    payload: {
      absent_on: "2022/12/27",
      absent_type: 2,
      reason: "Family gettogether",
    },
  });
};

export const getPickupRoutes = (id: string) => {
  return FetchApi({
    endpoint: `${ApiConfig.VEHICLE}${id}${ApiConfig.STOPS}`,
    method: "GET",
  });
};
