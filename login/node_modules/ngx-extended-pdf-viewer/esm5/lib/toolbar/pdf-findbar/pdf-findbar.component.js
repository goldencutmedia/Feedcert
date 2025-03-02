/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, TemplateRef } from '@angular/core';
var PdfFindbarComponent = /** @class */ (function () {
    function PdfFindbarComponent() {
        this.showFindButton = true;
    }
    PdfFindbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pdf-findbar',
                    template: "<ng-container [ngTemplateOutlet]=\"customFindbar ? customFindbar : defaultFindbar\">\n</ng-container>\n\n<ng-template #defaultFindbar>\n  <div\n    class=\"findbar hidden doorHanger\"\n    [class.invisible]=\"!showFindButton\"\n    id=\"findbar\"\n    [style.transform]=\"'scale(' + mobileFriendlyZoomScale + ')'\"\n    [style.transformOrigin]=\"'left center'\"\n    [style.left]=\"findbarLeft\"\n    [style.top]=\"findbarTop\"\n  >\n    <ng-container [ngTemplateOutlet]=\"customFindbarButtons ? customFindbarButtons : defaultFindbarButtons\"> </ng-container>\n    </div>\n</ng-template>\n\n<ng-template #defaultFindbarButtons>\n  <pdf-find-input-area [customFindbarInputArea]=\"customFindbarInputArea\"></pdf-find-input-area>\n  <pdf-findbar-options-one-container></pdf-findbar-options-one-container>\n  <pdf-findbar-options-two-container></pdf-findbar-options-two-container>\n  <pdf-findbar-options-three-container></pdf-findbar-options-three-container>\n  <pdf-findbar-message-container></pdf-findbar-message-container>\n</ng-template>\n",
                    styles: [""]
                }] }
    ];
    PdfFindbarComponent.propDecorators = {
        showFindButton: [{ type: Input }],
        mobileFriendlyZoomScale: [{ type: Input }],
        findbarLeft: [{ type: Input }],
        findbarTop: [{ type: Input }],
        customFindbarInputArea: [{ type: Input }],
        customFindbar: [{ type: Input }],
        customFindbarButtons: [{ type: Input }]
    };
    return PdfFindbarComponent;
}());
export { PdfFindbarComponent };
if (false) {
    /** @type {?} */
    PdfFindbarComponent.prototype.showFindButton;
    /** @type {?} */
    PdfFindbarComponent.prototype.mobileFriendlyZoomScale;
    /** @type {?} */
    PdfFindbarComponent.prototype.findbarLeft;
    /** @type {?} */
    PdfFindbarComponent.prototype.findbarTop;
    /** @type {?} */
    PdfFindbarComponent.prototype.customFindbarInputArea;
    /** @type {?} */
    PdfFindbarComponent.prototype.customFindbar;
    /** @type {?} */
    PdfFindbarComponent.prototype.customFindbarButtons;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLWZpbmRiYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWV4dGVuZGVkLXBkZi12aWV3ZXIvIiwic291cmNlcyI6WyJsaWIvdG9vbGJhci9wZGYtZmluZGJhci9wZGYtZmluZGJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RDtJQUFBO1FBT1MsbUJBQWMsR0FBRyxJQUFJLENBQUM7SUFvQi9CLENBQUM7O2dCQTNCQSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLDRoQ0FBMkM7O2lCQUU1Qzs7O2lDQUVFLEtBQUs7MENBR0wsS0FBSzs4QkFHTCxLQUFLOzZCQUdMLEtBQUs7eUNBSUwsS0FBSztnQ0FHTCxLQUFLO3VDQUdMLEtBQUs7O0lBRVIsMEJBQUM7Q0FBQSxBQTNCRCxJQTJCQztTQXRCWSxtQkFBbUI7OztJQUM5Qiw2Q0FDNkI7O0lBRTdCLHNEQUN1Qzs7SUFFdkMsMENBQ3VDOztJQUV2Qyx5Q0FDc0M7O0lBR3RDLHFEQUNnRDs7SUFFaEQsNENBQ3VDOztJQUV2QyxtREFDOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwZGYtZmluZGJhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9wZGYtZmluZGJhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BkZi1maW5kYmFyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQZGZGaW5kYmFyQ29tcG9uZW50IHtcbiAgQElucHV0KClcbiAgcHVibGljIHNob3dGaW5kQnV0dG9uID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgbW9iaWxlRnJpZW5kbHlab29tU2NhbGU6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgZmluZGJhckxlZnQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgZmluZGJhclRvcDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIC8qIFVJIHRlbXBsYXRlcyAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgY3VzdG9tRmluZGJhcklucHV0QXJlYTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgY3VzdG9tRmluZGJhcjogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgY3VzdG9tRmluZGJhckJ1dHRvbnM6IFRlbXBsYXRlUmVmPGFueT47XG59XG4iXX0=