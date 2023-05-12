import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, TouchableOpacity } from "react-native";
import { Button, TextInput, useTheme, IconButton } from "react-native-paper";
import BusIcon from "../../assets/Svgs/MyBus.svg";

import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../store/features/loading/slice";
import NavigationService from "app/navigation/NavigationService";
import { Header } from "../../components";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import UserIcon from "../../assets/Svgs/UserIcon.svg";
import { Typography } from "../../components/Typography";
import { t } from "../../i18n";
import { makeStyles } from "./styles";
import { getMyProfile } from "../../services/myProfile";
import { Text } from "react-native-svg";

const MyProfile: React.FC = ({ route }) => {
  const { profileInfo } = route.params;
  console.log("profileinfo.......", profileInfo);
 
  let address = "";
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.loading?.isLoading);

  const [profileData, setProfileData] = useState({});

  const goBack = () => NavigationService.goBack();

  return (
    <View style={styles.container}>
      <Header
        title={"My Profile"}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      {isLoading ? (
        <View style={styles.fullView}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <UserIcon />
            <Typography.H5Light style={{ paddingTop: 8 }}>
              {profileInfo?.name}
            </Typography.H5Light>
          </View>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <View style={styles.profileTitleBox}>
              <Typography.H5Light style={{ color: "#fff" }}>
                {t("profile.details")}
              </Typography.H5Light>
            </View>
            <View style={{ width: "50%" }} />
          </View>
          <View style={styles.textBoxContainer}>
            <TextInput
              label={t("general.mobileNum")}
              placeholder={t("general.mobileNum")}
              style={styles.textBox}
              value={profileInfo?.contact_number}
              editable={false}
            />
            <TextInput
              label={t("general.email")}
              placeholder={t("general.email")}
              style={styles.textBox}
              value={profileInfo?.email}
              editable={false}
            />
            <TextInput
              label={t("general.address")}
              placeholder={t("childProfile.address")}
              style={styles.textBox}
              value={profileInfo?.address}
              editable={false}
            />
            {/* <TextInput
              // label={t('general.address')}
              placeholder={t("childProfile.address")}
              style={styles.textBox}
              value={address}
            /> */}
            <TextInput
              label={t("general.schoolName")}
              placeholder={t("childProfile.schoolName")}
              style={styles.textBox}
              value={profileInfo?.schoolName}
              editable={false}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => NavigationService.navigate("MyBus")}>
                {/* <BusIcon style={styles.busIcon}/> */}
                <Typography.H5Light style={styles.buttonText}>
                  {t("general.busNo")}
                </Typography.H5Light>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default MyProfile;
