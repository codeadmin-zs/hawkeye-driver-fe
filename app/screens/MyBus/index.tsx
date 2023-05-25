import React,{useEffect,useState} from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavigationService from "app/navigation/NavigationService";
import { moderateScale } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { useTheme } from "react-native-paper";

import { BusPod, DateTab, Header, TrackPod } from "app/components";
import { t } from "../../i18n";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import { makeStyles } from "./styles";
import { DateTabMyBus } from "app/components/DateTabMyBus";
import {getVehicleDetails,getVehiclePaths} from '../../services/vehicles'

const MyBus: React.FC = ({route}) => {
  const {profileInfo}=route.params
  console.log("shbduhgbv",profileInfo);
  
  const initialDate = {
    startDate: moment().add(1, "days").format("YYYY-MM-DD"),
    endDate: moment().add(1, "days").endOf("day"),
  };
  const [dateDetails, setDateDetails] = useState(initialDate);
  // const [getVehiclesData, setGetVehiclesData] = useState({});
  const [busNumber, setBusNumber] = useState('');
const [plateNumber, setPlateNumber] = useState('');

  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  
//   const dateChangeHandler = (date) => {
//     setDateDetails((prev) => {
//       return { ...prev, startDate: date, endDate: date };
//     });
//   };
  
  useEffect(() => {
    const getVehicles = async () => {
      const response = await getVehicleDetails(profileInfo?.vehicleGuid);
      console.log("&&&&&response",response);
      const { name: busNumber, plate: plateNumber } = response.body;
      // setGetVehiclesData(response)
      setBusNumber(busNumber);
      setPlateNumber(plateNumber);
    }
    getVehicles()
  }, []);

  useEffect(() => {
    const getPaths = async () => {
      const resp = await getVehiclePaths(profileInfo?.vehicleGuid);
      console.log("pathresponse",resp);
    }
    getPaths()
  }, []);


  

  const goBack = () => NavigationService.goBack();

  return (
   <>
      <Header
        title={t("myBus.title")}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <View style={styles.topContainer}>
     <DateTabMyBus  startDate={dateDetails.startDate}
          onChangeDate={(date) => dateChangeHandler(date)} />
      <BusPod busNumber={busNumber}
      plateNumber={plateNumber}
      />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 32,
  },
});

export default MyBus;
