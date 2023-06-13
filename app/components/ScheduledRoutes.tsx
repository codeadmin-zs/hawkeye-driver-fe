import React from 'react';
import {View,} from 'react-native';
import { Typography } from "app/components/Typography";
import { t } from "app/i18n";
import { moderateScale } from "react-native-size-matters";
import AppStyles from "app/config/styles";
import moment from "moment";

 const renderRouteHeader = (routeName, startDate, endDate, repeatedDays) => {
    if (repeatedDays) {
      return (
        <View
          style={{
            marginTop: moderateScale(8),
            marginBottom: moderateScale(4),
          }}
        >
          <Typography.H5>{routeName}</Typography.H5>
          <Typography.H6 style={{ color: AppStyles.color.COLOR_DARK_BLUE }}>
            {t("myBus.scheduleEvery")}
            {repeatedDays.replace(/,/g, ", ")}
          </Typography.H6>
        </View>
      );
    } else {
      return (
        <View
          style={{
            marginTop: moderateScale(8),
            marginBottom: moderateScale(4),
          }}
        >
          <Typography.H5>{routeName}</Typography.H5>
          <Typography.H6 style={{ color: AppStyles.color.COLOR_DARK_BLUE }}>
            {t("myBus.schedule")} - {moment(startDate).format("DD-MMM-YYYY")}{" "}
            {t("myBus.to")} {moment(endDate).format("DD-MMM-YYYY")}
          </Typography.H6>
        </View>
      );
    }
  };

const ScheduledRoutes = () => {
  return (
    <div>ScheduledRoutes</div>
  )
}

export default ScheduledRoutes