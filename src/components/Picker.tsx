import * as React from 'react';
import { StyleSheet, View, StyleProp } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { TextInput } from 'react-native-paper';
import { If, Then } from 'react-if';
import Icon from 'react-native-vector-icons/AntDesign';

import { APP_CONSTANTS, Colors, Fonts, Metrics, Utilities } from '../commons';

const { isEmptyOrNil } = Utilities;

import { AppText } from './AppStyledComponents';

export const PickerIcon = (props) => {
  const { color, iconTop } = props;
  const pickerStyle: StyleProp<any> = APP_CONSTANTS.IS_ANDROID
    ? {
        position: 'absolute',
        top: iconTop,
        right: Metrics.smallMargin,
        color: color,
      }
    : { color: color, right: 2 };

  return <Icon name="caretdown" style={pickerStyle} size={APP_CONSTANTS.IS_ANDROID ? Fonts.size.tiny : Fonts.size.extraSmall} color={color} />;
};

const PICKER_THEME = {
  fonts: {
    medium: {
      fontFamily: 'TTCommons-Regular',
    },
  },
  roundness: Metrics.baseMargin,
};

export type PickerProps = {
  label: string;
  placeholderText?: string;
  value: string;
  pickerMode?: 'flat' | 'outlined' | undefined;
  onValueChange(value: any): void;
  onDonePress?(): void;
  onOpenHandler?(): void;
  items: Array<any>;
  errorMessage?: string;
  customInputStyle?: object;
  pickerIOSContainer?: object;
  pickerAndroidContainer?: object;
  customErrorContainerStyle?: object;
  textInputContainerStyle?: object;
  RenderCustomIcon?(): React.ReactElement;
  testId?: string;
  hidePlaceholder?: boolean;
  textProps?: object;
};

