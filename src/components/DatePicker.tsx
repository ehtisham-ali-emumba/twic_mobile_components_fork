import * as React from 'react';
import { Platform, StyleProp, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
import { If, Then } from 'react-if';
import { clone } from 'ramda';

import Icon from 'react-native-vector-icons/AntDesign';

import { APP_CONSTANTS, Colors, Fonts, Metrics } from '../commons';
import { AppText } from './AppStyledComponents';
import { isEmptyOrNil } from '../commons/Utilities';

const CalendarIcon = (props) => {
  const { color, iconTop } = props;
  const pickerStyle: StyleProp<any> = APP_CONSTANTS.IS_ANDROID
    ? {
        position: 'absolute',
        top: iconTop,
        right: !APP_CONSTANTS.IS_ANDROID ? 0 : 5,
        color: color,
      }
    : { color: color };

  return <Icon name="calendar" style={pickerStyle} size={APP_CONSTANTS.IS_ANDROID ? Fonts.size.tiny : Fonts.size.medium + 1} color={color} />;
};

const PICKER_THEME = {
  fonts: {
    medium: {
      fontFamily: 'TTCommons-Regular',
    },
  },
  roundness: Metrics.baseMargin,
};

type DatePickerProps = {
  label: string;
  onConfirmDate(date): void;
  value: any;
  fieldStyle?: any;
  labelPaddingTop?: number;
  onOpenHandler?: () => void;
  errorMessage?: string;
  disabled?: boolean;
  textInputContainerStyle?: object;
  textProps?: object;
  iconProps?: object;
  RenderCustomIcon?: React.ComponentType<{ color: string }>;
  pickerMode?: 'flat' | 'outlined' | undefined;
  testId?: string;
  datePickerProps?: object;
};
const isPlatformIos = Platform.OS === 'ios';

export const DatePickerField = (props: DatePickerProps) => {
  const [colors, setColors] = React.useState({ pickerColor: Colors.newDimGrey, text: Colors.newCharcoalDarkGrey, icon: Colors.charcoalLightGrey });
  const textInputRef = React.useRef<any>(null);
  const {
    onConfirmDate,
    label = '',
    value = '',
    labelPaddingTop = 4,
    testId = '',
    errorMessage = '',
    disabled = false,
    textInputContainerStyle = {},
    textProps = {},
    iconProps = {},
    pickerMode = 'outlined',
    RenderCustomIcon = CalendarIcon,
    fieldStyle = {
      width: '100%',
      paddingLeft: 0,
      paddingRight: isPlatformIos ? 0 : 5,
      paddingVertical: 5,
    },
    onOpenHandler = () => {},
    datePickerProps = {},
  } = props;

  const initialValue = clone(value);
  const pickerStateColor = disabled ? Colors.newDisabled : isEmptyOrNil(errorMessage) ? colors.pickerColor : Colors.error;
  const iconColor = disabled ? Colors.disabledText : colors.icon;
  const paddingTop = pickerMode === 'flat' ? Metrics.screenHorizontalPadding : 0;

  const onCancelPress = () => {
    onConfirmDate(initialValue);
  };

  const handleDateSubmission = (date) => {
    onConfirmDate(date);
  };
  const onCloseModal = () => {
    textInputRef.current.handleBlur();
    setColors({ ...colors, pickerColor: Colors.newDimGrey, icon: Colors.charcoalLightGrey });
  };
  return (
    <>
      <TextInput
        ref={textInputRef}
        testID={testId}
        accessibilityLabel={testId}
        theme={{
          ...PICKER_THEME,
          colors: {
            placeholder: pickerStateColor,
            primary: Colors.blue,
            error: Colors.error,
            disabled: Colors.newDisabled,
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
          <DatePicker
            date={value}
            mode="date"
            placeholder="Choose date"
            format="ll"
            minDate="1970-01-01"
            maxDate={new Date()}
            confirmBtnText="Done"
            cancelBtnText="Cancel"
            onOpenModal={() => {
              textInputRef.current.handleFocus();
              setColors({ ...colors, pickerColor: Colors.newBlue, icon: Colors.newBlue });
              onOpenHandler();
            }}
            onCloseModal={onCloseModal}
            testID={testId}
            onCancelPress={() => onCancelPress()}
            onDateChange={(date) => {
              onCloseModal();
              handleDateSubmission(date);
            }}
            showIcon
            allowFontScaling={false}
            adjustsFontSizeToFit={true}
            iconComponent={<RenderCustomIcon {...iconProps} color={isEmptyOrNil(errorMessage) ? iconColor : Colors.error} />}
            style={fieldStyle}
            customStyles={{
              dateTouchBody: {
                flexDirection: 'row',
                height: 45,
                paddingHorizontal: 15,
                paddingTop: paddingTop,
              },
              dateInput: {
                top: -2,
                height: 20,
                borderWidth: 0,
                alignItems: 'flex-start',
              },
              btnTextConfirm: {
                color: Colors.blue,
                fontFamily: 'TTCommons-DemiBold',
                fontSize: Fonts.size.h3,
              },
              dateText: {
                fontSize: Fonts.size.small,
                fontFamily: 'TTCommons-Regular',
                color: Colors.black,
                paddingTop: labelPaddingTop,
              },
              placeholderText: {
                fontSize: Fonts.size.small,
                fontFamily: 'TTCommons-Regular',
                paddingTop: labelPaddingTop,
                color: Colors.charcoalLightGrey,
              },
              // fixing the alignment for ios14
              datePicker: {
                justifyContent: 'center',
              },
            }}
            {...datePickerProps}
          />
        )}
        {...textProps}
      />
      <If condition={!disabled && !isEmptyOrNil(errorMessage)}>
        <Then>
          <View>
            <AppText color={Colors.error} fontSize={Fonts.size.small}>
              {errorMessage}
            </AppText>
          </View>
        </Then>
      </If>
    </>
  );
};
