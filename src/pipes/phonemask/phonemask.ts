import { Pipe, PipeTransform } from "@angular/core";
import libphonenumber from 'google-libphonenumber';

// value | phoneMask: countryCode: PNF //

@Pipe({
    name: 'phoneMask'
})
export class PhoneMaskPipe implements PipeTransform {
    /**
     * 
     * @param value 
     * @param countryCode 
     * @param pnf 
     */
    transform(value: string, countryCode: string, pnf: libphonenumber.PhoneNumberFormat) {
        if (!value) return value;
        let _pnf = pnf == null ? libphonenumber.PhoneNumberFormat.NATIONAL : pnf;
        let _countryCode = countryCode == null ? 'US' : countryCode;
        let util = libphonenumber.PhoneNumberUtil.getInstance();
        let result = util.format(util.parse(value, _countryCode),_pnf);

        return result;
    }
}