export const Picker = (props: PickerProps) => {
  const [colors, setColors] = React.useState({ pickerColor: Colors.newDimGrey, text: Colors.newCharcoalDarkGrey, icon: Colors.charcoalLightGrey });

  const textInputRef = React.useRef<any>(null);

  // const pickerRef = React.useRef<any>(null);
  const {
    placeholderText,
    value,
    errorMessage = '',
    pickerMode = 'outlined',
    customErrorContainerStyle = {},
    customInputStyle = {},
    onValueChange,
    onDonePress,
    onOpenHandler = () => {},
    items,
    testId = '',
    RenderCustomIcon,
    pickerIOSContainer = {},
    pickerAndroidContainer = {},
    hidePlaceholder = false,
    label = '',
    textInputContainerStyle = {},
    textProps = {},
  } = props;

  const isDisabled = isEmptyOrNil(items);
  // sets the color for the drop down
  const pickerStateColor = isDisabled ? Colors.newDisabled : isEmptyOrNil(errorMessage) ? colors.pickerColor : Colors.error;
  const textColor = isDisabled ? Colors.disabledText : isEmptyOrNil(errorMessage) ? colors.text : Colors.error;
  const iconColor = isDisabled ? Colors.disabledText : colors.icon;
  const pickerMarginTop = pickerMode === 'flat' ? Metrics.doubleBaseMargin : 3;

  const onOpenSelect = () => {
    textInputRef.current.handleFocus();
    setColors({ ...colors, pickerColor: Colors.newBlue, icon: Colors.newBlue });
    if (!APP_CONSTANTS.IS_ANDROID) {
      onOpenHandler();
    }
  };

  const onCloseSelect = () => {
    textInputRef.current.handleBlur();
    setColors({ ...colors, pickerColor: Colors.newDimGrey, icon: Colors.charcoalLightGrey });
  };

  // Specifically used for different platforms (IOS and Android)
  const PickerOSSpecificProps = APP_CONSTANTS.IS_ANDROID
    ? {
        pickerProps: {
          onFocus: () => onOpenSelect(),
          onBlur: () => onCloseSelect(),
          dropdownIconColor: '#ffffff',
          dropdownIconRippleColor: '#ffffff',
        },
      }
    : {
        onClose: () => onCloseSelect(),
        onOpen: () => onOpenSelect(),
      };

  // const onUpdownArrowSelect = (key?) => {
  //   const picker = pickerRef.current;
  //   const pickerItems = picker.state.items;
  //   const pickerSelectedValue = picker.state.selectedItem.value;
  //   const pickerSelectedValueIndex = findIndex(propEq('value', pickerSelectedValue), pickerItems);
  //   if (key === 'up') {
  //     if (pickerSelectedValueIndex > 0) picker.onValueChange(pickerItems[pickerSelectedValueIndex - 1].value, pickerSelectedValueIndex - 1);
  //     if (pickerSelectedValueIndex === 0) picker.onValueChange(pickerItems[pickerItems.length - 1].value, pickerItems.length - 1);
  //   } else {
  //     if (pickerSelectedValueIndex + 1 < pickerItems.length) picker.onValueChange(pickerItems[pickerSelectedValueIndex + 1].value, pickerSelectedValueIndex + 1);
  //     if (pickerSelectedValueIndex + 1 === pickerItems.length) picker.onValueChange(pickerItems[0].value, 0);
  //   }
  // };

  return (
    <>
      <TextInput
        ref={textInputRef}
        theme={{
          ...PICKER_THEME,
          colors: {
            primary: Colors.blue,
            error: Colors.error,
            disabled: Colors.disabled,
            placeholder: pickerStateColor,
            text: Colors.black,
          },
        }}
        style={{ backgroundColor: Colors.white, ...textInputContainerStyle }}
        mode={pickerMode}
        label={!isEmptyOrNil(value) ? label : ''}
        value={!isEmptyOrNil(value) ? value : ''}
        error={!isEmptyOrNil(errorMessage) ? true : false}
        underlineColor={pickerStateColor}
        underlineColorAndroid={pickerStateColor}
        textAlign="auto"
        render={() => (
          <RNPickerSelect
            style={{
              placeholder: {
                color: isEmptyOrNil(errorMessage) ? pickerStateColor : Colors.error,
              },
              ...pickerStyles,
              inputIOSContainer: {
                marginTop: pickerMarginTop,
                height: 50,
                ...pickerIOSContainer,
              },
              inputAndroidContainer: {
                marginTop: pickerMarginTop,
                height: 50,
                ...pickerAndroidContainer,
              },
            }}
            placeholder={
              hidePlaceholder
                ? {}
                : {
                    label: `${placeholderText}`,
                    value: null,
                  }
            }
            key={items.length}
            // ref={pickerRef}
            textInputProps={{
              //@ts-ignore
              fontSize: Fonts.size.regular - 1,
              fontFamily: 'TTCommons-Regular',
              maxFontSizeMultiplier: 1.1,
              width: '95%',
              color: textColor,
              marginTop: -3,
              ...customInputStyle,
            }}
            Icon={() => (RenderCustomIcon ? RenderCustomIcon() : <PickerIcon color={isEmptyOrNil(errorMessage) ? iconColor : Colors.error} />)}
            // useNativeAndroidPickerStyle={false}
            itemKey={value}
            // onUpArrow={() => onUpdownArrowSelect('up')}
            // onDownArrow={() => onUpdownArrowSelect()}
            onValueChange={onValueChange}
            onDonePress={onDonePress}
            items={items}
            disabled={isDisabled}
            testID={testId}
            accessibilityLabel={testId}
            {...PickerOSSpecificProps}
          />
        )}
        {...textProps}
      />
      <If condition={!isDisabled && !isEmptyOrNil(errorMessage)}>
        <Then>
          <View
            style={{
              ...customErrorContainerStyle,
            }}
          >
            <AppText color={Colors.error} fontSize={Fonts.size.small} testID={`${testId}-error`} accessibilityLabel={`${testId}-error`}>
              {errorMessage}
            </AppText>
          </View>
        </Then>
      </If>
    </>
  );
};

const pickerStyles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    height: '100%',
    marginRight: 15,
  },
  inputIOS: {
    fontSize: 16,
    height: 56,
    paddingHorizontal: 14,
    textAlignVertical: 'center',
    color: Colors.black,
    width: '100%',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    height: 56,
    paddingHorizontal: 14,
    color: Colors.black,
    textAlignVertical: 'center',
    width: '100%',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginLeft: 5,
  },
});
