import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {utils} from '../../utils';
import {fonts} from '../../config/fonts';
// import { colors, fonts } from '../../constants';
// import { TypographyProps } from '../../types';

export function Title({
  children,
  textShadow = false,
  fontSize = utils.device.s([25, 35]),
  invert = false,
  numberOfLines = null,
  allowFontScaling = true,
  textAlign = 'left',
  translationKey,
  color = '#000',
}: any) {
  const styles = StyleSheet.create({
    subTitle: {
      // fontSize: utils.device.s([25, 35]),
      fontFamily: fonts.medium,
      // color: invert ? colors.black : colors.white,
      color,
      textShadowColor: textShadow === true ? 'rgba(0, 0, 0, 0.6)' : undefined,
      textShadowOffset:
        textShadow === true ? {width: 0.5, height: 0.5} : undefined,
      textShadowRadius: textShadow === true ? 1 : undefined,
      textAlign,
      marginBottom: 10,
    },
  });

  return (
    <Text
      style={[styles.subTitle, {fontSize}]}
      allowFontScaling={allowFontScaling}
      numberOfLines={numberOfLines}>
      {translationKey ? translationKey : children}
    </Text>
  );
}
