import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {VehicleInfoStyles} from '.';

 const VehicleOdoInfo = ({totalKms, currentSpeed, currentFuel}) => {
  if (totalKms || currentSpeed || currentFuel) {
    return (
      <View style={VehicleInfoStyles.InnerContainers}>
        <View style={styles.OdoContainer}>
          {totalKms || totalKms === 0 ? (
            <Text style={styles.OdoText}>{`${totalKms} Kms`}</Text>
          ) : null}
          {currentSpeed || currentSpeed === 0 ? (
            <Text style={styles.OdoText}>{`Speed ${currentSpeed} km/h`}</Text>
          ) : null}
          {currentFuel || currentFuel === 0 ? (
            <Text style={styles.OdoText}>{`${currentFuel} L`}</Text>
          ) : null}
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default VehicleOdoInfo

const styles = StyleSheet.create({
  OdoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(231, 231, 231, 0.5)',
    borderRadius: moderateScale(5),
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
  },
  OdoText: {
    fontSize: moderateScale(12),
    fontFamily: 'Poppins-Medium',
    fontWeight: '400',
    color: '#505050',
  },
});
