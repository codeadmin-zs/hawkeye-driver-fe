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
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';

const AbsentDays: React.FC = ({route}) => {
  const {leavesData,childData} = route.params;
  
  const [isParentDetails, setIsParentDetails] = useState(false);
  const {colors} = useTheme();
  const styles = makeStyles(colors, isParentDetails);

  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <Header
        title={'Absent Days'}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <View style={styles.fillBox} />
      <View style={styles.StudentPodContainer}>
        <StudentPod data={childData} />
      </View>
      <View style={{paddingHorizontal: '4%', top: '-4%'}}>
        <Typography.H4 style={{color: '#000'}}>
          {`Total Absent : ${leavesData?.length} days`}
        </Typography.H4>
      </View>
      <View style={styles.textBoxContainer}>
        {leavesData?.length > 0 &&
          leavesData.map(item => {
            return (
              <>
                <Typography.H5 style={styles.absentDateText}>
                  {moment(item?.absent_on).format('DD-MMM-YYYY')}
                </Typography.H5>
                <Typography.H5 style={styles.absentReasonText}>
                  {item?.reason}
                </Typography.H5>
                <View style={styles.line}/>
              </>
            );
          })}
      </View>
    </View>
  );
};

export default AbsentDays;
