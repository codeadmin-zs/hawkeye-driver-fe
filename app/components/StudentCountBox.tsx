import React, {FunctionComponent, ReactNode} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Dimensions from '../utils/helper';
import {Typography} from './Typography';
import StudentCount from './StudentCount';

const dim = Dimensions.Screen;

interface WithLogoHeaderProps {
  children: ReactNode;
}

const StudentCountBox: FunctionComponent<any> = props => {
  const {colors} = useTheme();
  const {totalcount= 10} = props;
  const styles = makeStyles(colors);

  return (
    <>
    <View style={styles.container}>
      <View style={styles.titleContainer}>
      <Typography.H1 >Total : {totalcount}</Typography.H1>
      </View>
    </View>
    <StudentCount boardedCount={30} notBoardedCount={5} yetBoardedCount={40}/>
    </>
  );
};

export default StudentCountBox;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: '92%',
      marginTop: '3%',
      elevaton: 30,
    },
    detailsContainer: {width: '100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
    titleContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'flex-start',
      margin:0
    },
  });
