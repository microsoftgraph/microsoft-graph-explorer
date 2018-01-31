// AriaSelectedDirective - An attribute directive that uses the 'ariaselected' selector to 
// to apply the aria-selected attribute and value when the item gains and loses focus. 
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
@Directive({
    selector: '[ariaselected]'
    // TODO: Investigate whether we target ms-pivot-link class with this selector. I think we can
    // since this class is used for tabs. 
})
export class AriaSelectedDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.el = el;
        this.renderer = renderer;
    }

    // TODO: Make sure this works from the keyboard.
    // Set the aria-selected attribute to true when the tab (ms-pivot-link) is selected.
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