import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {utils} from '../../utils';
import {fonts} from '../../config/fonts';
import {TypographyProps} from '../../types';

export function SubTitle({
  children,
  textShadow = false,
  invert = false,
  numberOfLines = null,
  allowFontScaling = true,
  textAlign = 'left',
  translationKey,
  styles,
}: TypographyProps) {
  const styled = StyleSheet.create({
    subTitle: {
      lineHeight: utils.device.s([20, 23]),
      fontSize: utils.device.s([14, 18]),
      fontFamily: fonts.medium,
      color: '#000',
      textShadowColor: textShadow ? 'rgba(0, 0, 0, 0.6)' : null,
      textShadowOffset: textShadow ? {width: 0.5, height: 0.5} : null,
      textShadowRadius: textShadow ? 1 : null,
      textAlign,
      marginBottom: 10,
      ...styles,
    },
  });

  return (
    <Text
      style={styled.subTitle}
      allowFontScaling={allowFontScaling}
      numberOfLines={numberOfLines}>
      {translationKey ? translationKey : children}
    </Text>
  );
}
