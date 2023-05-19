import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text
} from "react-native";
import { useTheme } from "react-native-paper";

import NavigationService from "app/navigation/NavigationService";
import { Header, HolidayPod } from "../../components";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import CalendarIcon from "../../assets/Svgs/Calendar.svg";
import CalendarListIcon from "../../assets/Svgs/CalendarList.svg";
import { Typography } from "../../components/Typography";
import { loadingActions } from "../../store/features/loading/slice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

import { makeStyles } from "./styles";
import { getHolidaysList, getEventsList } from "../../services/holiday";
import { t } from "../../i18n";
import { moderateScale } from "react-native-size-matters";
import AppStyles from "app/config/styles";

const HolidayList: React.FC = () => {
  const [holidayList, setHolidayList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [showEventCalender, setShowEventCalender] = useState(false);
  const [showHolidayCalender, setShowHolidayCalender] = useState(false);
  const [markedHolidays, setMarkedHolidays] = useState({});
  const [markedEvents, setMarkedEvents] = useState({});
  const [holidayText, setHolidayText] = useState("");
  const [eventText, setEventText] = useState("");
  const [selectedDate, setSelectedDate] = React.useState(
    moment().format("YYYY-MM-DD")
  );

  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loading?.isLoading);
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const currentDay = moment().format("YYYY-MM-DD");
  const dateDisplay= moment().format("DD-MM-YYYY");

  const markedCurrentDate = {
    [currentDay]: {
      selected: true,
      selectedColor: AppStyles.color.COLOR_MEDIUM_DARK_BLUE,
      selectedTextColor: "#FFFFFF",
    },
  };

  useEffect(() => {
    let markedEventDates: any = {};
    let markedHolidayDates: any = {};
    if (Array.isArray(holidayList) && holidayList?.length > 0) {
      holidayList?.forEach((holiday) => {
        markedHolidayDates[holiday.holiday_on] = {
          selected: true,
          selectedColor: AppStyles.color.COLOR_RED_IDLE,
          // selectedColor: "green",
          selectedTextColor: "#FFFFFF",
          selectedHolidayText: holiday?.text,
        };
      });
    }

    if (Array.isArray(eventList) && eventList?.length > 0) {
      eventList?.forEach((event) => {
        markedEventDates[event.event_on] = {
          selected: true,
          selectedColor: AppStyles.color.COLOR_RED_IDLE,
          selectedTextColor: "#FFFFFF",
          selectedEventText: event?.text,
        };
      });
    }

    setMarkedHolidays(markedHolidayDates);
    setMarkedEvents(markedEventDates);
  }, [eventList, holidayList]);

  useEffect(() => {
    dispatch(loadingActions.enableLoading());
    let holidayResponse = null;
    let eventResponse = null;

    const fetchData = async () => {
      holidayResponse = await getHolidaysList();
      console.log("holidayResponse", holidayResponse);
      eventResponse = await getEventsList();
      console.log("eventResponse", eventResponse);

      dispatch(loadingActions.disableLoading());
      if (
        Array.isArray(holidayResponse?.body) &&
        holidayResponse?.body?.length > 0
      ) {
        setHolidayList(holidayResponse?.body);
      }

      if (
        Array.isArray(eventResponse?.body) &&
        eventResponse?.body?.length > 0
      ) {
        setEventList(eventResponse?.body);
      }
    };
    fetchData();
  }, []);

  const goBack = () => NavigationService.goBack();

  return (
    <View style={styles.container}>
      <Header
        title={"Holiday List"}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.holidayHeader}>
          <Typography.H1 style={{ paddingRight: "2%", top: "1%" }}>
            {t("holidays.title")}
          </Typography.H1>
          <TouchableOpacity
            onPress={() => setShowHolidayCalender(!showHolidayCalender)}
          >
            {showHolidayCalender ? <CalendarListIcon /> : <CalendarIcon />}
          </TouchableOpacity>
          </View>
          <View>
          <Typography.H4>{dateDisplay}</Typography.H4>

          </View>

        </View>
        {showHolidayCalender ? (
          <Calendar
            initialDate={moment().format("YYYY-MM-DD")}
            markedDates={{...markedCurrentDate,...markedHolidays}}
            markingType={"multi-dot"}
            onDayPress={(day) => {
              const holidayText =
                markedHolidays?.[day.dateString]?.selectedHolidayText;
              if (holidayText) {
                setHolidayText(
                  markedHolidays?.[day.dateString]?.selectedHolidayText
                );
              } else {
                setHolidayText("");
              }
            }}
            theme={{
              selectedDayBackgroundColor: "#fff",
              selectedDayTextColor: "#222",
            }}
          />
        ) : isLoading ? (
          <View style={styles.fullView}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{ alignItems: "center" }}
            data={holidayList}
            renderItem={({ item, index, separators }) => (
              <HolidayPod
                type={"holiday"}
                text={item.text}
                date={
                  item.holiday_on &&
                  moment(item.holiday_on).format("DD-MM-YYYY")
                }
              />
            )}
          />
        )}
        {holidayText?.length > 0 && (
          <View style={styles.messageText}>
            <Typography.H5>{holidayText}</Typography.H5>
          </View>
        )}
        <View style={styles.headerContainerEvents}>
          <Typography.H1 style={{ paddingRight: "2%", top: "1%" }}>
            {t("holidays.events")}
          </Typography.H1>
          <TouchableOpacity
            onPress={() => setShowEventCalender(!showEventCalender)}
          >
            {showEventCalender ? <CalendarListIcon /> : <CalendarIcon />}
          </TouchableOpacity>
        </View>
        {showEventCalender ? (
          <Calendar
            markingType={"multi-dot"}
            markedDates={{...markedCurrentDate,...markedEvents}}
            onDayPress={(day) => {
              const eventText =
                markedEvents?.[day.dateString]?.selectedEventText;
              if (eventText) {
                setEventText(markedEvents?.[day.dateString]?.selectedEventText);
              } else {
                setEventText("");
              }
            }}
            theme={{
              selectedDayBackgroundColor: "#fff",
              selectedDayTextColor: "#222",
            }}
           
          />
        ) : isLoading ? (
          <View style={styles.fullView}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{ alignItems: "center" }}
            data={eventList}
            renderItem={({ item, index, separators }) => (
              <HolidayPod
                type={"events"}
                text={item.text}
                date={
                  item.event_on && moment(item.event_on).format("DD-MM-YYYY")
                }
              />
            )}
          />
        )}
        {eventText?.length > 0 && (
          <View style={styles.messageText}>
            <Typography.H5>{eventText}</Typography.H5>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HolidayList;
