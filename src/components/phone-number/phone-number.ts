import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChange, OnChanges, ElementRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { BrMaskerIonic3 } from "brmasker-ionic-3";
import libphonenumber from 'google-libphonenumber';
import { TextInput } from 'ionic-angular';
import { IBrMaskModel, ICountry } from '../../common/common.module';


@Component({
  host: {
    '(input)': 'onChange',
    '(ionBlur)': 'onTouched'
  },
  selector: 'phone-number',
  templateUrl: 'phone-number.html',
  providers: [
    BrMaskerIonic3,
    { provide: NG_VALUE_ACCESSOR, useExisting: PhoneNumberComponent, multi:true }
  ]
})
export class PhoneNumberComponent implements ControlValueAccessor,AfterViewInit,OnInit,OnChanges {
  
  brConfig: IBrMaskModel = {};
  country_and_code: string;
  country_example_number: string;
  example_number_formatted: string;
  dial_code: string = '';
  util: libphonenumber.PhoneNumberUtil = libphonenumber.PhoneNumberUtil.getInstance();
  PNF = libphonenumber.PhoneNumberFormat;
  PNT = libphonenumber.PhoneNumberType; 
  phoneNumber: string;

  private onChange: Function = (phoneNumber: string) => {};
  private onTouch: Function = () => {};

  @Input() countries:ICountry[];
  @Input() countryCode: FormControl;
  @Output() countryCodeChange = new EventEmitter<string>();
  @Input() disabled:boolean = false;
  @ViewChild('telinput') telinput: TextInput;

  constructor(public elementRef: ElementRef) { }

  ngOnChanges(changes: { [propName: string]: SimpleChange }){
    // console.log(changes);
  }

  ngOnInit(): void {
    let self = this;

    if (self.countryCode) {
      self.country_and_code = self.countryCode.value;
    }
    self.country_and_code = self.country_and_code == undefined || '' ? 'US': self.country_and_code;
    self.dial_code = '+' + self.util.getCountryCodeForRegion(self.country_and_code);
    self.country_example_number = self.util.getExampleNumberForType(self.country_and_code, self.PNT.MOBILE);
    self.example_number_formatted = self.util.format(self.country_example_number, self.PNF.NATIONAL);
    self.brConfig.mask = self.example_number_formatted;
    self.phoneNumber = self.phoneNumber == '' ? '' : self.phoneNumber;

  }

  ngAfterViewInit() {
    let self = this;
    self.telinput.writeValue(self.phoneNumber);
  }

  onIonBlur(ev){
    this.writeValue(ev._value);
    this.onTouch();
  }

  onIonChange(ev) {
    this.writeValue(ev._value);
    this.onTouch();
  }

  onSelect($event){
    let self = this;

    self.countryCodeChange.emit($event);
    self.country_and_code = $event;
    self.dial_code = '+' + self.util.getCountryCodeForRegion(self.country_and_code);
    self.country_example_number = self.util.getExampleNumberForType(self.country_and_code, self.PNT.MOBILE);
    self.example_number_formatted = self.util.format(self.country_example_number, self.PNF.NATIONAL);
    self.brConfig.mask = self.example_number_formatted;

    if (self.countryCode){
      self.countryCode.setValue($event, {onlySelf:true, emitEvent:true, emitModelToViewChange:true});
      self.countryCode.markAsTouched();
      self.countryCode.markAsDirty();
    }
    self.telinput.writeValue('');
}


  writeValue(value:string): void {
    this.onChange(value);
    this.phoneNumber = value;
  }
  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }
  setDisabledState?(disabled:boolean): void {
    this.disabled = disabled;
  }

}

