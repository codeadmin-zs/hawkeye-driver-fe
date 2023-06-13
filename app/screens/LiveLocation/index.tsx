import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import data from "./data";

import { Header, HudView, NoResourceFound } from "../../components";
import { t } from "../../i18n";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import NavigationService from "../../navigation/NavigationService";

import { makeStyles } from "./styles";
import {
  assetLiveInfo,
  getVehicles,
  getRoutesOfVehicle,
  getStopsOfRoute,
} from "../../services/vehicles";
import AppStyles from "../../config/styles";
import AssetBottomSheet from "../../components/AssetBottomSheet";
import moment from "moment";
import RouteViewPod from "../../components/RouteViewPod";

import { Refresh } from "../../components/svgComponents";

import TabToggler from "../../components/TabToggler";
import RouteListView from "../../components/RouteListView";

const LiveLocation = ({ route }) => {
  const { profileInfo, vehicleDetails = null } = route.params;
  const [liveLocation, setLiveLocation] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [liveLocationData, setLiveLocationData] = useState();

  const [coords, setCoords] = useState([]);
  const [vehicleRoutes, setVehicleRoutes] = useState();

  const [markerState, setMarkerState] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  const styles = makeStyles();
  const today = moment().format("YYYY-MM-DD");

  const tabHeaders = [t("general.mapView"), t("general.listView")];

  async function getLiveLocation() {
    try {
      setIsLoading(true);

      // for testing purposes
      const date = "2023-05-30";

      let vehicleResponse = null;
      let routesResponse = null;

      routesResponse = await getRoutesOfVehicle(vehicleDetails.guid, today);

      const routes = routesResponse.body;
      setVehicleRoutes(routes);

      if (routes.length === 0) {
        setIsLoading(false);
        throw new Error(t("errors.noRouteFound"));
      }

      const routeGuid = routes[0].route_guid;

      const stopsResponse = await getStopsOfRoute(routeGuid);
      const completeStops = stopsResponse.body.stopsDetail;

      if (completeStops.length === 0) {
        setIsLoading(false);
        throw new Error(t("errors.noStopsFound"));
      }

      const stopsArr = completeStops.map((item, index) => {
        return {
          ...item,
          latitude: JSON.parse(item.latitude),
          longitude: JSON.parse(item.longitude),
        };
      });

      setCoords(stopsArr);

      // commented now since the asset live location is currently unavailable
      // const assetResponse = await assetLiveInfo(id);
      // const liveLocationResponse = assetResponse.body;
      // setLiveLocationData(liveLocationResponse)

      setLiveLocation(data);
      const currentPositionData = data[0];

      let latlang = [];
      latlang = currentPositionData.latlang.split(",");

      const lat = JSON.parse(latlang[0]);
      const lang = JSON.parse(latlang[1]);
      let newLatLang = { latitude: lat, longitude: lang };

      setMarkerState(newLatLang);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  }

  function assetPressHandler() {
    setShowDetails(true);
  }

  function showAssetBottomPod() {
    setShowDetails(true);
  }

  function dismissModal() {
    setShowDetails(false);
  }

  const goBack = () => NavigationService.goBack();

  function switchTab(index) {
    setActiveTab(index);
  }

  useEffect(() => {
    getLiveLocation();
    const interval = setInterval(() => {
      getLiveLocation();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header
        title={t("liveLocation.title")}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      {!isLoading && !errorMessage && (
        <>
          <TabToggler
            headersList={tabHeaders}
            activeTab={activeTab}
            switchTab={switchTab}
          />

          <View
            style={{ flex: 1, backgroundColor: AppStyles.color.COLOR_GREY_WHITE }}
          >
            {activeTab === 0 && (
              <>
                <View style={styles.refreshBtn}>
                  <TouchableOpacity onPress={() => getLiveLocation()}>
                    <Refresh
                      size={25}
                      color={AppStyles.color.COLOR_DARK_BLUE}
                    />
                  </TouchableOpacity>
                </View>

                {coords.length > 0 && (
                  <RouteViewPod
                    fullTrips={coords}
                    currentPos={markerState}
                    liveLocationData={liveLocation[0]}
                    assetPressHandler={assetPressHandler}
                  />
                )}
                <AssetBottomSheet
                  showDetails={showDetails}
                  onDismiss={dismissModal}
                  locationData={liveLocation}
                  profileInfo={profileInfo}
                />
                <TouchableOpacity onPress={showAssetBottomPod}>
                  <View style={styles.horizontalBtn}></View>
                </TouchableOpacity>
              </>
            )}
            {/* {activeTab === 1 && 
            <RouteListView stops={coords} />} */}
            {activeTab === 1 && (
              <RouteListView
                profileInfo={profileInfo}
                vehicleRoutes={vehicleRoutes}
                stops={coords}
              />
            )}
          </View>
        </>
      )}
      {errorMessage && <NoResourceFound title={errorMessage} />}
      {isLoading && <HudView />}
    </>
  );
};

export default LiveLocation;
