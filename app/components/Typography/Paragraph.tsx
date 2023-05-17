import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {utils} from '../../utils';

export interface TypographyProps {
  children: any;
  textShadow?: boolean;
  invert?: boolean;
  numberOfLines?: number;
  allowFontScaling?: boolean;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
}

export function Paragraph({
  children,
  textShadow = false,
  invert = false,
  allowFontScaling = true,
  textAlign = 'left',
}: TypographyProps) {
  const styles = StyleSheet.create({
    text: {
      lineHeight: utils.device.s([20, 24]),
      fontSize: utils.device.s([13, 16]),
      textShadowColor: textShadow === true ? 'rgba(0, 0, 0, 0.6)' : undefined,
      textShadowOffset:
        textShadow === true ? {width: 0.5, height: 0.5} : undefined,
      textShadowRadius: textShadow === true ? 1 : undefined,
      textAlign,
      marginBottom: 20,
    },
  });

  return (
    <Text style={styles.text} allowFontScaling={allowFontScaling}>
      {children}
    </Text>
  );
}
