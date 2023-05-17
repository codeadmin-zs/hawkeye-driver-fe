import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale } from "react-native-size-matters";
import moment from "moment";
import { DatePickerCalender } from "./svgComponents";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const initialDate = new Date();
initialDate.setDate(initialDate.getDate() - 1);

//YYYY-MM-DD format
const formattedDate = initialDate.toLocaleDateString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});
console.log(formattedDate);


export const DateTab = ({ startDate, onChangeDate }) => {
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (startDate !== selectedDate) {
      setSelectedDate(startDate);
    }
  }, [startDate]);

  const setMoment = (noOfDays, previosDate) => {
    let subtractedDays = moment().subtract(noOfDays, "days");
    if (!previosDate) {
      subtractedDays = moment(selectedDate).subtract(noOfDays, "days");
    } else {
    }
    return {
      displayDate: subtractedDays.calendar(null, {
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
      actualDate: new Date(subtractedDays.format("YYYY-MM-DD")),
    };
  };

  let dateComponent = [];
  const dateComparison = moment(selectedDate).isSame(initialDate, "date");
  for (let i = 0; i <= 3; i++) {
    if (dateComparison && i === 0) {
      continue;
    }
    if (!dateComparison && i === 3) {
      continue;
    }
    const { displayDate, actualDate } = setMoment(i);

    const activeDate = moment(selectedDate).isSame(actualDate, "date");

    dateComponent.push(
      <View
        style={styles.DateElementStyle({ activeDate, grow: true })}
        key={actualDate}
      >
        <Text
          style={styles.DateTextStyle(activeDate)}
          onPress={async () => {
            await onChangeDate(actualDate);
            setSelectedDate(actualDate);
          }}
        >
          {displayDate}
        </Text>
      </View>
    );
  }
  let unchangedDate;
  const { displayDate, actualDate } = setMoment(1, true);
  const activeDate = moment(selectedDate).isSame(actualDate, "date");

  unchangedDate = (
    <View
      style={styles.DateElementStyle({ activeDate, grow: true })}
      key={actualDate}
    >
      <Text
        style={styles.DateTextStyle(activeDate)}
        onPress={async () => {
          await onChangeDate(actualDate);
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
