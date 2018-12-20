import { ICountry } from "../common.module";

export class Country implements ICountry {
    id: number;    
    code: string;
    dial_code: string;
    flag: string;
    name: string;
    sortOrder: number;

    constructor() {
        this.id = 0;
        this.code = '';
        this.dial_code = '';
        this.flag = '';
        this.name = '';
        this.sortOrder = 0;
    }

    public static Factory(){
        return new Country();
    }
}