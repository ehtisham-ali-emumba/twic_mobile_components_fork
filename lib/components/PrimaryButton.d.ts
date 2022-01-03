/// <reference types="react" />
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
export declare const PrimaryButton: (props: PrimaryButtonType) => JSX.Element;
