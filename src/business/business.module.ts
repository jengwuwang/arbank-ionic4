import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from '../common/common.module';
import { AwsModule } from '../aws/aws.module';
import { BusinessService } from './business.service';



@NgModule({
    declarations: [],
    imports: [
        AwsModule
    ],
    exports: [
        AwsModule
    ],
    providers: [
        BusinessService
    ]
})
export class BusinessModule {
    constructor(@Optional() @SkipSelf() parentModule: BusinessModule) {
        throwIfAlreadyLoaded(parentModule, 'BusinessModule');
    }
}