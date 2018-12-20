import { NgModule, Optional, SkipSelf } from '@angular/core';

import { throwIfAlreadyLoaded } from '../common/common.module';
import { CognitoService } from './cognito.service';
import { S3Service } from './s3.service';

export * from './cognito.service';
export * from './s3.service';

@NgModule({
    imports: [
    ],
    exports: [
    ],
    providers: [
        CognitoService,
        S3Service
    ]
})
export class AwsModule {
    constructor( @Optional() @SkipSelf() parentModule: AwsModule) {
        throwIfAlreadyLoaded(parentModule, 'AwsModule');
    }
}