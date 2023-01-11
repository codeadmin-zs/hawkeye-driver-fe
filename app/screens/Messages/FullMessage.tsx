import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, TextInput, useTheme} from 'react-native-paper';
import NavigationService from 'app/navigation/NavigationService';
import {Header} from '../../components';
import LeftArrow from '../../assets/Svgs/LeftArrow.svg';
import {Typography} from '../../components/Typography';
import {MessagePod} from '../../components';
import {moderateScale} from 'react-native-size-matters';

import commonStyles from './styles';

const FullMessage: React.FC = () => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const goBack = () => NavigationService.goBack();

  return (
    <View style={commonStyles.container}>
      <Header
        title={'Full Message'}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <View style={styles.fullMessageConatiner}>
        <MessagePod
          messageTitle={'Annual day run through'}
          messageType={'info'}
          date={'12-Jun-2022 2 : 30 AM'}
        />
        <View style={styles.rootContainer}>
          <Typography.H6Light>
            Full Message Text Lorem ipsum is a dummy text without any sense. It
            is a sequence of Latin words that, as they are positioned, do not
            form sentences with a complete sense, but give life to a test text
            useful to fill spaces that will subsequently be occupied from ad hoc
            texts composed by communication professionals.
          </Typography.H6Light>
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
    },
    fullMessageConatiner: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingHorizontal: '2%',
    },
  });
