// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { ISampleQueryCategory } from './base';
import { SampleQueries } from './gen-queries';




export function getLocalStorageDisplayKey(category: ISampleQueryCategory) {
    return `CATEGORY_DISPLAY_${category.title}`;
}

export function saveCategoryDisplayState(category: ISampleQueryCategory) {
    localStorage.setItem(getLocalStorageDisplayKey(category), JSON.stringify(category.enabled));
}

export function getCategoryDisplayState(category: ISampleQueryCategory) {
    const possibleStatus = localStorage.getItem(getLocalStorageDisplayKey(category));

    if (possibleStatus !== undefined) {
        return JSON.parse(possibleStatus);
    }

    return null;
}

interface IQueryCategoriesMap {
  [CategoryTitle: string]: ISampleQueryCategory;
}

const categories: IQueryCategoriesMap = {};

for (const query of SampleQueries) {

    // Insert query into category (create or add to)
    if (query.category in categories) {
        categories[query.category].queries.push(query);
    } else {
        categories[query.category] = {
            enabled: query.category === 'Getting Started',
            queries: [query],
            title: query.category
        };
    }
}

export let SampleCategories: ISampleQueryCategory[] = [];

for (const categoryTitle in categories) {
    const category = categories[categoryTitle];
    const displayCategory = getCategoryDisplayState(category);

    if (displayCategory !== null) {
        category.enabled = displayCategory;
    }
    SampleCategories.push(category);
}