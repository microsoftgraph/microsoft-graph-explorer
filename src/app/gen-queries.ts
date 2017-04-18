
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

// WARNING - This file is generated from import-sample-queries.js

import { SampleQuery } from "./base";

export const SampleQueries: SampleQuery[] = [
  {
    "category": "Getting Started",
    "method": "GET",
    "humanName": "my profile",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/users"
},{
    "category": "Getting Started",
    "method": "GET",
    "humanName": "my files",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/photo/$value"
},{
    "category": "Getting Started",
    "method": "GET",
    "humanName": "my photo",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/manager",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/profilephoto_get"
},{
    "category": "Getting Started",
    "method": "GET",
    "humanName": "my mail",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/messages",
    "docLink": "https://graph.microsoft.com/v1.0/me/messages"
},{
    "category": "Getting Started",
    "method": "GET",
    "humanName": "items trending around me",
    "requestUrl": "https://graph.microsoft.com/beta/me/insights/trending"
},{
    "category": "Users",
    "method": "GET",
    "humanName": "my manager",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/manager",
    "docLink": "https://graph.microsoft.com/v1.0/me/manager"
},{
    "category": "Users",
    "method": "GET",
    "humanName": "my direct reports",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/directReports",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_directreports"
},{
    "category": "Outlook",
    "method": "GET",
    "humanName": "my high importance mail",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/messages?$filter=importance%20eq%20'high'",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_messages"
},{
    "category": "Outlook",
    "method": "GET",
    "humanName": "my mail that has 'Hello World'",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/messages?$search=%22hello%20world%22"
},{
    "category": "Outlook",
    "method": "GET",
    "humanName": "my events for the next week",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/calendarview?startdatetime=2017-04-16T00:00:00Z&enddatetime=2017-04-23T00:00:00Z"
},{
    "category": "Outlook",
    "method": "GET",
    "humanName": "my contacts",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/contacts"
},{
    "category": "Outlook",
    "method": "POST",
    "humanName": "Send an email",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/sendMail",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_sendmail",
    "postBodyTemplateName": "sendMail",
    "headers": [
        {
            "name": "Content-Type",
            "value": "application/json"
        }
    ]
},{
    "category": "OneDrive",
    "method": "GET",
    "humanName": "my recent files",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/recent",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/drive_recent"
},{
    "category": "OneDrive",
    "method": "GET",
    "humanName": "all the items in my drive",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/root/children",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/item_list_children"
},{
    "category": "OneDrive",
    "method": "GET",
    "humanName": "all of my excel files",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/root/search(q='xlsx')?select=name",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/item_search"
},{
    "category": "OneDrive",
    "method": "POST",
    "humanName": "create a folder",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/root/children"
},{
    "category": "OneDrive",
    "method": "GET",
    "humanName": "Get Files Shared with Me",
    "requestUrl": "https://graph.microsoft.com/v1.0/drive/sharedWithMe"
},{
    "category": "Groups",
    "method": "GET",
    "humanName": "groups I belong to",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/memberOf"
},{
    "category": "Groups",
    "method": "GET",
    "humanName": "group members",
    "requestUrl": "https://graph.microsoft.com/v1.0/groups/{id}/members"
},{
    "category": "Groups",
    "method": "GET",
    "humanName": "a group's conversations",
    "requestUrl": "https://graph.microsoft.com/v1.0/groups/{id}/conversations"
},{
    "category": "Groups",
    "method": "GET",
    "humanName": "files in a group drive",
    "requestUrl": "https://graph.microsoft.com/v1.0/groups/{group-id}/drive/root/children"
},{
    "category": "Excel",
    "method": "GET",
    "humanName": "Sheets in a workbook",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/items/{id}/workbook/worksheets"
},{
    "category": "Planner (beta)",
    "method": "GET",
    "humanName": "all Planner plans associated with a group",
    "requestUrl": "https://graph.microsoft.com/beta/groups/{group-id}/planner/plans",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/planner_overview"
},{
    "category": "SharePoint (beta)",
    "method": "GET",
    "humanName": "my organization's default SharePoint site",
    "requestUrl": "https://graph.microsoft.com/beta/sharePoint/site",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/sharepoint"
},{
    "category": "OneNote (beta)",
    "method": "GET",
    "humanName": "my notes",
    "requestUrl": "https://graph.microsoft.com/beta/me/notes/notebooks"
},{
    "category": "Trending",
    "method": "GET",
    "humanName": "items trending around me",
    "requestUrl": "https://graph.microsoft.com/beta/me/trendingAround"
},{
    "category": "Trending",
    "method": "GET",
    "humanName": "people I work with",
    "requestUrl": "https://graph.microsoft.com/beta/me/people"
}]