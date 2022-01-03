import * as React from 'react';
import { View, Platform } from 'react-native';
import styled from 'styled-components/native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import * as Animatable from 'react-native-animatable';
import { If } from 'react-if';
import { propOr, prop } from 'ramda';

import { APP_CONSTANTS, Colors, Fonts, Metrics } from '../commons';
import { _Text } from './AppStyledComponents';
import BoxShadow from './BoxShadow';

const buttonWidth = Metrics.screenWidth - Metrics.screenHorizontalPadding * 2;
const smallButtonWidth = buttonWidth / 2;
interface ButtonContainerType {
  fullWidth?: boolean;
  buttonColor?: string;
  width?: number | 'auto' | string;
  buttonShadowColor?: string;
}

const ButtonContainer = styled(View)<ButtonContainerType>`
  width: ${(props) => (props.fullWidth ? buttonWidth : prop('width', props))};
  height: ${Metrics.section * 2 + Metrics.smallMargin};
  padding-horizontal: ${Metrics.baseMargin + 2};
  padding-vertical: ${Metrics.baseMargin + 2};
  border-radius: ${Metrics.baseMargin};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => propOr(Colors.primary, 'buttonColor', props)};
`;
interface ButtonLabelType {
  buttonLabelColor?: string;
}

const ButtonLabel = styled(_Text)<ButtonLabelType>`
  font-size: ${Fonts.size.medium};
  color: ${(props) => propOr(Colors.white, 'buttonLabelColor', props)};
  font-family: TTCommons-DemiBold;
  font-weight: ${Platform.OS === 'android' ? '400' : 'bold'};
  text-align: center;
`;

const ButtonIcon = styled(EvilIcon)`
  font-size: ${Fonts.size.h1};
  color: ${Colors.white};
  font-weight: bold;
  text-align: center;
`;
const ButtonLoaderIcon = () => (
  <Animatable.View iterationCount={'infinite'} animation="rotate">
    <ButtonIcon name="spinner-3" />
  </Animatable.View>
);

export interface PrimaryButtonType {
  buttonLabel: string;
  buttonColor?: string;
  buttonShadowColor?: string;
  fullWidth?: boolean;
  width?: number | 'auto' | string;
  activeOpacity?: number;
  onClickHandler(): void;
  disabled?: boolean;
  loading?: boolean;
  buttonStyle?: object;
  labelStyle?: object;
  shadowOptions?: object;
  shadowContainerStyle?: object;
  customIcon?: () => any;
  testId?: string;
  disabledColor?: string;
}
export const PrimaryButton = (props: PrimaryButtonType) => {
  const {
    buttonLabel = 'Save',
    customIcon = () => {},
    fullWidth = false,
    width = smallButtonWidth,
    onClickHandler,
    disabled = false,
    loading = false,
    buttonColor = Colors.primary,
    buttonShadowColor,
    buttonStyle,
    labelStyle,
    shadowOptions = {},
    shadowContainerStyle = {},
    testId = '',
    disabledColor = Colors.disabled,
  } = props;

  const ButtonContent = () => {
    return (
      <ButtonContainer fullWidth={fullWidth} width={width} buttonColor={disabled ? disabledColor : buttonColor} buttonShadowColor={buttonShadowColor || buttonColor} style={buttonStyle}>
        <If condition={Boolean(customIcon)}>{customIcon()}</If>
        <If condition={loading}>
          <ButtonLoaderIcon />
        </If>
        <If condition={!loading}>
          <ButtonLabel style={labelStyle}>{buttonLabel}</ButtonLabel>
        </If>
      </ButtonContainer>
    );
  };

  return (
    <View testID={disabled ? `${testId}-disabled` : testId} accessibilityLabel={disabled ? `${testId}-disabled` : testId}>
      <BoxShadow
        shadowOptions={{
          ...APP_CONSTANTS.PRIMARY_BUTTON_SHADOW,
          shadowColor: disabled ? disabledColor : buttonColor,
          backgroundColor: buttonColor,
          borderBottomColor: buttonColor,
          bottom: 4,
          ...shadowOptions,
        }}
        contentWrapperStyle={{
          shadowColor: disabled ? disabledColor : buttonColor,
          shadowOffset: '0px 2px',
          shadowOpacity: 0.75,
          shadowRadius: 2,
          elevation: 2,
          backgroundColor: disabled ? disabledColor : buttonColor,
          borderRadius: 10,
          alignItems: 'flex-end',
        }}
        otherOptions={{
          alignSelf: 'center',
        }}
        shadowContainerStyle={shadowContainerStyle}
        onPress={onClickHandler}
        disabled={disabled}
      >
        <ButtonContent />
      </BoxShadow>
    </View>
  );
};
