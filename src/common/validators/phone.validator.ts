import libphonenumber from 'google-libphonenumber';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PhoneValidator {

    constructor() {}

    static validCountryPhone(c: AbstractControl): ValidatorFn {
        let subscribe: boolean = false;
        
        return (p: AbstractControl): ValidationErrors | null => {

            if(!subscribe) {
                subscribe = true;
                c.valueChanges.subscribe(() => {
                    p.updateValueAndValidity();
                });
            }

            if (p.value !== '') {

                try {
                    const util = libphonenumber.PhoneNumberUtil.getInstance();
                    let phoneNumber = '' + p.value + '',
                        region = c.value,
                        number = util.parse(phoneNumber, region),
                        isValidNumber = util.isValidNumber(number);
                    if(isValidNumber) {
                        return null;
                    }
                } catch(err) {
                    return {
                        validCountryPhone: true
                    };
                }

                return {
                    validCountryPhone: true
                };
            } else {
                return null;
            }
        };
    };
}