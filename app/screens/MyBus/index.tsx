import React,{useEffect} from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavigationService from "app/navigation/NavigationService";
import { moderateScale } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";

import { BusPod, DateTab, Header, TrackPod } from "app/components";
import { t } from "../../i18n";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import { makeStyles } from "./styles";

const MyBus: React.FC = ({route}) => {
  const navigation = useNavigation();
  // const { routeParam } = route.params;
  // console.log("routeParam",routeParam);
  
  useEffect(() => {
    const getVehicleDetails = async () => {
      const response = await getVehicleDetails();
      console.log("&&&&&response",response);
    }
    getVehicleDetails();
  }, []);

  const goBack = () => NavigationService.goBack();

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t("myBus.title")}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <DateTab/>
      {/* <TrackPod trackData={routeParam}/> */}
      <BusPod />

      <Text style={styles.text}>This is my bus page</Text>
      <Button title="Go Back" onPress={goBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 32,
  },
});

export default MyBus;
