import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { utils } from '../../utils';
import { colors, fonts } from '../../constants';
import { TypographyProps } from '../../types';
import { ERLTypography } from './index';

export const DetailTitle = ({ title, invert = true }) => (
  <View style={{ padding: 10, borderRadius: 4, backgroundColor: colors.lavender }}>
    <ERLTypography.Body
      invert={invert}
      style={{ paddingBottom: 0, fontFamily: fonts.semiBold, fontSize: 16 }}>
      {title}
    </ERLTypography.Body>
  </View>
);

export const Detail = ({ title, description, invert = true }) => (
  <View style={{ padding: 10 }}>
    <DetailSubTitle title={title} invert={invert} />
    <DetailDescription title={description} invert={invert} />
  </View>
);

export const DetailSubTitle = ({ title, invert = true }) => (
  <ERLTypography.Body
    invert={invert}
    style={{ paddingBottom: 0, fontSize: 11, opacity: 0.5, fontFamily: fonts.semiBold }}>
    {title.toUpperCase()}
  </ERLTypography.Body>
);

export const DetailDescription = ({ title, invert = true }) => (
  <ERLTypography.Body invert={invert} style={{ paddingBottom: 0, fontSize: 15 }}>
    {title}
  </ERLTypography.Body>
);
