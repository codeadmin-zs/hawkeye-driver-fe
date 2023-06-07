import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import NavigationService from "app/navigation/NavigationService";
import { Header, SearchBox } from "../../components";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import UserIcon from "../../assets/Svgs/UserIcon.svg";
import { Typography } from "../../components/Typography";
import { StudentPod, NoResourceFound, StudentCount } from "../../components";
import { loadingActions } from "../../store/features/loading/slice";
import { getChildrens } from "../../services/children";

import { makeStyles } from "./styles";
import { t } from "i18next";

const Children: React.FC = ({ route }) => {
  const { navType } = route.params;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [childrensData, setChildrensData] = useState({});
  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.loading?.isLoading);

  useEffect(() => {
    dispatch(loadingActions.enableLoading());
    let response = null;
    const fetchData = async () => {
      response = await getChildrens();
      dispatch(loadingActions.disableLoading());
      setChildrensData(response?.body);
    };
    fetchData();
  }, []);

  const goBack = () => NavigationService.goBack();

  const gotoDetails = (item) => {
    switch (navType) {
      case "profile":
        NavigationService.navigate("ChildProfile", { childeInfo: item });
        break;
      case "track":
        NavigationService.navigate("BusList", { childeInfo: item });
        break;
      case "pickup":
        NavigationService.navigate("PickupSchedule", { childeInfo: item });
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={t("students.title")}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <SearchBox />
      <StudentCount
        boardedCount={30}
        notBoardedCount={5}
        yetBoardedCount={40}
      />
      {isLoading ? (
        <View style={styles.fullView}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <View style={{ width: "100%" }}>
          {childrensData?.length > 0 ? (
            <FlatList
              style={{ width: "100%", paddingVertical: 10 }}
              contentContainerStyle={{ width: "92%", alignSelf: "center" }}
              data={childrensData}
              renderItem={({ item, index, separators }) => (
                <StudentPod
                  data={item}
                  index={index}
                  onPress={() => gotoDetails(item)}
                />
              )}
            />
          ) : (
            <NoResourceFound />
          )}
        </View>
      )}
    </View>
  );
};

export default Children;
