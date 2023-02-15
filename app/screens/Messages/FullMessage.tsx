import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, TextInput, useTheme} from 'react-native-paper';
import NavigationService from 'app/navigation/NavigationService';
import {Header} from '../../components';
import LeftArrow from '../../assets/Svgs/LeftArrow.svg';
import {Typography} from '../../components/Typography';
import {MessagePod} from '../../components';
import {moderateScale} from 'react-native-size-matters';
import moment from 'moment'; 
import commonStyles from './styles';

const FullMessage: React.FC = (props:any) => {
  const {colors} = useTheme();
  const {data} = props.route.params;
  
  const styles = makeStyles(colors);

  const goBack = () => NavigationService.goBack();

  return (
    <View style={commonStyles.container}>
      <Header
        title={'Message'}
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
      // alignItems: 'center',
      // justifyContent: 'center',
      width: '100%',
      paddingHorizontal: '2%',
    },
  });
