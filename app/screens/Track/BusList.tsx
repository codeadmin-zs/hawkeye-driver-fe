import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, TextInput, useTheme} from 'react-native-paper';
import NavigationService from 'app/navigation/NavigationService';
import {Header} from '../../components';
import LeftArrow from '../../assets/Svgs/LeftArrow.svg';
import {Typography} from '../../components/Typography';
import {BusPod} from '../../components';
import {moderateScale} from 'react-native-size-matters';

import commonStyles from './styles';

const BusList: React.FC = () => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const goBack = () => NavigationService.goBack();

  return (
    <View style={styles.container}>
      <Header
        title={'Bus list'}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <View style={styles.contentContainer}>
        <BusPod
          busNumber={'Bus 16'}
          time={'7:58 AM'}
          plateNumber={'KL 15-A 1'}
          attendandName={'Saji'}
          driverName={'Rajeevan'}
          onPress={() => NavigationService.navigate('Track')}
        />
        <BusPod
          busNumber={'Bus 17'}
          time={'8:10 AM'}
          plateNumber={'KL 15-A 3'}
          attendandName={'Revathi'}
          driverName={'Roopesh'}
          onPress={() => NavigationService.navigate('Track')}
        />
      </View>
    </View>
  );
};

export default BusList;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      width: '100%',
      padding: '4%',
    },
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
