// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

// AriaSelectedMSPivotLinkDirective - An attribute directive that uses the ms-Pivot-link class selector to 
// to apply the aria-selected attribute and value when the tab gains and loses focus.
// https://dev.office.com/fabric-js/Components/Pivot/Pivot.html
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
@Directive({
    selector: '.ms-Pivot-link'
})
export class AriaSelectedMSPivotLinkDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.el = el;
        this.renderer = renderer;
    }

    // Set the aria-selected attribute to true when the tab (ms-pivot-link) gains focus.
    @HostListener('focus')
    onFocus() {
        this.renderer.setAttribute(this.el.nativeElement, 'aria-selected', 'true');
    }

    // Set the aria-selected attribute to false when the tab (ms-pivot-link) loses focus.
    @HostListener('blur')
    onBlur() {
        this.renderer.setAttribute(this.el.nativeElement, 'aria-selected', 'false');
    }
}