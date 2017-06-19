// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { SampleQueryCategory } from "./base";
import { SampleQueries } from "./gen-queries";

export function getLocalStorageDisplayKey(category:SampleQueryCategory) {
    return `CATEGORY_DISPLAY_${category.title}`;
}

export function saveCategoryDisplayState(category:SampleQueryCategory) {
    localStorage.setItem(getLocalStorageDisplayKey(category), JSON.stringify(category.enabled));
}

export function getCategoryDisplayState(category:SampleQueryCategory) {
    let possibleStatus = localStorage.getItem(getLocalStorageDisplayKey(category));

    if (possibleStatus !== undefined) {
        return JSON.parse(possibleStatus);
    }

    return null;
}

interface QueryCategoriesMap {
    [CategoryTitle: string]: SampleQueryCategory;
}

let categories:QueryCategoriesMap = {};

for (let query of SampleQueries) {

    // insert query into category (create or add to)
    if (query.category in categories) {
        categories[query.category].queries.push(query);
    } else {
        categories[query.category] = {
            enabled: query.category === "Getting Started",
            queries: [query],
            title: query.category
        }
    }
}

export let SampleCategories:SampleQueryCategory[] = [];

for (let categoryTitle in categories) {
    let category = categories[categoryTitle];
    let displayCategory = getCategoryDisplayState(category);

    if (displayCategory !== null) {
        category.enabled = displayCategory;
    }
    SampleCategories.push(category);
}