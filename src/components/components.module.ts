import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BrMaskerModule } from 'brmasker-ionic-3';

import { ShowHideContainer } from './show-hide-password/show-hide-container';
import { ShowHideInput } from './show-hide-password/show-hide-input';
import { PhoneNumberComponent } from './phone-number/phone-number';

@NgModule({
	declarations: [
		ShowHideInput,
		ShowHideContainer,
    	PhoneNumberComponent,
	],
	imports: [
		IonicModule,
		BrMaskerModule
	],
	exports: [
		ShowHideInput,
		ShowHideContainer,
    	PhoneNumberComponent,
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class ComponentsModule {}
