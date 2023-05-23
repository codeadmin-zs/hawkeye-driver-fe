import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
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
import { applyLeave } from "../../services/children";
import { loadingActions } from "../../store/features/loading/slice";
import { useDispatch, useSelector } from "react-redux";

const ApplyLeave: React.FC = ({ route }) => {
  console.log("reached apply leave page");
  const { childData } = route.params;
  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.loading?.isLoading);
  const [leaveReason, setLeaveReason] = useState("");
  const [selectedDate, seSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const getSelectedDayEvents = (date) => {
    let markedDates = {};
    markedDates[date] = {
      selected: true,
      selectedColor: "#00B0BF",
      selectedTextColor: "#FFFFFF",
    };
    let serviceDate = moment(date);
    serviceDate = serviceDate.format("DD.MM.YYYY");
    seSelectedDate(serviceDate);
    setMarkedDates(markedDates);
  };
  const goBack = () => {NavigationService.goBack();}
  const onApplyLeave =  async() => {
    
    const resp =   await applyLeave(childData?.guid, selectedDate, leaveReason);
    if(resp?.status === 201){
      setShowSuccess(true);
    }

  // console.log("markedDates", markedDates);
  const goBack = () => {
    NavigationService.goBack();
  };
  const onApplyLeave = async () => {
    try {
      setShowWarning(false);
      const validationResult = validationFunc();
      if (validationResult) {
        dispatch(loadingActions.enableLoading());
        const formattedParams = formatLeaveApiParams(
          markedDates,
          // childData,
          driverData,
          leaveReason,
          absentType
        );
        console.log("formattedParams", formattedParams);

        const resp = await applyDriverLeave(driverData?.guid, formattedParams);
        dispatch(loadingActions.disableLoading());
        console.log("ressppp==", resp);
        if (resp?.status === 201) {
          // console.log("ressppp==", resp);
          setShowSuccess(true);
        } else if (resp?.status === 409) {
          setErrorStatus(resp?.body?.detail);
          console.log("reached the error part");
        }
      } else {
        setShowWarning(true);
      }
    } catch (error) {
      console.log("error", error);
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
        message={`Leave application on ${selectedDate} is successful.`}
      />
      <View style={styles.fillBox} />
      <View style={styles.StudentPodContainer}>
        <StudentPod data={childData} />
      </View>

      <ScrollView
        style={{ top: "-4%" }}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.textBoxContainer}
      >
        <View style={{ width: "92%" }}>
          <Calendar
            markingType={"multi-dot"}
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
                Apply leave on :
              </Typography.H4>
              <Typography.H4
                style={{
                  textAlign: "left",
                  paddingBottom: "2%",
                  paddingLeft: "20%",
                }}
              >
                {moment(selectedDate, "DD.MM.YYYY").format("DD-MMM-YYYY")}
              </Typography.H4>
            </View>
            <TextInput
              placeholder={t("general.reason")}
              style={styles.textInput}
              multiline={true}
              maxLength={256}
              onChangeText={(text) => setLeaveReason(text)}
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
}

export default ApplyLeave;
