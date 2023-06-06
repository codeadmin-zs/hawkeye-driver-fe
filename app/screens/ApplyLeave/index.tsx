import React, { useState } from "react";
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
import { StudentPod, HudView, MessageBox } from "../../components";
import { makeStyles } from "./styles";
import { Button } from "../../components/Buttons/button";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { t } from "../../i18n";
import { loadingActions } from "../../store/features/loading/slice";
import { useDispatch, useSelector } from "react-redux";
import { formatLeaveApiParams } from "../../utils/formatParams";
import { Picker } from "@react-native-picker/picker";
import { fonts } from "../../config/fonts";
import { applyDriverLeave } from "../../services/driver";

const ApplyLeave: React.FC = ({ route }) => {
  const { driverData } = route.params;

  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.loading?.isLoading);
  const [leaveReason, setLeaveReason] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [absentType, setAbsentType] = useState("Sick");
  const [isFormValid, setIsFormValid] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");

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
        range[tempDateStr] = { color: "#00BFFF", date: tempDateStr };
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
        setShowSuccess(true);
      } else if (resp?.status === 409) {
        setErrorStatus(resp?.body?.detail);
      }
    } else {
      setShowWarning(true);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title={"Apply Leave"}
        leftIcon={<LeftArrow />}
        leftIconPress={goBack}
      />
      {isLoading && <HudView />}

      <MessageBox
        showMessage={showSuccess}
        label={"Close"}
        message={`${absentType} Leave applied for ${startDate} to ${endDate} is successful.`}
      />
      {showWarning && (
        <MessageBox
          showMessage={!isFormValid}
          label={"Close"}
          message={`Please fill all the fields.`}
        />
      )}
      {errorStatus?.length > 0 && (
        <MessageBox showMessage={true} label={"Close"} message={errorStatus} />
      )}

      <View style={styles.fillBox} />
      <View style={styles.StudentPodContainer}>
        <StudentPod data={driverData} />
      </View>

      <ScrollView
        style={{ top: "-4%" }}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.textBoxContainer}
      >
        <View style={{ width: "92%" }}>
          <Calendar
            markingType={"period"}
            markedDates={markedDates}
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
                Apply leave on <Text style={{ color: "red" }}>*</Text>:
              </Typography.H4>
              <FlatList
                data={Object.values(markedDates)}
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
                Leave Type <Text style={{ color: "red" }}>*</Text> :
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
