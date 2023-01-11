import React from 'react';
import {View, FlatList} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

import NavigationService from 'app/navigation/NavigationService';
import {Header} from '../../components';
import LeftArrow from '../../assets/Svgs/LeftArrow.svg';
import {Typography} from '../../components/Typography';
import {MessagePod} from '../../components';

import styles from './styles';

const Messages: React.FC = () => {
  const goBack = () => NavigationService.goBack();
  const messageData = [
    {
      title: 'Annual day run through',
      message: 'Annual day in 23-12-2022',
      date: '16/11/2022',
    },
    {
      title: `Dress code on Children's day`,
      message: 'Dear Chempakite',
      date: '13/11/2022',
    },
    {
      title: 'Annual day run through',
      message: 'Annual day in 23-12-2022',
      date: '16/11/2022',
    },
    {
      title: 'Annual day run through',
      message: 'Annual day in 23-12-2022',
      date: '16/11/2022',
    },
  ];

  const onPress = () => {
    NavigationService.navigate('FullMessage');
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Messages'}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <View style={styles.messageContainer}>
        <FlatList
          style={{width: '100%'}}
          contentContainerStyle={{width: '100%', alignItems: 'center'}}
          data={messageData}
          renderItem={({item, index, separators}) => (
            <MessagePod
              onPress={onPress}
              key={index}
              messageTitle={item.title}
              messageType={'info'}
              message={item.message}
              date={item.date}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Messages;
