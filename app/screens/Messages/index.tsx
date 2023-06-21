import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Button, TextInput } from "react-native-paper";

import NavigationService from "app/navigation/NavigationService";
import { Header, HudView, NoResourceFound } from "../../components";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import { Typography } from "../../components/Typography";
import { MessagePod } from "../../components";
import {
  getMessages,
  oneMessageRead,
  allMessageRead,
} from "../../services/message";
import moment from "moment";
import styles from "./styles";
import SearchHeader from "../../components/SearchHeader";

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
      console.log("messageresponse", response);
      setNotices(response.body);
      console.log("guid of notice", response?.body[0]?.guid);
      // function handleClick(guid) {
      // // function handleClick(e) {
      //   async function markMessageAsRead() {
      //     setIsLoading(true);
      //     const messageReadRes = await oneMessageRead(guid);
      //     console.log("messageRead", messageReadRes);
          // Do something with the messageReadRes
        // }
        // markMessageAsRead();
    

      // const messageReadRes=await oneMessageRead(response?.body?.guid)
      // console.log("messageRead",messageReadRes);

      //transforming data here to make search algo work
      const transformedData = response?.body?.map((item) => {
        console.log('item:', item);
        return {
          subject: item?.subject,
          content: item?.content,
          created_on: moment(item.created_on)?.format("DD-MMM-YYYY h:mm A"),
          guid: item?.guid,
          readStatus:item?.readStatus,
        };
      });
      console.log("transformedData", transformedData);
      console.log("readstatus",transformedData.subject);
      
      setMessages(transformedData);
      setFilteredData(transformedData);
      setIsLoading(false);
    }
    fetchMessage();
  }, []);


  // const onPress = (item) => {
  //   NavigationService.navigate("FullMessage", { data: item });
  // };

  const searchHandler = (input) => {
    if (input.length === 0) {
      console.log("searchText", input);
      setFilteredData(messages);
      return;
    }

    console.log("searchText", input);

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

    console.log("filteredData", filteredData);

    setFilteredData(filteredData);
  };

  function handleClick(item) {
    console.log("ittttte",item);
    NavigationService.navigate("FullMessage", { data: item });
    async function markMessageAsRead() {
      const messageReadRes = await oneMessageRead(item?.guid);
      console.log("messageRead", messageReadRes);  
    }
    markMessageAsRead();
  }

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
            <FlatList
              style={{ width: "100%" }}
              contentContainerStyle={{ width: "100%", alignItems: "center" }}
              data={filteredData.length > 0 ? filteredData : []}
              renderItem={({ item, index, separators }) => (
                <MessagePod
                  onPress={() => handleClick(item)}
                  // onPress={() => handleClick(item.guid)}
                  // onPress={(e) => handleClick(e)}
                  key={index}
                  messageTitle={item?.subject}
                  messageType={"info"}
                  message={item.content}
                  date={item?.created_on}
                  readStatus={item?.readStatus}
                />
              )}
            />
          ) : (
            <NoResourceFound title={"No message Found"} />
          )}
        </View>
      )}
    </View>
  );
};



export default Messages;
