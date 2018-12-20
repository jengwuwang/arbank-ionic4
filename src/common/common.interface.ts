export interface IValidationMessage {
    type: string;
    message: string;
}

export interface IBrMaskModel {
    mask?:string;
    len?:number;
    money?: boolean;
    decimal?: number;
    phone?: boolean;
    person?: boolean;
    percent?: boolean;
    decimalCaracter?: string;
    thousand?: string;
    type?: BrMaskTypeOption;
}

export enum BrMaskTypeOption {
    ALFA = 'alfa',
    NUM = 'num',
    ALL = 'all'
};

export interface ICountry {
    id: number;
    code: string;
    dial_code: string;
    flag: string;
    name: string;
    sortOrder: number;
}

export interface IModalParams {
    param?: any,
    operation?: string;
}

export enum ModelParamOptions {
    CANCEL = 'cancel',
    SAVE = 'save'
}