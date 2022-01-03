import * as React from 'react';
import { PrimaryButton, PrimaryButtonType } from './PrimaryButton';
import { Colors } from '../commons';

export const SecondaryButton = (props: PrimaryButtonType) => {
  const { disabled = false } = props;
  return (
    <PrimaryButton
      buttonColor={Colors.white}
      disabledColor={Colors.white}
      labelStyle={{ color: disabled ? Colors.newDimGrey : Colors.newBlue, marginLeft: 15 }}
      shadowOptions={{ width: 0 }}
      buttonStyle={{ borderColor: Colors.newDimGrey, borderWidth: 1 }}
      {...props}
    />
  );
};
