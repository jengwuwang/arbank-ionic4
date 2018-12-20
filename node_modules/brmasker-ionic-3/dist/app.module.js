import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrMaskerIonic3 } from './directives/brmasker-ionic-3';
import { BrMaskerIonicServices3 } from './directives/brmasker-ionic-services';
var BrMaskerModule = (function () {
    function BrMaskerModule() {
    }
    return BrMaskerModule;
}());
export { BrMaskerModule };
BrMaskerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    BrMaskerIonic3,
                    BrMaskerIonicServices3
                ],
                exports: [
                    BrMaskerIonic3,
                    BrMaskerIonicServices3
                ],
                imports: [
                    CommonModule
                ],
                schemas: [
                    CUSTOM_ELEMENTS_SCHEMA
                ],
                providers: [BrMaskerIonicServices3]
            },] },
];
/** @nocollapse */
BrMaskerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=app.module.js.map