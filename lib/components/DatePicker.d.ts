import * as React from 'react';
declare type DatePickerProps = {
    label: string;
    onConfirmDate(date: any): void;
    value: any;
    fieldStyle?: any;
    labelPaddingTop?: number;
    onOpenHandler?: () => void;
    errorMessage?: string;
    disabled?: boolean;
    textInputContainerStyle?: object;
    textProps?: object;
    iconProps?: object;
    RenderCustomIcon?: React.ComponentType<{
        color: string;
    }>;
    pickerMode?: 'flat' | 'outlined' | undefined;
    testId?: string;
    datePickerProps?: object;
};
export declare const DatePickerField: (props: DatePickerProps) => JSX.Element;
export {};
