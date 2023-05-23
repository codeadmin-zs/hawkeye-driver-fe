import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavigationService from "app/navigation/NavigationService";
import { moderateScale } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";

import { BusPod, Header, TrackPod } from "app/components";
import { t } from "../../i18n";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import { makeStyles } from "./styles";

const MyBus: React.FC = ({route}) => {
  const navigation = useNavigation();
  const { routeParam } = route.params;
  console.log("routeParam",routeParam);
  

  const goBack = () => NavigationService.goBack();

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t("myBus.title")}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <TrackPod trackData={routeParam} driverName={driverName}/>
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
