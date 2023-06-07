import FetchApi from "./client";
import ApiConfig from "app/config/api-config";
import { storeHelpers } from "../store";

export const getVehicleDetails = async (id) => {
  return FetchApi({
    endpoint: `${ApiConfig.VEHICLE}/${id}`,
    method: "GET",
  });
};

export const getVehiclePaths = async (id) => {
  return FetchApi({
    endpoint: `${ApiConfig.VEHICLE}/${id}/${ApiConfig.STOPS}`,
    method: "GET",
  });
};

export const getTrips = async (plate, starttime, endtime) => {
  return FetchApi({
    endpoint: `${ApiConfig.TRIPS}/${ApiConfig.PLATES}/${plate}?starttime=${starttime}&endtime=${endtime}`,
    method: "GET",
    isGtrackit: true,
  });
};

export const getTripDetails = async (plate, starttime, endtime) => {
  return FetchApi({
    endpoint: `${ApiConfig.TRIPHISTORY}/${ApiConfig.PLATES}/${plate}?starttime=${starttime}&endtime=${endtime}`,
    method: "GET",
    isGtrackit: true,
  });
};

export const getRoutesOfVehicle = (guid: string, date: string) => {
  if (date) {
    return FetchApi({
      endpoint: `${ApiConfig.VEHICLE}/${guid}/${ApiConfig.ROUTES}?${ApiConfig.DATE}=${date}`,
      method: "GET",
    });
  } else {
    return FetchApi({
      endpoint: `${ApiConfig.VEHICLE}/${guid}/${ApiConfig.ROUTES}`,
      method: "GET",
    });
  }
};

export const getStopsOfRoute = (guid: string) => {
  return FetchApi({
    endpoint: `${ApiConfig.ROUTES}/${guid}/${ApiConfig.STOPS}`,
    method: "GET",
  });
};

export const getVehicles = async () => {
  return FetchApi({
    endpoint: `${ApiConfig.VEHICLE}_`,
    method: "GET",
  });
};

export const assetLiveInfo = (carIds) => {
  return FetchApi({
    endpoint: `${ApiConfig.ASSETS}/carids=${carIds}`,
    method: "GET",
    isGtrackit: true,
  });
};
