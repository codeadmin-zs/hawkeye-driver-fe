import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import moment from "moment";
import NavigationService from "app/navigation/NavigationService";
import { Header } from "../../components";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import UserIcon from "../../assets/Svgs/UserIcon.svg";
import { Typography } from "../../components/Typography";
import { StudentPod, HudView, MessageBox, DriverPod } from "../../components";
import { makeStyles } from "./styles";
import { Button } from "../../components/Buttons/button";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { t } from "../../i18n";
import { loadingActions } from "../../store/features/loading/slice";
import { useDispatch, useSelector } from "react-redux";
import { formatLeaveApiParams } from "../../utils/formatParams";
import { Picker } from "@react-native-picker/picker";
import { fonts } from "../../config/fonts";
import { applyDriverLeave, getLeavesData } from "../../services/driver";
import AppStyles from "app/config/styles";
const ApplyLeave: React.FC = ({ route }) => {
  const { driverData } = route.params;

  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.loading?.isLoading);
  const [leaveReason, setLeaveReason] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const [alreadyMarkedDates, setAlreadyMarkedDates] = useState({});
  const [showSuccess, setShowSuccess] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [absentType, setAbsentType] = useState("Sick");
  const [isFormValid, setIsFormValid] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [appliedLeaves, setAppliedLeaves] = useState([]);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  function validationFunc() {
    if (
      absentType &&
      leaveReason.length > 0 &&
      Object.keys(markedDates).length > 0 &&
      true
    ) {
      setIsFormValid(true);
      return true;
    } else {
      setIsFormValid(false);
      return false;
    }
  }
  const getSelectedDayEvents = (date) => {
    if (!startDate || (startDate && endDate)) {
      // if there's no start date selected, or if both start and end dates are selected
      setStartDate(date);
      setEndDate(null);
      setMarkedDates({
        [date]: { startingDay: true, color: "#00BFFF", date: date },
      });
    } else {
      // if there's already a start date selected
      const range = {
      };
      const endDateObj = new Date(date);
      const startDateObj = new Date(startDate);
      const days =
        (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24);

      for (let i = 1; i <= days; i++) {
        const tempDate = new Date(startDateObj);
        tempDate.setDate(tempDate.getDate() + i);
        const tempDateStr = tempDate.toISOString().slice(0, 10);
        const dates = Object.keys(alreadyMarkedDates);
        if (!dates.includes(tempDateStr)) {
          range[tempDateStr] = { color: "#00BFFF", date: tempDateStr };
        }
      }

      setEndDate(date);
      setMarkedDates({
        ...markedDates,
        ...range,
        [date]: { endingDay: true, color: "#00BFFF", date: date },
      });
    }
  };

  const goBack = () => {
    NavigationService.goBack();
  };
  const onApplyLeave = async () => {
    setShowWarning(false);
    const validationResult = validationFunc();
    if (validationResult) {
      dispatch(loadingActions.enableLoading());
      const formattedParams = formatLeaveApiParams(
        markedDates,
        driverData,
        leaveReason,
        absentType
      );

      const resp = await applyDriverLeave(driverData?.guid, formattedParams);
      dispatch(loadingActions.disableLoading());
      if (resp?.status === 201) {
        if (startDate && endDate) {
          setShowSuccess(
            `${absentType} Leave applied for ${startDate} to ${endDate} is successful.`
          );
        } else if (startDate) {
          setShowSuccess(
            `${absentType} Leave applied for ${startDate} is successful.`
          );
        }

        //Update markedDates state with the applied leave dates
        const appliedLeaveDates = Object.keys(markedDates);
        const updatedMarkedDates = {
          ...markedDates,
          ...appliedLeaveDates.reduce((acc, date) => {
            return {
              ...acc,
              [date]: { color: "pink", textColor: "white" },
            };
          }, {}),
        };
        setMarkedDates(updatedMarkedDates);
      } else if (resp?.status === 409) {
        setErrorStatus(true);
      }
    } else {
      setShowWarning(true);
    }
  };
  useEffect(() => {
    const getDriverLeaves = async () => {
      const leaveResponse = await getLeavesData();
      if (
        Array.isArray(leaveResponse?.body) &&
        leaveResponse?.body?.length > 0
      ) {
        setAppliedLeaves([leaveResponse.body]);
      }

      const leaveDates = leaveResponse.body.map((leave) => {
        const startDate = new Date(leave.start_date);

        const endDate = new Date(leave.end_date);
        const inBetweenDates = [];

        // Generate in-between dates
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          inBetweenDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        return {
          startDate,
          endDate,
          inBetweenDates,
        };
      });

      const updatedMarkedDates = leaveDates.reduce((acc, leave) => {
        const startDateFormat = moment(leave.startDate).format("YYYY-MM-DD");
        const endDateFormat = moment(leave.endDate).format("YYYY-MM-DD");

        const leaveDates = {
          ...acc,
          [startDateFormat]: {
            color: AppStyles.color.COLOR_RED_IDLE,
            textColor: "white",
            markingType: "period",
            disableTouchEvent: true,
          },
          [endDateFormat]: {
            color: AppStyles.color.COLOR_RED_IDLE,
            textColor: "white",
            markingType: "period",
            disableTouchEvent: true,
          },
        };

        const inBetweenDates = leave.inBetweenDates.reduce((dates, date) => {
          const formattedDate = moment(date).format("YYYY-MM-DD");
          return {
            ...dates,
            [formattedDate]: {
              color: AppStyles.color.COLOR_RED_IDLE,
              textColor: "white",
              markingType: "period",
              disableTouchEvent: true,
            },
          };
        }, {});

        return {
          ...leaveDates,
          ...inBetweenDates,
        };
      }, {});

      setAlreadyMarkedDates(updatedMarkedDates);
    };

    getDriverLeaves();
  }, []);
  return (
    <View style={styles.container}>
      <Header
        title={"Apply Leave"}
        leftIcon={<LeftArrow />}
        leftIconPress={goBack}
      />
      {isLoading && <HudView />}
      {showSuccess && (
        <MessageBox showMessage={true} label={"Close"} message={showSuccess} />
      )}
      {showWarning && (
        <MessageBox
          showMessage={!isFormValid}
          label={"Close"}
          message={`Please fill all the fields.`}
        />
      )}
      {errorStatus && (
        <MessageBox
          showMessage={true}
          label={"Close"}
          message={`You have already applied leave for this dates`}
        />
      )}

      <View style={styles.fillBox} />
      <View style={styles.StudentPodContainer}>
        <DriverPod data={driverData} />
      </View>

      <ScrollView
        style={{ top: "-4%" }}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.textBoxContainer}
      >
        <View style={{ width: "92%" }}>
          <Calendar
            markingType={"period"}
            markedDates={{ ...markedDates, ...alreadyMarkedDates }}
            onDayPress={(day) => {
              getSelectedDayEvents(day.dateString);
            }}
            theme={{
              selectedDayBackgroundColor: "#fff",
              selectedDayTextColor: "#222",
            }}
            initialDate={moment().format("YYYY-MM-DD")}
            minDate={moment().format("YYYY-MM-DD")}
            // Collection of dates that have to be marked. Default = {}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            flex: 1,
            paddingTop: "6%",
            width: "92%",
          }}
        >
          <View style={{ width: "100%" }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Typography.H4 style={{ textAlign: "left", paddingBottom: "2%" }}>
                {t("applyLeave.applyLeaveOn")}
                <Text style={{ color: "red" }}>{t("applyLeave.*")}</Text>:
              </Typography.H4>

              <FlatList
                data={Object.values(markedDates)}
                keyExtractor={(item, index) => index.toString()} // Provide a unique key for each item
                renderItem={({ item }) => (
                  <Typography.H4
                    style={{ textAlign: "right", marginBottom: "2%" }}
                  >
                    {moment(item.date).format("DD-MMM-YYYY")}
                  </Typography.H4>
                )}
              />
            </View>
            <View style={{ marginBottom: "2%" }}>
              <Typography.H4 style={{ textAlign: "left", paddingBottom: "2%" }}>
                {t("applyLeave.leaveType")}{" "}
                <Text style={{ color: "red" }}>{t("applyLeave.*")}</Text> :
              </Typography.H4>
              <Picker
                selectedValue={absentType}
                onValueChange={(itemValue) => {
                  setAbsentType(itemValue);
                }}
                mode={"dropdown"}
                style={{
                  backgroundColor: "white",
                  fontWeight: 600,
                  borderRadius: "2%",
                }}
              >
                <Picker.Item label="Sick" value="Sick" />
                <Picker.Item label="Casual" value="Casual" />
                <Picker.Item label="Emergency" value="Emergency" />
              </Picker>
            </View>
            <TextInput
              placeholder={t("general.reason")}
              style={styles.textInput}
              multiline={true}
              maxLength={256}
              onChangeText={(text) => {
                setLeaveReason(text);
                // validationFunc();
              }}
            />
            <Typography.H5Light
              style={{ textAlign: "right", color: "#3D3A3A" }}
            >{`${
              256 - leaveReason.length
            } charaters remaining`}</Typography.H5Light>
          </View>
          <Button.Primary
            style={{ marginTop: 25, paddingHorizontal: "10%", width: "98%" }}
            onPress={onApplyLeave}
          >
            <Text style={{ color: "#fff" }}>Apply Leave</Text>
          </Button.Primary>
        </View>
      </ScrollView>
    </View>
  );
};

export default ApplyLeave;
