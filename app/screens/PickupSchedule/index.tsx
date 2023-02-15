import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { useTheme, List } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../store/features/loading/slice";
import { moderateScale } from "react-native-size-matters";

import NavigationService from "app/navigation/NavigationService";
import { Header, DriverPod, NoResourceFound, RoutePod } from "../../components";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import { Typography } from "../../components/Typography";
import { TabButton } from "../../components/Buttons/TabButton";
import Dimensions from "../../utils/helper";
import { getPickupRoutes } from "../../services/children";
import PickupStop from "./components/PickupStop";
import moment from "moment";
import LinearGradient from "react-native-linear-gradient";
import DownArrow from "app/assets/Svgs/DownArrow.svg";
import { fonts } from "../../config/fonts";
import { storeHelpers } from "app/store";

const dim = Dimensions.Screen;
import { makeStyles } from "./styles";

const PickupSchedule: React.FC = ({ route }) => {
  const { childeInfo } = route.params;
  const driverName = storeHelpers.getUserDetails()?.name;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [pickupData, setPickupData] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedPath, setSelectedPath] = useState("");
  const [studentStop, setStudentStop] = useState({ fromStop: "", toStop: "" });
  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.loading?.isLoading);

  useEffect(() => {
    dispatch(loadingActions.enableLoading());
    let response = null;
    const fetchData = async () => {
      const vehicleId = storeHelpers.getUserDetails()?.vehicleGuid;
      response = await getPickupRoutes(vehicleId);
      let selectedRoute = response?.body[0]?.pathid;
      let selectedPath = response?.body[0];
      dispatch(loadingActions.disableLoading());

      setSelectedPath(selectedPath);
      setSelectedRoute(selectedRoute);
      setPickupData(response?.body);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let toStop = "";
    let fromStop = "";
    if (pickupData?.outbound_stop) {
      fromStop = pickupData?.outbound?.find(
        (item) => pickupData?.outbound_stop === item.id
      );
    }
    if (pickupData?.inbound_stop) {
      toStop = pickupData?.inbound?.find(
        (item) => pickupData?.inbound_stop === item.id
      );
    }
    setStudentStop({ fromStop, toStop });
  }, [pickupData]);

  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <Header
        title={"Schedule Trips"}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      {/* <DriverPod data={selectedPath} index={selectedPath.pathid} /> */}
      {/* <List.AccordionGroup>
        {pickupData?.length> 0 ? pickupData.map((item) => (
          <List.Accordion
            title={item.pathname}
            id={item.pathid}
            titleStyle={{ color: colors.primary, fontFamily: fonts.medium }}
            right={(props) => <DownArrow fill={colors.primary} />}
          >
            <PickupStop pickupData={pickupData} selectedRoute={selectedRoute} />  
          </List.Accordion>
        )):
        (<NoResourceFound />)}
      </List.AccordionGroup> */}
      {isLoading ? (
        <View style={styles.fullView}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <View style={{ marginHorizontal: "4%", marginTop: "4%" }}>
          {pickupData?.length > 0 ? (
            pickupData.map((item) => (
              <RoutePod
                routeData={item}
                driverName={driverName}
                onPress={() =>
                  NavigationService.navigate("Track", { routeParam: item })
                }
              />
            ))
          ) : (
            <NoResourceFound />
          )}
        </View>
      )}
      {/* <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    /> */}

      {/* <ScrollView
        style={styles.tabButtonBox}
        horizontal={true}
        contentContainerStyle={{}}
      >
        {pickupData.map((item) => (
          <TabButton
            Label={item.pathname}
            textColor={
              selectedRoute === item.pathid ? colors.primary : colors.passive
            }
            borderWidth={selectedRoute === item.pathid ? 3 : 1}
            borderColor={
              selectedRoute === item.pathid ? colors.primary : colors.passive
            }
            onPress={() => setSelectedRoute(item.pathid)}
            height={moderateScale(40)}
          />
        ))} */}

      {/* <TabButton
          Label={"To School"}
          height={moderateScale(40)}
          textColor={showFromSchool ? colors.passive : colors.primary}
          borderWidth={showFromSchool ? 1 : 3}
          borderColor={showFromSchool ? colors.passive : colors.primary}
          onPress={() => setShowFromSchool(false)}
        /> */}
      {/* </ScrollView>
      {isLoading ? (
        <View style={styles.fullView}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <> */}
      {/* <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography.H4 style={{ paddingTop: 8 }}>
              {showFromSchool
                ? `${studentStop.fromStop.name} : ETA : ${moment(studentStop.fromStop.eta,'HH:mm:ss').format('hh:mm A')}`
                : `${studentStop.toStop.name} : ETA : ${moment(studentStop.toStop.eta,'HH:mm:ss').format('hh:mm A')}`}
            </Typography.H4>
          </View> */}

      {/* <PickupStop pickupData={pickupData} selectedRoute={selectedRoute} />
        </>
      )} */}
    </View>
  );
};

export default PickupSchedule;
