import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import NavigationService from "app/navigation/NavigationService";
import { useNavigation } from "@react-navigation/native";
import { useTheme,ActivityIndicator } from "react-native-paper";

import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import { getDriverVehicles } from "app/services/driver";
import { Header } from "app/components";
import { t } from "../../i18n";
import { BusPod } from "app/components";
import MenuPressPopup from "app/components/MenuPressPopup";
import {NoResourceFound} from "app/components";

const MyBusList: React.FC = ({ route }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { profileInfo } = route.params;

  const navigation = useNavigation();
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [showMenuOptions, setMenuOptions] = useState(false);
  const [dataForNavigation, setDataForNavigation] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const menuOptions = [
    {
      name: "Live Location",
      url: "LiveLocation",
    },
    {
      name: "Trip History",
      url: "TripHistory",
    },
    {
      name: "Pickup Schedule",
      url: "PickupSchedule",
    },
  ];

  useEffect(() => {
    const vehicleList = async () => {
      const vehicles = await getDriverVehicles(profileInfo.guid);
      setIsLoading(true);
      const vehiclesDetails = vehicles.body;
      setVehicleDetails(vehiclesDetails);
      setIsLoading(false);
    };
    vehicleList();
  }, []);

  function showMenuHandler(item) {
    setDataForNavigation({ profileInfo: profileInfo, vehicleDetails: item });
    setMenuOptions(true);
  }

  function closeMenuHandler() {
    setMenuOptions(false);
  }

  const goBack = () => NavigationService.goBack();

  return (
    <View style={styles.container}>
      <Header
        title={t("myBus.myBusList")}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      {isLoading ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={25} color={colors.primary} />
        </View>
      ) : (
        <>
          <View style={styles.contentContainer}>
            {vehicleDetails?.length > 0 ? (
              vehicleDetails.map((item, index) => {
                return (
                  <BusPod
                    key={index + item?.plate}
                    id={index + item?.plate}
                    busNumber={item?.name}
                    plateNumber={item?.plate}
                    attendandName={"Revathi"}
                    driverName={profileInfo.name}
                    onPress={() =>
                      NavigationService.navigate("MyBus", {
                        profileInfo: profileInfo,
                        vehicleDetails: item,
                      })
                    }
                    onMenuPress={() => showMenuHandler(item)}
                    profileInfo={profileInfo}
                  />
                );
              })
            ) : (
              <>
                <NoResourceFound title={t("errors.noBusFound")} />
              </>
            )}
          </View>
          {showMenuOptions && (
            <MenuPressPopup
              onPress={closeMenuHandler}
              menuOptions={menuOptions}
              dataForNavigation={dataForNavigation}
              setMenuOptions={setMenuOptions}
            />
          )}
        </>
      )}
    </View>
  );
};

export default MyBusList;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      width: "100%",
      padding: "4%",
    },
  });
