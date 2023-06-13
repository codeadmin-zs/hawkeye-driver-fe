import React from "react";
import { View } from "react-native";
import RouteViewPod from "../../components/RouteViewPod";
import { BusPod, Header } from "../../components";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import NavigationService from "../../navigation/NavigationService";
import { makeStyles } from "./styles";
import { useTheme } from "react-native-paper";
import moment from "moment";
import { Typography } from "../../components/Typography";

const RouteView: React.FC = ({ route }) => {
  // currentPos is required to make the RouteViewPod component work here
  const { fullTrips, currentPos, vehicleDetails, date } = route.params;
  
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const goBack = () => NavigationService.goBack();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topContainer}>
        <Header
          title={"Route View"}
          leftIcon={<LeftArrow />}
          leftIconPress={() => goBack()}
        />
        <View style={styles.busPodContainer}>
          <BusPod
            busNumber={vehicleDetails?.name}
            plateNumber={vehicleDetails?.plate}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <RouteViewPod
          fullTrips={fullTrips}
          currentPos={currentPos}
          showAsset={false}
        />
      </View>
    </View>
  );
};
export default RouteView;