// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

declare let fabric: any;
export function initFabricComponents() {
    const PivotElements = document.querySelectorAll('.ms-Pivot');
    for (let i = 0; i < PivotElements.length; i++) { // tslint:disable-line
        new fabric['Pivot'](PivotElements[i]); // tslint:disable-line
    }
    if ('Spinner' in fabric) {
        const elements = document.querySelectorAll('.ms-Spinner');
        let i = elements.length;
        let component;
        while (i--) {
            component = new fabric.Spinner(elements[i]);
        }
    }

    const DialogElements = document.querySelectorAll('.ms-Dialog');
    const DialogComponents = [];
    for (let i = 0; i < DialogElements.length; i++) {
        ((() => {
            DialogComponents[i] = new fabric.Dialog(DialogElements[i]);
        })());
    }
    const TableElements = document.querySelectorAll('.ms-Table');
    for (let i = 0; i < TableElements.length; i++) { // tslint:disable-line
        new fabric['Table'](TableElements[i]); // tslint:disable-line
    }
}
