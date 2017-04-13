// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { SampleQueryCategory, SampleQuery } from "./base";

const GettingStartedQueries: SampleQuery[] = [
    {
        humanName: "my profile",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/",
        docLink: "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/users",
        AAD: true,
        MSA: true
    },
    {
        humanName: "my files",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/drive/root/children"
    },
    {
        humanName: "my photo",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/photo/$value"
    },
    {
        humanName: "my mail",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/messages"
    },
    {
        humanName: "my high importance mail",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/messages?$filter=importance eq 'high'"
    },
    {
        humanName: "my calendar",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/calendar"
    },
    {
        humanName: "my manager",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/manager",
        docLink: "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_manager"
    }
];

export const SampleCategories:SampleQueryCategory[] = [
    {
        title: "Getting Started",
        queries: GettingStartedQueries,
        enabled: true
    },
    {
        title: "OneDrive",
        queries: [],
        enabled: true
    },
    {
        title: "Sharepoint",
        queries: [],
        enabled: true
    },
    {
        title: "Excel",
        queries: [],
        enabled: true
    }
]