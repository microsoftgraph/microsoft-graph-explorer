/*
 ------------------------------------------------------------------------------
  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
  See License in the project root for license information.
 ------------------------------------------------------------------------------
*/

import { AfterViewInit, Component } from '@angular/core';
import { ISampleQueryCategory } from '../base';
import { SampleCategories } from '../getting-started-queries';
import { GraphExplorerComponent } from '../GraphExplorerComponent';

declare let fabric;

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent extends GraphExplorerComponent implements AfterViewInit {
    public sampleCategoryPanel: Element;
    public historyPanel: Element;
    public categories: ISampleQueryCategory[] = SampleCategories;

    public ngAfterViewInit(): void {
        this.historyPanel = document.querySelector('#history-panel');
        this.sampleCategoryPanel = document.querySelector('#sample-categories-panel');

        $(document).keyup((e) => {
            if (e.keyCode === 27) { // Esc
                this.closePanels();
            }
        });

    }

    /**
     * idifyCategory
     * @param categoryTitle The sample category title that will be changed into an element id.
     * @returns A sample category title as an ID.
     */
    public idifyCategory(categoryTitle: string): string {
        return categoryTitle.replace(/\s+/g, '-').toLowerCase();
    }

    public manageCategories() {
        // Open sample category panel
        new fabric['Panel'](this.sampleCategoryPanel); // tslint:disable-line

        // Set the focus on the first actionable control in the sampleCategoryPanel.
        (document.querySelector('#closeSampleCategories') as any).focus();

    }

    public manageHistory() {
        // Open history panel
        new fabric['Panel'](this.historyPanel); // tslint:disable-line
        (document.querySelector('#close-history-btn') as any).focus();
    }

    public focusOnMoreSamples() {
        // Set the focus on the first actionable control in the sampleCategoryPanel.
        (document.querySelector('#manage-categories') as any).focus();
    }

    public focusOnShowMore() {
        // Set the focus on the first actionable control in the sampleCategoryPanel.
        (document.querySelector('#show-full-history') as any).focus();
    }

    public displayCanary() {
        if (JSON.parse(localStorage.getItem('GRAPH_MODE')) === null) {
            return false;
        }
        return true;
    }

    public closePanels() {
        const historyPanel = document.querySelector('#close-history-btn') as any;
        const samplesPanel = document.querySelector('#closeSampleCategories') as any;

        if (historyPanel) {
            historyPanel.click();
            this.focusOnShowMore();
        }

        if (samplesPanel) {
            samplesPanel.click();
            this.focusOnMoreSamples();
        }
    }
}
