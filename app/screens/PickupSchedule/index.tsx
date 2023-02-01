import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../store/features/loading/slice";
import { moderateScale } from "react-native-size-matters";

import NavigationService from "app/navigation/NavigationService";
import { Header } from "../../components";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import { Typography } from "../../components/Typography";
import { TabButton } from "../../components/Buttons/TabButton";
import Dimensions from "../../utils/helper";
import { getPickupRoutes } from "../../services/children";
import PickupStop from "./components/PickupStop";
import moment from "moment";

const dim = Dimensions.Screen;
import { makeStyles } from "./styles";

const PickupSchedule: React.FC = ({ route }) => {
  const { childeInfo } = route.params;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [pickupData, setPickupData] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [studentStop, setStudentStop] = useState({ fromStop: "", toStop: "" });
  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.loading?.isLoading);

  useEffect(() => {
    dispatch(loadingActions.enableLoading());
    let response = null;
    const fetchData = async () => {
      response = await getPickupRoutes();
      console.log("respp==pick up",response);
       let selectedRoute = response?.body[0]?.pathid;
      dispatch(loadingActions.disableLoading());
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

  const [showFromSchool, setShowFromSchool] = useState(false);

  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <Header
        title={"Pickup schedule"}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />

      <View style={styles.tabButtonBox}>
        {pickupData.map((item)=>
        <TabButton
        Label={item.pathname}
        textColor={selectedRoute === item.pathid ? colors.primary : colors.passive}
        borderWidth={selectedRoute === item.pathid ? 3 : 1}
        borderColor={selectedRoute === item.pathid ? colors.primary : colors.passive}
        onPress={() => setSelectedRoute(item.pathid)}
        height={moderateScale(40)}
      />
        )}
        
        {/* <TabButton
          Label={"To School"}
          height={moderateScale(40)}
          textColor={showFromSchool ? colors.passive : colors.primary}
          borderWidth={showFromSchool ? 1 : 3}
          borderColor={showFromSchool ? colors.passive : colors.primary}
          onPress={() => setShowFromSchool(false)}
        /> */}
      </View>
      {isLoading ? (
        <View style={styles.fullView}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
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
         
            <PickupStop
              pickupData={pickupData}
              selectedRoute={selectedRoute}
            />
          
        </>
      )}
    </View>
  );
};

export default PickupSchedule;
