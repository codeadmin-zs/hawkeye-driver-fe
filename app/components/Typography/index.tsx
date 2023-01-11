/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {fonts} from '../../config/fonts';
import {utils} from '../../utils';

import {Title} from './Title';
// import {SectionTitle} from './SectionTitle';
// import {SubTitle} from './SubTitle';
// import {Paragraph} from './Paragraph';
// import {DetailTitle, Detail, DetailSubTitle, DetailDescription} from './Detail';

const h1FontSize = utils.device.s([22, 24]);
const h2FontSize = utils.device.s([18, 20]);
const h3FontSize = utils.device.s([16, 18]);
const h4FontSize = utils.device.s([14, 16]);
const h5FontSize = utils.device.s([12, 14]);
const h6FontSize = utils.device.s([10, 12]);
const bodyFontSize = 13;
const smallFontSize = utils.device.s([10, 13]);

const H = ({
  children,
  invert,
  textShadow = false,
  fontSize,
  style,
  onPress,
  numberOfLines = null,
  allowFontScaling = true,
}) => (
  <Text
    style={[
      {
        fontFamily: fonts.medium,
        color: '#000',
        // color: invert ? colors.black : colors.white,
        fontSize,
        textShadowColor: textShadow === true ? 'rgba(0, 0, 0, 0.6)' : null,
        textShadowOffset:
          textShadow === true ? {width: 0.5, height: 0.5} : null,
        textShadowRadius: textShadow === true ? 1 : null,
        ...style,
      },
    ]}
    onPress={onPress}
    allowFontScaling={allowFontScaling}
    numberOfLines={numberOfLines}>
    {children}
  </Text>
);

const H1 = props => (
  <H
    {...props}
    fontSize={h1FontSize}
    style={{fontFamily: fonts.medium, ...props.style}}
    textShadow={props.textShadow !== undefined}
  />
);
const H2 = props => (
  <H
    {...props}
    fontSize={h2FontSize}
    style={{fontFamily: fonts.medium, ...props.style}}
  />
);
const H3 = props => (
  <H
    {...props}
    fontSize={h3FontSize}
    style={{fontFamily: 'Poppins-SemiBold', ...props.style}}
  />
);
const H4 = props => (
  <H
    {...props}
    fontSize={h4FontSize}
    style={{
      lineHeight: utils.device.s([20, 23]),
      fontFamily: fonts.medium,
      ...props.style,
    }}
    textShadow={props.textShadow !== undefined}
  />
);
const H5 = props => (
  <H
    {...props}
    fontSize={h5FontSize}
    style={{fontFamily: fonts.medium, ...props.style}}
  />
);
const H6 = props => (
  <H
    {...props}
    fontSize={h6FontSize}
    style={{fontFamily: fonts.medium, ...props.style}}
  />
);

const H1Light = props => (
  <H
    {...props}
    fontSize={h1FontSize}
    style={{lineHeight: 32, fontFamily: fonts.regular, ...props.style}}
  />
);
const H2Light = props => (
  <H
    {...props}
    fontSize={h2FontSize}
    style={{lineHeight: 28, fontFamily: fonts.regular, ...props.style}}
  />
);
const H3Light = props => (
  <H
    {...props}
    fontSize={h3FontSize}
    style={{lineHeight: 24, fontFamily: fonts.regular, ...props.style}}
  />
);
const H4Light = props => (
  <H
    {...props}
    fontSize={h4FontSize}
    style={{lineHeight: 18, fontFamily: fonts.regular, ...props.style}}
  />
);
const H5Light = props => (
  <H
    {...props}
    fontSize={h5FontSize}
    style={{lineHeight: 16, fontFamily: fonts.regular, ...props.style}}
  />
);
const H6Light = props => (
  <H
    {...props}
    fontSize={h6FontSize}
    style={{lineHeight: 16, fontFamily: fonts.regular, ...props.style}}
  />
);

const Link = props => (
  <H
    {...props}
    fontSize={h5FontSize}
    onPress={props?.onPress}
    style={{
      fontFamily: fonts.semiBold,
      color: '#3043F1',
      textDecorationLine: 'underline',
      ...props.style,
    }}
  />
);

const Body = ({children, invert, style, allowFontScaling = true}) => (
  <Text
    style={[
      {
        fontFamily: fonts.medium,
        // color: invert ? colors.black : colors.white,
        fontSize: bodyFontSize,
        ...style,
      },
    ]}
    allowFontScaling={allowFontScaling}>
    {children}
  </Text>
);

const Small = ({children, invert, style, allowFontScaling = true}) => (
  <Text
    style={[
      {
        fontFamily: fonts.medium,
        // letterSpacing: -0.3,
        lineHeight: 23,
        // color: invert ? colors.black : colors.white,
        paddingBottom: 10,
        fontSize: smallFontSize,
        ...style,
      },
    ]}
    allowFontScaling={allowFontScaling}>
    {children}
  </Text>
);

export const Typography = {
  Title,
  // SectionTitle,
  // SubTitle,
  // Paragraph,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  H1Light,
  H2Light,
  H3Light,
  H4Light,
  H5Light,
  H6Light,
  Body,
  Link,
  Small,
  // DetailTitle,
  // Detail,
  // DetailSubTitle,
  // DetailDescription,
};
