// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { SampleQueryCategory, SampleQuery } from "./base";

const queries: SampleQuery[] = [
    {
        humanName: "my profile",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/",
        docLink: "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/users",
        AAD: true,
        MSA: true,
        category: "Getting Started"
    },
    {
        humanName: "my files",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/drive/root/children",
        category: "OneDrive"
    },
    {
        humanName: "my photo",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/photo/$value",
        category: "Getting Started"
    },
    {
        humanName: "my mail",
        method: "POST",
        requestUrl: "https://graph.microsoft.com/v1.0/me/messages",
        category: "Outlook"
    },
    {
        humanName: "my high importance mail",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/messages?$filter=importance eq 'high'",
        category: "Outlook"
    },
    {
        humanName: "my calendar",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/calendar",
        category: "Getting Started"
    },
    {
        humanName: "my next meeting",
        method: "DELETE",
        requestUrl: "https://graph.microsoft.com/v1.0/me/calendar/foobar",
        category: "Getting Started"
    },
    {
        humanName: "my manager",
        method: "PATCH",
        requestUrl: "https://graph.microsoft.com/v1.0/me/manager",
        docLink: "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_manager",
        category: "Users"
    }
];


interface QueryCategoriesMap {
    [CategoryTitle: string]: SampleQueryCategory;
}

let categories:QueryCategoriesMap = {};

for (let query of queries) {
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