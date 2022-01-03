import * as React from 'react';
import { Keyboard, Platform, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import { isEmpty, path } from 'ramda';
import { If } from 'react-if';

import { Colors, Fonts, Metrics, Utilities } from '../commons';
import { _Text } from './AppStyledComponents';

const { isEmptyOrNil } = Utilities;

type InputContainerProps = {
  marginBottom?: number;
  marginTop?: number;
  paddingHorizontal?: number;
};
const ErrorInputContainer = styled(View)<InputContainerProps>`
  flex-direction: row;
`;

const InputErrorText = styled((props) => <_Text {...props} />)`
  color: ${Colors.error};
  font-size: ${Fonts.size.small};
  font-family: TTCommons-Regular;
`;

const TEXT_INPUT_THEME = {
  fonts: {
    medium: {
      fontFamily: 'TTCommons-Regular',
    },
  },
  colors: {
    primary: Colors.blue,
    error: Colors.error,
    disabled: Colors.newDimGrey,
    placeholder: Colors.newDimGrey,
    text: Colors.black,
  },
  roundness: Metrics.baseMargin,
};
export type InputFieldProps = {
  label: string | undefined;
  value: string;
  inputMode?: 'outlined' | 'flat' | undefined;
  disabled?: boolean;
  errorMessage?: string;
  placeholder?: string;
  multiLine?: boolean;
  setRef?(value: any): void;
  onChangeHandler(value: any): void;
  onBlurHandler?(value: any): void;
  onFocusHandler?(value: any): void;
  onSubmitEditing?(value: any): void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  rightIconName?: string;
  rightIconComponent?(): React.ReactElement;
  //styling props
  InputStyle?: Object;
  textProps?: Object;
  iconProps?: Object;
  showInputLinkComponent?: boolean;
  InputLinkComponent?(): React.ReactElement;
  inputFieldStyle?: object;
  disabledInputStyle?: object;
  prefix?: string;
  testId?: string;
  leftCustomIcon?: string | ((e?: any) => React.ReactElement);
  leftCustomIconProps?: {};
  customErrorContainerStyle?: {};
};

export const InputField = (props: InputFieldProps) => {
  const [colors, setColors] = React.useState({ icon: Colors.charcoalLightGrey });
  const inputFieldRef = React.useRef(null);
  const {
    label = '',
    placeholder = '',
    value = '',
    inputMode = 'outlined',
    disabled = false,
    onChangeHandler,
    setRef = undefined,
    onBlurHandler = () => {},
    onFocusHandler = () => {},
    onSubmitEditing = () => {},
    errorMessage = '',
    prefix = '',
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    showInputLinkComponent = false,
    InputLinkComponent = () => <></>,
    rightIconName = '',
    rightIconComponent,
    multiLine = false,
    testId = '',

    //styling props
    inputFieldStyle,
    textProps = {},
    iconProps = {},
    leftCustomIcon,
    leftCustomIconProps = {},
    customErrorContainerStyle = {},
  } = props;

  const iconColor = disabled ? Colors.disabledText : colors.icon;
  React.useEffect(() => {
    const keyboardDidHide = () => {
      if (Platform.OS === 'android') {
        Keyboard.dismiss();
        const onBlurHandler = path(['current', 'input', 'blur'], inputFieldRef) as Function;
        if (typeof onBlurHandler === 'function') onBlurHandler();
      }
    };
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
  }, []);

  const ShowPrefixComponent = () => {
    if (leftCustomIcon) {
      return <TextInput.Icon name={leftCustomIcon} size={20} color={!isEmptyOrNil(errorMessage) ? Colors.error : iconColor} style={{ marginTop: inputMode === 'outlined' ? Metrics.baseMargin - 2 : Metrics.section }} {...leftCustomIconProps} />;
    }
    if (rightIconComponent) {
      return rightIconComponent();
    }

    return !isEmptyOrNil(prefix) ? (
      <TextInput.Affix text={prefix} textStyle={inputMode === 'outlined' ? { color: Colors.black } : { color: Colors.black, marginBottom: multiLine ? Metrics.baseMargin - 2 : 0, paddingRight: Metrics.smallMargin }} />
    ) : null;
  };
  const ShowRightIconComponent = () => {
    if (rightIconComponent) {
      return rightIconComponent();
    }
    return !isEmptyOrNil(rightIconName) ? (
      <TextInput.Icon name={rightIconName} size={20} color={!isEmptyOrNil(errorMessage) ? Colors.error : iconColor} style={{ marginTop: inputMode === 'outlined' ? Metrics.baseMargin - 2 : Metrics.section }} {...iconProps} />
    ) : null;
  };

  return (
    <View style={inputFieldStyle}>
      <TextInput
        theme={TEXT_INPUT_THEME}
        style={{ backgroundColor: Colors.white, textAlign: 'auto' }}
        testID={testId}
        accessibilityLabel={testId}
        ref={setRef || inputFieldRef}
        placeholder={placeholder}
        label={label}
        value={value}
        mode={inputMode}
        error={!isEmptyOrNil(errorMessage) ? true : false}
        disabled={disabled}
        left={ShowPrefixComponent()}
        right={ShowRightIconComponent()}
        // right={<TextInput.Icon name={() => <Icon name={"caretdown"} />} />}
        onChangeText={onChangeHandler}
        onSubmitEditing={onSubmitEditing}
        onBlur={(val) => {
          !isEmptyOrNil(rightIconName) && setColors({ ...colors, icon: Colors.charcoalLightGrey });
          onBlurHandler(val);
        }}
        onFocus={(val) => {
          !isEmptyOrNil(rightIconName) && setColors({ ...colors, icon: Colors.newBlue });
          onFocusHandler(val);
        }}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiLine}
        numberOfLines={multiLine ? 3 : 1} //For android only
        maxFontSizeMultiplier={1.1}
        returnKeyType={multiLine ? 'default' : 'done'}
        textAlign="auto"
        {...textProps}
      />
      {/* TODO: this view should be conditional */}
      <If condition={!isEmpty(errorMessage)}>
        <ErrorInputContainer style={customErrorContainerStyle}>
          <View style={{ flex: 1 }}>
            <InputErrorText testID={`${testId}-error`} accessibilityLabel={`${testId}-error`}>
              {errorMessage}
            </InputErrorText>
          </View>
        </ErrorInputContainer>
      </If>
      <If condition={showInputLinkComponent}>
        <ErrorInputContainer style={customErrorContainerStyle}>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <InputLinkComponent />
          </View>
        </ErrorInputContainer>
      </If>
    </View>
  );
};
