import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import * as loginActions from "app/store/actions/loginActions";
import NavigationService from "app/navigation/NavigationService";
import styles from "./styles";
import UserDetailsInfo from "./components/UserDetailsInfo";
import WithLogoMenuHeader from "../../components/WithLogoMenuHeader";
import Dimensions from "../../utils/helper";
import { Typography } from "../../components/Typography";
import Track from "../../assets/Svgs/Track.svg";
import Schedule from "../../assets/Svgs/Schedule.svg";
import MyProfile from "../../assets/Svgs/MyProfile.svg";
import Children from "../../assets/Svgs/Children.svg";
import Messages from "../../assets/Svgs/Messages.svg";
import Holiday from "../../assets/Svgs/Holiday.svg";
import MyBus from "../../assets/Svgs/MyBus.svg"
import { TrackerHistoryIcon } from "app/components/svgComponents";
import { t } from "../../i18n";
import { getDriverDetails } from "../../services/driver";
import { profileActions } from "app/store/features/profile/slice";
import { loadingActions } from "app/store/features/loading/slice";
import AppStyles from "app/config/styles";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../services/myProfile";
import { moderateScale } from "react-native-size-matters";

const dim = Dimensions.Screen;
const scaledWidth = moderateScale(36);
const scaledHeight = moderateScale(36);

const Home: React.FC = () => {
  const onLogout = () => dispatch(loginActions.logOut());
  useEffect(() => {
    dispatch(loadingActions.enableLoading());
    dispatch(profileActions.profileDetailsRequest());
  }, []);

  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.loading?.isLoading);
  const [profileData, setProfileData] = useState({});
  const goBack = () => NavigationService.goBack();

  useEffect(() => {
    let response = null;
    const fetchData = async () => {
      const response = await getDriverDetails();
      console.log("======response",response);
      
      setProfileData(response?.body);
    };
    fetchData();
  }, []);
  const MenuData = [
    {
      title: t("home.track"),
      bgColor: "#FBE151",
      iconBgColor: "#DAC241",
      textColor: "#000",
      onPress: () => NavigationService.navigate("BusList", { profileInfo: profileData }),
      iconName: "Track",
      icon: <Track />,
    },
    {
      title: t("home.pickUpSchedule"),
      bgColor: "#8E8E77",
      iconBgColor: "#C6C6A0",
      textColor: "#fff",
      onPress: () =>
        NavigationService.navigate("PickupBusList", { navType: "pickup",profileInfo: profileData }),
      iconName: "Schedule",
      icon: <Schedule />,
    },
    {
      title: t("home.myProfile"),
      bgColor: "#39CCC3",
      iconBgColor: "#26ACA4",
      textColor: "#fff",
      onPress: () =>
        NavigationService.navigate("MyProfile", { profileInfo: profileData }),
      iconName: "MyProfile",
      icon: <MyProfile />,
    },
      {
        title: t("home.myBus"),
        bgColor: "#E97A73",
        iconBgColor: "#CD6059",
        textColor: "#fff",
        onPress: () => NavigationService.navigate("MyBusList",{profileInfo: profileData}),
        iconName: "MyBus",
        icon: <MyBus />,
      },
    {
      title: t("home.messages"),
      bgColor: "#4767BB",
      iconBgColor: "#6F8FE1",
      textColor: "#fff",
      onPress: () => NavigationService.navigate("Messages"),
      iconName: "Messages",
      icon: <Messages />,
    },
    {
      title: t("home.holidayList"),
      bgColor: "#5DD261",
      iconBgColor: "#3EB843",
      textColor: "#fff",
      onPress: () => NavigationService.navigate("HolidayList"),
      iconName: "Holiday",
      icon: <Holiday />,
    },
    // {
    //   title: t("home.applyLeave"),
    //   bgColor: "#5DD261",
    //   iconBgColor: "#3EB843",
    //   textColor: "#fff",
    //   onPress: () => NavigationService.navigate("HolidayList"),
    //   iconName: "Holiday",
    //   icon: <Holiday />,
    // },
    {
      title: t("home.trips"),
      bgColor: "#ad60d1",
      iconBgColor: "#913eb8",
      textColor: "#fff",
      onPress: () =>
        NavigationService.navigate("TripHistory", { profileInfo: profileData}),
      iconName: "TripHistory",
      icon: (
        <TrackerHistoryIcon
          width={scaledWidth}
          height={scaledHeight}
          stroke={AppStyles.color.COLOR_BLACK}
        />
      ),
    },
  ];

  return (
    <View style={styles.container}>
    <WithLogoMenuHeader />
    <UserDetailsInfo userName={profileData?.name} />
    <Typography.H5 style={{ color: "red", textAlign: "center" }}>
      {`Your Bus ${t("home.busArrivalMsg")}`}
    </Typography.H5>
    <Typography.Link
      style={{ textAlign: "center",color: AppStyles.color.COLOR_SECONDARY_BLUE,textDecorationLine: "none"}}
      onPress={() =>
        NavigationService.navigate("ApplyLeave",{driverData:profileData})
      }
    >
      {t("home.applyLeave")}
      </Typography.Link>
      <FlatList
        style={styles.tileContainer}
        contentContainerStyle={styles.tileContentContainer}
        data={MenuData}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity
            style={[styles.menuTileStyle, { backgroundColor: item.bgColor }]}
            onPress={item.onPress}
          >
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: item.iconBgColor },
              ]}
            >
              {item.icon}
            </View>
            <Typography.H5Light
              style={{
                ...styles.menuTitle,
                color: item.textColor,
                paddingHorizontal: "2%",
              }}
            >
              {item.title}
            </Typography.H5Light>
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </View>
  );
};

export default Home;
