/// <reference types="react" />
declare type SelectionsDefined = {
    brandSelectionValue: string;
    modelSelectionValue: string;
    fuelSelectionValue: string;
};
declare type SelectionsNever = {
    brandSelectionValue?: never;
    modelSelectionValue?: never;
    fuelSelectionValue?: never;
};
declare type SelectionsConditional = SelectionsDefined | SelectionsNever;
declare type CalcFormProps = {
    id?: string;
} & SelectionsConditional;
export declare const CalcForm: ({ id, brandSelectionValue, modelSelectionValue, fuelSelectionValue, }: CalcFormProps) => JSX.Element;
export {};
