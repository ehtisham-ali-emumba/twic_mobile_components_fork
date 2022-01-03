import * as React from 'react';
import styled from 'styled-components/native';
import { propOr } from 'ramda';
import { Text } from 'react-native';
import { APP_CONSTANTS, Colors, Fonts } from '../commons';

const FONT_WEIGHT = APP_CONSTANTS.IS_ANDROID ? '400' : 'bold';
const FONT_SIZE = APP_CONSTANTS.IS_ANDROID ? Fonts.size.small : Fonts.size.medium;

export const _Text = (props) => (
  <Text maxFontSizeMultiplier={1.1} {...props}>
    {props.children}
  </Text>
);
/*
 * TEXTS STYLED COMPONENTS
 */
type AppTextProps = {
  color?: string; //Colors
  paddingTop?: number; //pixels
  paddingLeft?: number; //pixels
  paddingRight?: number; //pixels
  paddingBottom?: number; //pixels
  marginTop?: number; //pixels
  textAlign?: 'left' | 'right' | 'center';
  fontWeight?: string;
  fontSize?: string | number;
  textDecorationLine?: string;
  textTransform?: 'lowercase' | 'uppercase' | 'full-width' | 'inherit' | 'capitalize' | 'none';
  width?: number | 'auto';
  testID?: string;
  accessibilityLabel?: string;
};
export const AppText = styled(_Text)<AppTextProps>`
  padding-top: ${(props) => propOr(0, 'paddingTop')(props)};
  padding-left: ${(props) => propOr(0, 'paddingLeft')(props)};
  padding-right: ${(props) => propOr(0, 'paddingRight')(props)};
  padding-bottom: ${(props) => propOr(0, 'paddingBottom')(props)};
  margin-top: ${(props) => propOr(0, 'marginTop')(props)};
  font-size: ${(props) => propOr(FONT_SIZE, 'fontSize', props)};
  font-family: TTCommons-Regular;
  font-weight: ${(props) => propOr('300', 'fontWeight')(props)};
  color: ${(props) => propOr(Colors.primaryText, 'color', props)};
  text-decoration-line: ${(props) => propOr('none', 'textDecorationLine')(props)};
  text-transform: ${(props) => propOr('none', 'textTransform', props)};
  width: ${(props) => propOr('auto', 'width', props)};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign}` : '')}
`;

type AppHeading = {
  color?: string; //Colors
  paddingTop?: number;
  paddingBottom?: number;
  paddingRight?: number; //pixels
  textTransform?: 'lowercase' | 'uppercase' | 'full-width' | 'inherit' | 'capitalize';
  width?: number;
  textDecorationLine?: string;
  textAlign?: string;
  fontSize?: number;
  fontWeight?: number | string;
  testID?: string;
  accessibilityLabel?: string;
};

export const AppHeading = styled(_Text)<AppHeading>`
  padding-top: ${(props) => propOr(5, 'paddingTop', props)};
  padding-bottom: ${(props) => propOr(0, 'paddingBottom', props)};
  font-size: ${(props) => propOr(FONT_SIZE, 'fontSize', props)};
  padding-right: ${(props) => propOr(0, 'paddingRight')(props)};
  font-weight: ${(props) => propOr(FONT_WEIGHT, 'fontWeight')(props)};
  font-family: TTCommons-DemiBold;
  color: ${(props) => propOr(Colors.primaryText, 'color', props)};
  text-transform: ${(props) => propOr('none', 'textTransform', props)};
  text-decoration-line: ${(props) => propOr('none', 'textDecorationLine')(props)};
  text-align: ${(props) => propOr('left', 'textAlign', props)};
  width: ${(props) => propOr('auto', 'width', props)};
`;

type TransparentButtonsBorderType = {
  borderRadius?: number;
  borderColor?: string;
};

export const TransparentButtonsBorder = (options?: TransparentButtonsBorderType) => {
  const { borderRadius = 4, borderColor = Colors.lightBoxShadowGrey } = options || {};
  return `
  border-right-width: 1;
  border-left-width: 1;
  border-bottom-width: 1;
  border-top-width: 0.25;
  border-radius: ${borderRadius};
  border-color: ${borderColor}`;
};

/* 
  ELEMENT SHADOW
*/
type AddElementShadowType = {
  shadowColor?: string;
  backgroundColor?: string;
  shadowOffset?: string;
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
};
export const AddElementShadow = (options?: AddElementShadowType): string => {
  const { shadowColor = Colors.charcoalDarkGrey, shadowOffset = '0px 2px', shadowOpacity = 0.4, shadowRadius = 1, elevation = 2, backgroundColor = Colors.white } = options || {};
  return `
    background-color: ${backgroundColor};
    shadow-color: ${shadowColor};
    shadow-offset: ${shadowOffset};
    shadow-opacity: ${shadowOpacity};
    shadow-radius: ${shadowRadius};
    elevation: ${elevation};
  `;
};
