// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { HistoryRecord, GraphApiCall, SampleQueryCategory } from "./base";
import { AppComponent } from "./app.component";
import { SampleCategories } from "./getting-started-queries";

declare let fabric, mwf:any;

@Component({
  selector: 'sample-categories-panel',
  styles: [`
    .category-row {
        margin-bottom: 29px;
        padding: 0 50px;
    }

    .category-switch {
        display: inline-block;
        float: right;
        width: 100px;
    }

    div.c-toggle button {
        margin-top: 0px;
    }

`],
  template: `
    <div id="sample-categories-panel" class="ms-Panel ms-Panel--xl">
        <button class="ms-Panel-closeButton ms-PanelAction-close" tabindex="1">
            <i class="ms-Panel-closeIcon ms-Icon ms-Icon--Cancel"></i>
        </button>
        <div class="ms-Panel-contentInner">
            <p class="ms-Panel-headerText">{{getStr('Edit Sample Categories')}}</p>
            <div class="ms-Panel-content">
                <div *ngFor="let category of categories" class="category-row">
                    {{category.title}} ({{category.queries.length}})
                    <div class="category-switch">
                        <div class="c-toggle" (click)="toggleCategory(category)">
                            <button id="example-1" name="example-1" role="checkbox" aria-checked="true" aria-labelledby="c-label c-state-label-1"></button>
                            <span [attr.data-on-string]="getStr('On')" [attr.data-off-string]="getStr('Off')" id="c-state-label-1">On</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     `,
})
export class SampleCategoriesPanelComponent extends GraphExplorerComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        mwf.ComponentFactory.create([{
            'component': mwf.Toggle,
        }])
    }

    toggleCategory(category:SampleQueryCategory) {
        category.enabled = !category.enabled;
    }

    categories:SampleQueryCategory[] = SampleCategories;
}