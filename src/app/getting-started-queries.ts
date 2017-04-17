// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { SampleQueryCategory, SampleQuery, GraphRequestHeader } from "./base";
import * as PostBodyTemplates from './postBodyTemplates/queries'
import { SampleQueries } from "./gen-queries";

interface QueryCategoriesMap {
    [CategoryTitle: string]: SampleQueryCategory;
}

let categories:QueryCategoriesMap = {};

for (let query of SampleQueries) {
    
    // load tempalte if exists
    if (query.postBodyTemplateName) {
        query.postBodyTemplateContents = PostBodyTemplates[query.postBodyTemplateName];
    }
    
    // insert query into category (create or add to)
    if (query.category in categories) {
        categories[query.category].queries.push(query);
    } else {
        categories[query.category] = {
            enabled: true,
            queries: [query],
            title: query.category
        }
    }
}

export let SampleCategories:SampleQueryCategory[] = [];

for (let category in categories) {
    SampleCategories.push(categories[category]);
}