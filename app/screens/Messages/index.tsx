import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TurboModuleRegistry,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { t } from "app/i18n";
import NavigationService from "app/navigation/NavigationService";
import { Header, HudView, NoResourceFound } from "../../components";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import { Typography } from "../../components/Typography";
import { MessagePod } from "../../components";
import AppStyles from "app/config/styles";
import {
  getMessages,
  oneMessageRead,
  allMessageRead,
} from "../../services/message";
import moment from "moment";
import styles from "./styles";
import SearchHeader from "../../components/SearchHeader";
import { moderateScale } from "react-native-size-matters";

const Messages: React.FC = () => {
  const goBack = () => NavigationService.goBack();

  const [notices, setNotices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMessage() {
      setIsLoading(true);
      const response = await getMessages();
      setNotices(response.body);

      //transforming data here to make search algo work
      const transformedData = response?.body?.map((item) => {
        return {
          subject: item?.subject,
          content: item?.content,
          created_on: moment(item.created_on)?.format("DD-MMM-YYYY h:mm A"),
          guid: item?.guid,
          readStatus: item?.readStatus,
        };
      });

      setMessages(transformedData);
      setFilteredData(transformedData);
      setIsLoading(false);
    }
    fetchMessage();
  }, []);

  const searchHandler = (input) => {
    if (input.length === 0) {
      setFilteredData(messages);
      return;
    }

    const filteredData = messages.filter((msg) => {
      for (const detail in msg) {
        if (
          msg[detail]
            .toLowerCase()
            .includes(input.toLowerCase().trim().replace(/\s/g, ""))
        ) {
          return msg;
        }
      }
    });

    setFilteredData(filteredData);
  };

  function handleClick(item) {
    NavigationService.navigate("FullMessage", { data: item });
    async function markMessageAsRead() {
      const messageReadRes = await oneMessageRead(item?.guid);

      const updatedData = filteredData.map((data) => {
        if (data.guid === item.guid) {
          return {
            ...data,
            readStatus: true,
          };
        } else return data;
      });
      setFilteredData(updatedData);
    }
    markMessageAsRead();
  }

  const handleMarkAllRead = async () => {
    const markAllRead = await allMessageRead();
    const updatedData = filteredData.map((item) => {
      return {
        ...item,
        readStatus: true,
      };
    });

    setFilteredData(updatedData);
  };

  return (
    <View style={styles.container}>
      <Header
        title={"Messages"}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <SearchHeader
        isClicked={isClicked}
        searchText={searchText}
        setSearchText={setSearchText}
        setIsClicked={setIsClicked}
        searchHandler={searchHandler}
      />

      {isLoading ? (
        <HudView />
      ) : (
        <View style={styles.messageContainer}>
          {filteredData?.length > 0 ? (
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                position: "relative",
                paddingTop: moderateScale(15),
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 0,
                  top: moderateScale(14),
                }}
              >
                <Typography.H5Light
                  style={{
                    color: AppStyles.color.COLOR_SECONDARY_BLUE,
                    paddingBottom: moderateScale(12),
                    marginRight: moderateScale(20),
                  }}
                  onPress={() => handleMarkAllRead()}
                >
                  {t("general.markAllAsRead")}
                </Typography.H5Light>
              </TouchableOpacity>
              <FlatList
                contentContainerStyle={{
                  width: "100%",
                  padding: moderateScale(15),
                  marginTop: moderateScale(10),
                  flexGrow: 1,
                  paddingBottom: moderateScale(40),
                }}
                data={filteredData.length > 0 ? filteredData : []}
                renderItem={({ item, index, separators }) => (
                  <MessagePod
                    onPress={() => handleClick(item)}
                    key={index}
                    messageTitle={item?.subject}
                    messageType={"info"}
                    message={item.content}
                    date={item?.created_on}
                    readStatus={item?.readStatus}
                  />
                )}
              />
            </View>
          ) : (
            <NoResourceFound title={"No message Found"} />
          )}
        </View>
      )}
    </View>
  );
};

export default Messages;
