// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AfterViewInit, Component } from '@angular/core';
import { ISampleQueryCategory } from './base';
import { SampleCategories, saveCategoryDisplayState } from './getting-started-queries';
import { GraphExplorerComponent } from './GraphExplorerComponent';

declare let mwf: any;

@Component({
    selector: 'sample-categories-panel',
    styleUrls: ['./sample-categories-panel.component.css'],
    templateUrl: './sample-categories-panel.component.html',
})
export class SampleCategoriesPanelComponent extends GraphExplorerComponent implements AfterViewInit {
    public categories: ISampleQueryCategory[] = SampleCategories;

    public ngAfterViewInit(): void {
        mwf.ComponentFactory.create([{
            component: mwf.Toggle,
        }]);
    }

    public toggleCategory(category: ISampleQueryCategory) {
        category.enabled = !category.enabled;
        saveCategoryDisplayState(category);
    }

    /*
     Creates an identifier from the category title by removing whitespace. We need this to
     have the checkbox elements labelled by the containing category row so that screen readers
     correctly state the purpose of the checkbox.
    */
    public getId(title: string): string {
        return this.getStr(title).replace(/\s+/, '');
    }
}
