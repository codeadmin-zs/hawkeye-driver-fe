import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import NavigationService from "app/navigation/NavigationService";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import { getDriverVehicles } from "app/services/driver";
import { Header } from "app/components";
import { t } from "../../i18n";
import { BusPod } from "app/components";
// import { makeStyles } from "./styles";

const MyBusList: React.FC = ({ route }) => {
const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { profileInfo } = route.params;
  console.log("profileInfo2", profileInfo);
  console.log("guid", profileInfo.guid);

  const navigation = useNavigation();

  const [vehicleDetails, setVehicleDetails] = useState([]);

  useEffect(() => {
    const vehicleList = async () => {
      const vehicles = await getDriverVehicles(profileInfo.guid);
      console.log("vehicleList", vehicles);
      const vehiclesDetails = vehicles.body;
    //   console.log("xxx", vehicles.length);
      setVehicleDetails(vehiclesDetails);
    //   console.log("details", vehicleDetails);
    //   console.log("details2", vehiclesDetails);
    };
    vehicleList();
  }, []);

  const goBack = () => NavigationService.goBack();

  return (
    <View style={styles.container}>
      <Header
        title={t("myBus.myBusList")}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      {vehicleDetails.length>0 &&<View style={styles.contentContainer}>
        {vehicleDetails?.map((item, index) => (
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
                  vehicleDetails: item
                })
              }
          />
        ))}
      </View>}
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
  })