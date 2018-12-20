import { OnInit } from '@angular/core';
export declare class BrMaskServicesModel {
    mask: string;
    len: number;
    person: boolean;
    phone: boolean;
    money: boolean;
    percent: boolean;
    type: 'alfa' | 'num' | 'all';
    decimal: number;
    decimalCaracter: string;
    thousand: string;
    userCaracters: boolean;
    numberAndTousand: boolean;
}
export declare class BrMaskerIonicServices3 implements OnInit {
    brmasker: BrMaskServicesModel;
    constructor();
    ngOnInit(): void;
    writeCreateValue(value: string, config?: BrMaskServicesModel): string;
    writeValuePercent(value: string): string;
    writeValuePerson(value: string): string;
    writeValueMoney(value: string, config?: BrMaskServicesModel): string;
    writeValueNumberAndThousand(value: string, config?: BrMaskServicesModel): string;
    writeValueusingSpecialCharacters(value: string, config?: BrMaskServicesModel): string;
    private moneyMask(value, config);
    private onInput(value);
    private thousand(value);
    private usingSpecialCharacters(campo, Mascara, tamanho);
    private formatField(campo, Mascara, tamanho);
}
