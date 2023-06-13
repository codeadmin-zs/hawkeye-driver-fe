import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';

import NavigationService from 'app/navigation/NavigationService';
import {Header} from '../../components';
import LeftArrow from '../../assets/Svgs/LeftArrow.svg';
import UserIcon from '../../assets/Svgs/UserIcon.svg';
import {Typography} from '../../components/Typography';
import {StudentPod} from '../../components';
import {makeStyles} from './styles';
import {Button} from '../../components/Buttons/button';
import {AttendanceBox} from '../../components';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const AttendanceSheet: React.FC = ({route}) => {
  const {driverData} = route.params;
  const [isParentDetails, setIsParentDetails] = useState(false);
  const {colors} = useTheme();
  const styles = makeStyles(colors, isParentDetails);

  const goBack = () => NavigationService.goBack();
  const gotoAbsentDays = () =>
    NavigationService.navigate('AbsentDays', {driverData});
  return (
    <View style={styles.container}>
      <Header
        title={'Attendance Sheet'}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <View style={styles.fillBox} />
      <View style={styles.StudentPodContainer}>
        <StudentPod data={driverData} />
      </View>
      <ScrollView
        style={{top: '-4%'}}
        contentContainerStyle={styles.textBoxContainer}>
        <View style={{width: '92%', alignSelf: 'center'}}>
          <Calendar
          // Collection of dates that have to be marked. Default = {}
          />
        </View>
        <Typography.H4 style={{paddingLeft: '4%', marginTop: '10%'}}>
          Working Days : 21
        </Typography.H4>
        <View style={styles.attendanceBoxContainer}>
          <AttendanceBox
            bgColor={'#32CB71'}
            textColor={'#000'}
            count={17}
            label={'Present'}
          />
          <AttendanceBox
            onPress={gotoAbsentDays}
            bgColor={'#FF0000'}
            count={7}
            label={'Absent'}
            textColor={'#fff'}
          />
          <AttendanceBox
            bgColor={'#0F7CFF'}
            count={5}
            label={'Holiday'}
            textColor={'#fff'}
          />
        </View>

        <Typography.H4 style={{paddingLeft: '4%', marginTop: '10%'}}>
          Total Working Days So far : 123
        </Typography.H4>
        <View style={styles.attendanceBoxContainer}>
          <AttendanceBox
            bgColor={'#32CB71'}
            textColor={'#000'}
            count={17}
            label={'Present'}
          />
          <AttendanceBox
            bgColor={'#FF0000'}
            count={7}
            label={'Absent'}
            textColor={'#fff'}
            onPress={gotoAbsentDays}
          />
          <AttendanceBox
            bgColor={'#0F7CFF'}
            count={5}
            label={'Holiday'}
            textColor={'#fff'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AttendanceSheet;
