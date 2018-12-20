import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ValidatorModule } from './validators/validator.module';
import { BusinessModule } from '../business/business.module';


export * from './common.interface';
export * from './validators/validator.service';
export * from './validators/phone.validator';
export * from '../business/business.service';

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string){
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
    }
}

@NgModule({
    declarations: [ ],
    imports: [
        BusinessModule,
        ValidatorModule
    ],
    exports: [
        ValidatorModule,
        BusinessModule
    ],
    providers: [
    ]
})
export class CommonModule {
    constructor(@Optional() @SkipSelf() parentModule: CommonModule){
        throwIfAlreadyLoaded(parentModule, 'CommonModule');
    }
}

