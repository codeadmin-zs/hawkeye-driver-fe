import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {utils} from '../../utils';
import {fonts} from '../../config/fonts';

export interface TypographyProps {
  children: any;
  textShadow?: boolean;
  invert?: boolean;
  numberOfLines?: number;
  allowFontScaling?: boolean;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  style?: any;
}

export function SectionTitle({
  children,
  textShadow = false,
  invert = false,
  numberOfLines = null,
  allowFontScaling = true,
  textAlign = 'left',
  style,
}: TypographyProps) {
  const styles = StyleSheet.create({
    subTitle: {
      lineHeight: utils.device.s([20, 24]),
      fontSize: utils.device.s([20, 22]),
      fontFamily: fonts.medium,
      color: '#000',
      textShadowColor: textShadow === true ? 'rgba(0, 0, 0, 0.6)' : undefined,
      textShadowOffset:
        textShadow === true ? {width: 0.5, height: 0.5} : undefined,
      textShadowRadius: textShadow === true ? 1 : undefined,
      textAlign,
      marginBottom: 10,
      ...style,
    },
  });

  return (
    <Text
      style={styles.subTitle}
      allowFontScaling={allowFontScaling}
      numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}
