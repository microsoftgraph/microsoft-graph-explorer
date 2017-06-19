// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

declare let fabric:any;
export function initFabricComponents() {
    let PivotElements = document.querySelectorAll(".ms-Pivot");
    for (let i = 0; i < PivotElements.length; i++) {
        new fabric['Pivot'](PivotElements[i]); // tslint:disable-line
    }
    if ('Spinner' in fabric) {
        let elements = document.querySelectorAll('.ms-Spinner');
        let i = elements.length;
        let component;
        while(i--) {
            component = new fabric['Spinner'](elements[i]);
        }
    }
    
    let DialogElements = document.querySelectorAll(".ms-Dialog");
    let DialogComponents = [];
    for (let i = 0; i < DialogElements.length; i++) {
        (function(){
            DialogComponents[i] = new fabric['Dialog'](DialogElements[i]);
        }());
    }
    let TableElements = document.querySelectorAll(".ms-Table");
    for(let i = 0; i < TableElements.length; i++) {
        new fabric['Table'](TableElements[i]); // tslint:disable-line
    }
}