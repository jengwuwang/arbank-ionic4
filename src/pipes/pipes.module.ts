import { NgModule } from '@angular/core';
import { MomentPipe } from './moment/moment';
import { PhoneMaskPipe } from './phonemask/phonemask';

export * from './moment/moment';
export * from './phonemask/phonemask';

@NgModule({
	declarations: [
        MomentPipe,
        PhoneMaskPipe
    ],
	imports: [],
	exports: [
        MomentPipe,
        PhoneMaskPipe
    ]
})
export class PipesModule {}