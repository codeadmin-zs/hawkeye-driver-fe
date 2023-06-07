import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale } from "react-native-size-matters";
import moment from "moment";
import { DatePickerCalender } from "./svgComponents";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const initialDate = new Date();
initialDate.setDate(initialDate.getDate());

//YYYY-MM-DD FORMAT
const year = initialDate.getFullYear();
const month = initialDate.getMonth() + 1;
const day = initialDate.getDate();
const formattedMonth = month < 10 ? `0${month}` : month; // add leading zero if month is less than 10
const formattedDate = `${year}-${formattedMonth}-${day}`;

export const FutureDateTab = ({
  startDate,
  onChangeDate,
  isDateClickedOnce = false,
  setIsDateClickedOnce,
}) => {
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [openModal, setOpenModal] = useState(false);

  let unchangedDate;
  const dateComponent = [];

  useEffect(() => {
    if (startDate !== selectedDate) {
      setSelectedDate(startDate);
      console.log("startDate", startDate);
    }
  }, [startDate]);

  const setMoment = (noOfDays, previosDate) => {
    let addedDays = moment().add(noOfDays, "days");
    if (!previosDate) {
      addedDays = moment(selectedDate).add(noOfDays, "days");
    }
    return {
      displayDate: addedDays.calendar(null, {
        sameDay: "[Today]",
        nextDay: "[Tomorrow]",
        nextWeek: "MMM DD",
        lastDay: "[Yesterday]",
        lastWeek: "MMM DD",
        sameElse: (now) => {
          if (now.year() === moment(selectedDate).year()) {
            return "MMM DD";
          } else {
            return "MMM DD";
          }
        },
      }),
      actualDate: new Date(addedDays.format("YYYY-MM-DD")),
    };
  };

  const dateComparison = moment(selectedDate).isSame(initialDate, "date");
  for (let i = 0; i <= 3; i++) {
    if (dateComparison && i === 0) {
      continue;
    }
    if (!dateComparison && i === 3) {
      continue;
    }
    const { displayDate, actualDate } = setMoment(i);

    let activeDate;
     if (isDateClickedOnce) {
      activeDate = moment(selectedDate).isSame(actualDate, "date");
    } else {
      activeDate = false;
    }

    dateComponent.push(
      <View
        style={styles.DateElementStyle({ activeDate, grow: true })}
        key={actualDate}
      >
        <Text
          style={styles.DateTextStyle(activeDate)}
          onPress={async () => {
            await onChangeDate(actualDate);
            setIsDateClickedOnce(true);
            setSelectedDate(actualDate);
          }}
        >
          {displayDate}
        </Text>
      </View>
    );
  }
  const { displayDate, actualDate } = setMoment(0, true);
  let activeDate;
  if (isDateClickedOnce) {
    activeDate = moment(selectedDate).isSame(actualDate, "date");
  } else {
    activeDate = false;
  }

  unchangedDate = (
    <View
      style={styles.DateElementStyle({ activeDate, grow: true })}
      key={actualDate}
    >
      <Text
        style={styles.DateTextStyle(activeDate)}
        onPress={async () => {
          await onChangeDate(actualDate);
          setIsDateClickedOnce(true);
          setSelectedDate(actualDate);
        }}
      >
        {displayDate}
      </Text>
    </View>
  );

  return (
    <View style={styles.MainContainer}>
      <View style={styles.DateContainer}>
        <View style={styles.DateBarContainer}>
          {unchangedDate}
          {dateComponent}
          <View style={styles.CalenderElementStyle}>
            <TouchableOpacity
              onPress={() => {
                setOpenModal(true);
              }}
            >
              <DatePickerCalender width={19} height={18} iconColor="#505050" />
            </TouchableOpacity>
          </View>
        </View>
        <DateTimePickerModal
          isVisible={openModal}
          mode="date"
          date={new Date(selectedDate)}
          maximumDate={initialDate}
          customHeaderIOS="Pick a date"
          onConfirm={async (date) => {
            setOpenModal(false);
            setIsDateClickedOnce(true);
            await onChangeDate(date);
            setSelectedDate(date);
          }}
          onCancel={() => {
            setOpenModal(false);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: moderateScale(11),
    paddingBottom: moderateScale(11),
  },
  DateContainer: {
    width: "92%",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(5),
    flexDirection: "column",
    alignItems: "center",
  },

  DateBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  DateElementStyle: ({ activeDate, grow }) => {
    return {
      paddingHorizontal: "2%",
      paddingVertical: moderateScale(8),
      borderRightWidth: moderateScale(1),
      borderRightColor: "#909090",
      backgroundColor: activeDate ? "#0090D9" : null,
      flexGrow: grow ? 1 : 0,
      alignItems: "center",
    };
  },
  CalenderElementStyle: {
    paddingHorizontal: moderateScale(11),
    paddingVertical: moderateScale(9),
    flexGrow: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  DateTextStyle: (activeDate) => {
    return {
      fontFamily: "Poppins-Medium",
      fontSize: moderateScale(12),
      lineHeight: moderateScale(18),
      color: activeDate ? "#ffffff" : "#909090",
    };
  },
});
