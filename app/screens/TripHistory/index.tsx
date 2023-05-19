import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import moment from "moment";
import AppStyles from "app/config/styles";

import NavigationService from "app/navigation/NavigationService";
import { moderateScale } from "react-native-size-matters";
import { makeStyles } from "./styles";
import { useTheme } from "react-native-paper";
import {
  getVehicleDetails,
  getVehiclePaths,
  getTrips,
  getTripDetails,
} from "../../services/vehicles";
import { getDriverDetails } from "app/services/driver";
import { TripSummaryPod } from "../../components/TripSummaryPod";
import {
  HudView,
  NoResourceFound,
  Header,
  DateTab,
  DriverPod,
} from "app/components";
import { t } from "../../i18n";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import { ScrollView } from "react-native-gesture-handler";

const initialDate = {
  startDate: moment().subtract(1, "days").format("YYYY-MM-DD"),
  endDate: moment().subtract(1, "days").endOf("day"),
};

const TripHistory: React.FC = ({ route }) => {
  const { profileInfo } = route.params;

  const [errorStatus, setErrorStatus] = useState(false);

  const [dateDetails, setDateDetails] = useState(initialDate);
  const [trips, setTrips] = useState(null);
  const [vehicle, setVehicle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const goBack = () => NavigationService.goBack();

  async function getTripHistory() {
    try {
      setIsLoading(true);
      const response = await getVehicleDetails(profileInfo?.vehicleGuid);

      const vehicle = response.body;

      setVehicle(vehicle);

      const tripsResponse = await getTrips(
        vehicle.plate,
        moment(dateDetails.startDate).format("YYYY-MM-DD 00:00:00"),
        moment(dateDetails.endDate).format("YYYY-MM-DD 23:59:59")
      );

      if (tripsResponse.status === 404) {
        setErrorStatus(true);
        setTrips(tripsResponse.body);
      } else {
        setErrorStatus(false);

        setTrips(tripsResponse.body);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }

  const dateChangeHandler = (date) => {
    setDateDetails((prev) => {
      return { ...prev, startDate: date, endDate: date };
    });
  };

  const showLastTrip = async () => {
    setIsLoading(true);
    const tripsResponse = await getTrips(
      vehicle?.plate,
      moment(trips?.startDate, "DD-MM-YYYY HH:mm:ss").format(
        "YYYY-MM-DD 00:00:00"
      ),
      moment(trips?.startDate, "DD-MM-YYYY HH:mm:ss").format(
        "YYYY-MM-DD 23:59:59"
      )
    );

    setTrips(tripsResponse.body);
    setIsLoading(false);
  };

  useEffect(() => {
    getTripHistory();
  }, [dateDetails]);

  return (
    <>
      <Header
        title={t("tripHistory.title")}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <View style={styles.topContainer}>
        <DateTab
          startDate={dateDetails.startDate}
          onChangeDate={(date) => dateChangeHandler(date)}
        />

        <View style={styles.studentPod}>
          <DriverPod
            data={profileInfo}
            vehicle={vehicle}
            showDropDown={false}
            onTripHisPress={() => {}}
            onDetailsPress={() => {}}
          />
        </View>
      </View>
      {!isLoading ? (
        <ScrollView style={styles.list}>
          {trips?.length > 0 ? (
            <>
              <View style={{ marginVertical: "1%" }}>
                <Text
                  style={{ fontWeight: "600", fontSize: moderateScale(15) }}
                >
                  {trips.length} Trips found on{" "}
                  {moment(trips[0]?.startDate, "DD-MM-YYYY HH:mm:ss").format(
                    "DD MMM YYYY"
                  )}
                </Text>
              </View>
              <FlatList
                data={trips}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      NavigationService.navigate("TripDetails", {
                        vehicleData: item,
                      });
                    }}
                  >
                    <TripSummaryPod data={item} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            </>
          ) : errorStatus && trips?.startDate ? (
            <View>
              <NoResourceFound />
              <View style={styles.errorMsg}>
                <Text style={styles.extraBoldFont}>
                  No trips found on :{" "}
                  <Text
                    style={{
                      color: AppStyles.color.COLOR_DARK_GREY,
                      fontSize: moderateScale(18),
                    }}
                  >
                    {moment(dateDetails.startDate).format("DD MMM YYYY")}
                  </Text>
                </Text>
                <View style={styles.flexContainer}>
                  <Text style={styles.extraBoldFont}>Last Trip on : </Text>
                  <Text
                    style={{
                      fontWeight: "900",
                      fontSize: moderateScale(20),
                      color: AppStyles.color.COLOR_DARK_GREY,
                    }}
                  >
                    {moment(trips.startDate, "DD-MM-YYYY HH:mm:ss").format(
                      "DD MMM YYYY"
                    )}
                  </Text>
                </View>
                <Pressable onPress={showLastTrip}>
                  <View style={styles.buttonStyle}>
                    <Text
                      style={{
                        color: AppStyles.color.COLOR_WHITE,
                        fontSize: moderateScale(18),
                        fontWeight: "bold",
                      }}
                    >
                      Show Trip
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          ) : (
            <View></View>
          )}
        </ScrollView>
      ) : (
        <HudView />
      )}
    </>
  );
};

export default TripHistory;
