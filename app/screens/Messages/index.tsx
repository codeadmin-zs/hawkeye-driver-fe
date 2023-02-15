import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Button, TextInput } from "react-native-paper";

import NavigationService from "app/navigation/NavigationService";
import { Header } from "../../components";
import LeftArrow from "../../assets/Svgs/LeftArrow.svg";
import { Typography } from "../../components/Typography";
import { MessagePod } from "../../components";
import { getMessages } from "../../services/message";
import moment from 'moment'; 
import styles from "./styles";

const Messages: React.FC = () => {
  const goBack = () => NavigationService.goBack();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const _getMessages = async () => {
      const resp = await getMessages();

      setMessages(resp?.body);
    };

    _getMessages();
  }, []);

  
  const onPress = (item:any) => {
    NavigationService.navigate("FullMessage",{data:item});
  };

  return (
    <View style={styles.container}>
      <Header
        title={"Messages"}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <View style={styles.messageContainer}>
        {messages?.length > 0 ? (
          <FlatList
            style={{ width: "100%" }}
            contentContainerStyle={{ width: "100%", alignItems: "center" }}
            data={messages}
            renderItem={({ item, index, separators }) => (
              <MessagePod
                onPress={()=>onPress(item)}
                key={index}
                messageTitle={item.subject}
                messageType={"info"}
                message={item.content}
                date={moment(item.created_on,'HH:mm:ss').format('hh:mm A')}
              />
            )}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Messages;
