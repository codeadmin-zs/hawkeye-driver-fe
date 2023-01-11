import React, {useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {Button, useTheme} from 'react-native-paper';

import NavigationService from 'app/navigation/NavigationService';
import {Header} from '../../components';
import LeftArrow from '../../assets/Svgs/LeftArrow.svg';
import UserIcon from '../../assets/Svgs/UserIcon.svg';
import {Typography} from '../../components/Typography';
import {TrackPod,StudentCountBox} from '../../components';
import {moderateScale} from 'react-native-size-matters';
import StartTrackIcon from '../../assets/Svgs/StartTrackIcon.svg';
import StopTrackIcon from '../../assets/Svgs/El1.svg';
import Dot from '../../assets/Svgs/Dot.svg';
import {TabButton} from '../../components/Buttons/TabButton';
import MapView, {
  Marker,
  Polyline,
  Callout,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Dimensions from '../../utils/helper';
import {makeStyles} from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import { t } from '../../i18n';

const dim = Dimensions.Screen;

const Track: React.FC = () => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const [showMap, setShowMap] = useState(false);
  const [showSatellite, setShowSatellite] = useState(false);
  const Data = [
    {
      stopName: 'School',
      time: 'ETA : 8.00 AM',
      textColor: colors.primary,
      etaColor: '#000',
    },
    {
      stopName: 'Kariyam',
      time: 'ETA : 7.50 AM',
      textColor: colors.primary,
      etaColor: '#000',
    },
    {
      stopName: 'Sreekaryam',
      time: 'ETA : 7.45 AM',
      textColor: colors.primary,
      etaColor: '#000',
    },
    {
      stopName: 'Pothencode',
      time: 'ETA : 7.40 AM',
      textColor: colors.primary,
      etaColor: '#000',
    },
    {
      stopName: 'Ulloor',
      time: 'ETA : 7.30 AM',
      textColor: colors.primary,
      etaColor: '#000',
    },
    {
      stopName: 'Kesavadasapuram',
      time: 'ETA : 7.20 AM',
      textColor: '#EC0000',
      etaColor: '#000',
    },
    {
      stopName: 'LIC Jn',
      time: 'ETA : 7.15 AM',
      textColor: colors.primary,
      etaColor: '#000',
    },
    {
      stopName: 'Pattom',
      time: 'ETA : 7.10 AM',
      textColor: colors.primary,
      etaColor: '#000',
    },
    {
      stopName: 'Kuravankonam',
      time: 'ETA : 7.00 AM',
      textColor: colors.primary,
      etaColor: '#000',
    },
    {
      stopName: 'Kowdiar',
      time: 'ETA : 6.55 AM',
      textColor: colors.primary,
      etaColor: '#000',
    },
    {
      stopName: 'Vellayambalam',
      time: 'ETA : 6.50 AM',
      textColor: colors.primary,
      etaColor: '#000',
    },
    {
      stopName: 'Vazhuthacaud',
      time: 'ETA : 6.45 AM',
      textColor: colors.passive,
      etaColor: colors.passive,
    },
    {
      stopName: 'DPI',
      time: 'ETA : 6.35 AM',
      textColor: colors.passive,
      etaColor: colors.passive,
    },
    {
      stopName: 'Jagathy',
      time: 'ETA : 6.30 AM',
      textColor: colors.passive,
      etaColor: colors.passive,
    },
  ];

  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <Header
        title={t('track.title')}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <View style={styles.contentContainer}>
        <View style={styles.podContainer}>
          <TrackPod />
        </View>
        <View style={styles.tabButtonBox}>
          <TabButton
            Label={t('track.mapView')}
            textColor={showMap ? colors.primary : colors.passive}
            borderWidth={showMap ? 3 : 1}
            borderColor={showMap ? colors.primary : colors.passive}
            onPress={() => setShowMap(true)}
            height={moderateScale(40)}
          />
          <TabButton
            Label={t('track.listView')}
            height={moderateScale(40)}
            textColor={showMap ? colors.passive : colors.primary}
            borderWidth={showMap ? 1 : 3}
            borderColor={showMap ? colors.passive : colors.primary}
            onPress={() => setShowMap(false)}
          />
        </View>
        <View style={{width:'100%',alignItems:'center'}}>
        <StudentCountBox/>
        </View>

        {showMap ? (
          <View style={{width: '100%'}}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              initialRegion={{
                latitude: 8.524139,
                longitude: 76.936638,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={{
                height: '100%',
                width: '100%',
              }}>
              <Marker coordinate={{latitude: 8.524139, longitude: 76.936638}} />
            </MapView>
          </View>
        ) : (
          <ScrollView
            style={{height: dim.height * 0.6}}
            contentContainerStyle={{}}>
            <View style={styles.dataContainer}>
              <View style={styles.Marker}>
                <StartTrackIcon
                  width={moderateScale(15)}
                  height={moderateScale(23)}
                  fill={'#0090D9'}
                />
                <View style={styles.Line} />
                <StopTrackIcon
                  width={moderateScale(20)}
                  height={moderateScale(20)}
                  fill={'#0090D9'}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  paddingBottom: '3.2%',
                }}>
                {Data.map(item => (
                  <View
                    style={{
                      marginVertical: '1%',
                      borderBottomWidth: 1,
                      borderBottomColor: colors.passive,
                      marginRight: '8%',
                    }}>
                    <Typography.H5 style={{color: item.textColor}}>
                      {item.stopName}
                    </Typography.H5>
                    <Typography.H6 style={{color: item.etaColor}}>
                      {item.time}
                    </Typography.H6>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Track;
