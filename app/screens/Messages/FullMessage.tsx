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
import commonStyles from './styles';

const FullMessage: React.FC = (props:any) => {
  const {colors} = useTheme();
  const {data} = props.route.params;
  
  const styles = makeStyles(colors);

  const goBack = () => NavigationService.goBack();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessages();
        setMessages(response?.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const onPressMessage = (item: any) => {
    NavigationService.navigate("FullMessage", { data: item });
  };

  return (
    <View style={styles.container}>
      <Header
        title={"Messages"}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <View style={styles.fullMessageConatiner}>
        <MessagePod
          messageTitle={data.subject}
          messageType={'info'}
          date={moment(data.created_on,'HH:mm:ss').format('hh:mm A')}
        />
        <View style={styles.rootContainer}>
          <Typography.H5Light style={{paddingHorizontal:'2%',paddingVertical: '4%',lineHeight: 23}}>
            {data?.content}
          </Typography.H5Light>
        </View>
      </View>
    </View>
  );
};
export default FullMessage;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    rootContainer: {
      elevaton: 30,
      width: '100%',
      backgroundColor: colors.surfaceBackground,
      borderRadius: moderateScale(5),
      marginVertical: '1%',
      padding: '2%',
      height: '80%'
    },
    fullMessageConatiner: {
      width: '100%',
      paddingHorizontal: '2%',
    },
  });

