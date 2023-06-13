import moment from "moment";
export function formatLeaveApiParams(
  markedDates,
  //   childData,
  driverData,
  reason,
  absentType
) {
    
  const dateArr = Object.values(markedDates); // because, the incoming 'markedDates' is an object of objects

  //extracting the start date and end date
  const [startDateObj] = dateArr.filter((item) => item.startingDay === true);
  const [endDateObj] = dateArr.filter((item) => item.endingDay === true);
  // to handle single date selections
  //also, if user clicks on a single date twice, the startingDay becomes endingDay in the incoming data.
  
 
  if (dateArr.length === 1) {
    if (startDateObj) {
      startDateObj.date = moment(startDateObj.date).format(
        "YYYY-MM-DD 00:00:00"
      );
      driverData.start_date = startDateObj.date;
      driverData.end_date = startDateObj.date;
    } else if (endDateObj) {
      endDateObj.date = moment(endDateObj.date).format("YYYY-MM-DD 23:59:59");
      driverData.start_date = endDateObj.date;
      driverData.end_date = endDateObj.date;
    }
  } 
  else if (dateArr.length > 1) {  //when multiple dates are selected
    startDateObj.date = moment(startDateObj.date).format("YYYY-MM-DD 00:00:00");
    endDateObj.date = moment(endDateObj.date).format("YYYY-MM-DD 23:59:59");
    driverData.start_date = startDateObj.date;
    driverData.end_date = endDateObj.date;
  }

  driverData.reason = reason;
  function getAbsentType(absentType) {
    if (absentType === "Sick") return 0;
    else if (absentType === "Casual") return 1;
    else if (absentType === "Emergency") return 2;
  }
  driverData.absent_type = getAbsentType(absentType);

  return {
    ...(driverData.guid ? { guid: driverData.guid } : {}),

    ...(driverData.name ? { name: driverData.name } : {}),

    ...(driverData.group ? { group: driverData.group } : {}),

    ...(driverData.start_date ? { start_date: driverData.start_date } : {}),

    ...(driverData.end_date ? { end_date: driverData.end_date } : {}),

    ...(driverData.absent_type === 0 || driverData.absent_type
      ? { absent_type: driverData.absent_type }
      : {}),

    ...(driverData.reason ? { reason: driverData.reason } : {}),
  };
}
