import { Injectable, Optional, SkipSelf } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class ValidatorService {

    constructor(@Optional() @SkipSelf() prior: ValidatorService) {
        if (prior) {
            return prior;
        } 
    }

    static ValidateEmail(c: AbstractControl) {
        // RFC 2822 compliant regex
        return (c.value && c.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) ? null : { 'email':true };
    }

    static ValidatePhone(c: AbstractControl) {
        let regEx = /^((\+\d{1,2}|1)[\s.-]?)?\(?[2-9](?!11)\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$|^$/;
        if (c.value && regEx.test(c.value)) {
            return null;
        } else {
            return { 'invalidPhoneNumber': true };
        }
    }
}