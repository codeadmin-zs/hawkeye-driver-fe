import React, {FunctionComponent, ReactNode} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Dimensions from '../utils/helper';
import {Typography} from './Typography';
import Logo from '../assets/Logo.svg';
import {moderateScale} from 'react-native-size-matters';

const dim = Dimensions.Screen;

interface WithLogoHeaderProps {
  children: ReactNode;
}

const Header: FunctionComponent<any> = props => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <SafeAreaView>
      <View style={styles.main}>
        <View style={[styles.contentContainer, {height: props?.height}]}>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={props.leftIconPress}>
            {props.leftIcon}
          </TouchableOpacity>
          <Typography.H4
            // numberOfLines={1}
            style={styles.headerTitle}>
            {props.title}
          </Typography.H4>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={props.rightIconPress}>
            {props.rightIcon}
          </TouchableOpacity>
        </View>
        {/* {props.rightIconProps && props.rightIconProps.notificationCount > 0 && (
          <TouchableOpacity
            style={styles.notificationCount}
            onPress={props.rightIconPress}>
            <Text style={styles.notificationCountText}>
              {props.rightIconProps.notificationCount}
            </Text>
          </TouchableOpacity>
        )} */}
      </View>
    </SafeAreaView>
  );
};

export default Header;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    main: {
      // height: moderateScale(70),
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      // paddingHorizontal: moderateScale(10),
      paddingVertical: '3%',
      // paddingBottom: moderateScale(20),
      // elevation: 2,
      backgroundColor: colors.primary,
    },
    contentContainer: {
      width: '92%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    container: {
      width: '92%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: moderateScale(18),
      fontWeight: '600',
      color: colors.surfaceBackground,
    },
    inputDataText: {
      height: '65%',
      elevation: moderateScale(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
      // marginBottom: moderateScale(20),
      backgroundColor: colors.primary, //
      paddingHorizontal: moderateScale(15),
      borderRadius: moderateScale(3),
    },
    // notificationCount: {
    //   zindex: 10,
    //   height: moderateScale(11),
    //   width: moderateScale(11),
    //   top: moderateScale(3),
    //   right: metrics.SCREEN_WIDTH * 0.035,
    //   position: 'absolute',
    //   borderRadius: 100,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   backgroundColor: AppStyles.colors.COLOR_RED,
    // },
    // notificationCountText: {
    //   color: AppStyles.colors.COLOR_WHITE,
    //   fontFamily: 'Poppins-Bold',
    //   fontSize: moderateScale(6),
    // },
  });
