import React, { useEffect, useState } from "react";

import { View, StyleSheet } from "react-native";

import { Button, TextInput, useTheme } from "react-native-paper";

import NavigationService from "app/navigation/NavigationService";

import { Header } from "../../components";

import LeftArrow from "../../assets/Svgs/LeftArrow.svg";

import { Typography } from "../../components/Typography";

import { BusPod } from "../../components";

import { moderateScale } from "react-native-size-matters";

// import MenuPressPopup from "../../components/MenuPressPopup";

import { getRoutesOfVehicle, getVehicles } from "../../services/vehicles";

// import { getChildrens } from "../../services/children";

import moment from "moment";

const BusList: React.FC = () => {
  const { colors } = useTheme();

  const styles = makeStyles(colors);

  const [showMenuOptions, setMenuOptions] = useState(false);

  const menuOptions = [
    {
      name: "Live Location",
      url: "LiveLocation",
    },

    {
      name: "Trip History",
      url: "Trip History",
    },

    {
      name: "Route",
      url: "Route",
    },
  ];

  const goBack = () => NavigationService.goBack();

  function showMenuHandler() {
    setMenuOptions(true);
  }

  function closeMenuHandler() {
    setMenuOptions(false);
  }

  useEffect(() => {
    async function getBusDetails() {
      const vehicleResponse = await getVehicles();

      console.log("vehicles", vehicleResponse);

      const vehiclesArr = vehicleResponse.body;

      const studentResponse = await getChildrens();

      console.log("students", studentResponse);

      const studentsArr = studentResponse.body;

      const combinedArray = [];

      const guid = "6ef68d68-e527-45d9-8ed4-5c5495d88e65";

      const routeResponse = getRoutesOfVehicle(
        guid,

        moment().format("YYYY-MM-DD")
      );

      console.log("routeResponse", routeResponse);

      vehiclesArr.forEach((vehicle) => {
        studentsArr.forEach((student) => {
          if (student.vehicle_id === vehicle.id) {
            combinedArray.push({ bus: vehicle, child: student });
          }
        });
      });

      console.log("combinedArray", combinedArray);
    }

    getBusDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={"Bus list"}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />

      <View style={styles.contentContainer}>
        <BusPod
          busNumber={"Bus 16"}
          time={"7:58 AM"}
          plateNumber={"KL 15-A 1"}
          attendandName={"Saji"}
          driverName={"Rajeevan"}
          onPress={() => NavigationService.navigate("Track")}
          onMenuPress={showMenuHandler}
        />
        <BusPod
          busNumber={"Bus 17"}
          time={"8:10 AM"}
          plateNumber={"KL 15-A 3"}
          attendandName={"Revathi"}
          driverName={"Roopesh"}
          onPress={() => NavigationService.navigate("Track")}
          onMenuPress={showMenuHandler}
        />
      </View>

      {showMenuOptions && (
        <MenuPressPopup onPress={closeMenuHandler} menuOptions={menuOptions} />
      )}
    </View>
  );
};

export default BusList;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },

    contentContainer: {
      width: "100%",

      padding: "4%",
    },

    rootContainer: {
      elevaton: 30,

      width: "100%",

      backgroundColor: colors.surfaceBackground,

      borderRadius: moderateScale(5),

      marginVertical: "1%",

      padding: "2%",
    },

    fullMessageConatiner: {
      alignItems: "center",

      justifyContent: "center",

      width: "100%",

      paddingHorizontal: "2%",
    },
  });

// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import {Button, TextInput, useTheme} from 'react-native-paper';
// import NavigationService from 'app/navigation/NavigationService';
// import {Header} from '../../components';
// import LeftArrow from '../../assets/Svgs/LeftArrow.svg';
// import {Typography} from '../../components/Typography';
// import {BusPod} from '../../components';
// import {moderateScale} from 'react-native-size-matters';
// import commonStyles from './styles';

// const BusList: React.FC = () => {
//   const {colors} = useTheme();
//   const styles = makeStyles(colors);

//   const goBack = () => NavigationService.goBack();

//   return (
//     <View style={styles.container}>
//       <Header
//         title={'Bus list'}
//         leftIcon={<LeftArrow />}
//         leftIconPress={() => goBack()}
//       />
//       <View style={styles.contentContainer}>
//         <BusPod
//           busNumber={'Bus 16'}
//           time={'7:58 AM'}
//           plateNumber={'KL 15-A 1'}
//           attendandName={'Saji'}
//           driverName={'Rajeevan'}
//           onPress={() => NavigationService.navigate('Track')}
//         />
//         <BusPod
//           busNumber={'Bus 17'}
//           time={'8:10 AM'}
//           plateNumber={'KL 15-A 3'}
//           attendandName={'Revathi'}
//           driverName={'Roopesh'}
//           onPress={() => NavigationService.navigate('Track')}
//         />
//       </View>
//     </View>
//   );
// };

// export default BusList;

// const makeStyles = (colors: any) =>
//   StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     contentContainer: {
//       width: '100%',
//       padding: '4%',
//     },
//     rootContainer: {
//       elevaton: 30,
//       width: '100%',
//       backgroundColor: colors.surfaceBackground,
//       borderRadius: moderateScale(5),
//       marginVertical: '1%',
//       padding: '2%',
//     },
//     fullMessageConatiner: {
//       alignItems: 'center',
//       justifyContent: 'center',
//       width: '100%',
//       paddingHorizontal: '2%',
//     },
//   });
