// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, AfterViewInit } from '@angular/core';
import { AuthenticationStatus, GraphApiCall, SampleQueryCategory } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { SampleCategories } from "./getting-started-queries";
import { AppComponent } from "./app.component";
import { SampleCategoriesPanelComponent } from "./sample-categories-panel.component";
declare let fabric;
@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent extends GraphExplorerComponent implements AfterViewInit {
    sampleCategoryPanel: Element;
    historyPanel: Element;

    ngAfterViewInit(): void {
        this.historyPanel = document.querySelector("#history-panel");
        this.sampleCategoryPanel = document.querySelector("#sample-categories-panel");

        $(document).keyup((e) => {
            if (e.keyCode === 27) // esc
                this.closePanels();
        });

    }

    categories:SampleQueryCategory[] = SampleCategories

    manageCategories() {
        // open sample category panel
        new fabric['Panel'](this.sampleCategoryPanel);

    }

    manageHistory() {
        // open history panel
        new fabric['Panel'](this.historyPanel);
        (document.querySelector("#history-panel tbody tr:first-child") as any).focus();
    }

    closePanels() {
        try {
            (document.querySelector("#history-panel .ms-Panel-closeButton") as any).click()
        } catch(e) {

        }

        try {
            (document.querySelector("#sample-categories-panel .ms-Panel-closeButton") as any).click()
        } catch(e) {

        }
    };
}