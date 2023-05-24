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
