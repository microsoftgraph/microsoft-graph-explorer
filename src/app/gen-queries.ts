
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
    "humanName": "my photo",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/photo/$value",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/profilephoto_get"
},{
    "category": "Getting Started",
    "method": "GET",
    "humanName": "my mail",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/messages",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_messages"
},{
    "category": "Getting Started",
    "method": "GET",
    "humanName": "all the items in my drive",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/root/children",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/item_list_children"
},{
    "category": "Getting Started",
    "method": "GET",
    "humanName": "items trending around me",
    "requestUrl": "https://graph.microsoft.com/beta/me/insights/trending",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/insights_list_trending"
},{
    "category": "Getting Started",
    "method": "GET",
    "humanName": "my manager",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/manager",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_manager"
},{
    "category": "Users",
    "method": "GET",
    "humanName": "my direct reports",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/directReports",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_directreports"
},{
    "category": "Users",
    "method": "GET",
    "humanName": "all users in the organization",
    "requestUrl": "https://graph.microsoft.com/v1.0/users",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/users"
},{
    "category": "Users",
    "method": "GET",
    "humanName": "all users in the Finance department",
    "requestUrl": "https://graph.microsoft.com/v1.0/users?$filter=Department eq 'Finance'",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/users"
},{
    "category": "Users",
    "method": "GET",
    "humanName": "my skills",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/?$select=displayName,skills",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/user"
},{
    "category": "Users",
    "method": "GET",
    "humanName": "all my Planner tasks",
    "requestUrl": "https://graph.microsoft.com/beta/me/planner/tasks",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/planner_overview"
},{
    "category": "Users (preview)",
    "method": "GET",
    "humanName": "track user changes",
    "requestUrl": "https://graph.microsoft.com/beta/users/delta?$select=displayName,givenName,surname",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/concepts/delta_query_users"
},{
    "category": "Groups",
    "method": "GET",
    "humanName": "all groups in my organization",
    "requestUrl": "https://graph.microsoft.com/v1.0/groups",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/group"
},{
    "category": "Groups",
    "method": "GET",
    "humanName": "all groups I belong to",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/memberOf",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_memberof"
},{
    "category": "Groups",
    "method": "GET",
    "humanName": "unified groups I belong to",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/memberOf/$/?$filter=groupTypes/any(a:a eq 'unified') ",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_memberof"
},{
    "category": "Groups",
    "method": "GET",
    "humanName": "group members",
    "requestUrl": "https://graph.microsoft.com/v1.0/groups/{group-id}/members",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/group_list_members"
},{
    "category": "Groups",
    "method": "GET",
    "humanName": "group's conversations",
    "requestUrl": "https://graph.microsoft.com/v1.0/groups/{group-id}/conversations",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/group_list_conversations"
},{
    "category": "Groups",
    "method": "GET",
    "humanName": "group's events",
    "requestUrl": "https://graph.microsoft.com/v1.0/groups/{group-id}/events",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/group_list_events"
},{
    "category": "Groups",
    "method": "POST",
    "humanName": "add favorite group",
    "requestUrl": "https://graph.microsoft.com/v1.0/groups/{group-id}/addFavorite",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/group_addfavorite",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ]
},{
    "category": "Groups",
    "method": "GET",
    "humanName": "items in a group drive",
    "requestUrl": "https://graph.microsoft.com/v1.0/groups/{group-id}/drive/root/children",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/drive_get"
},{
    "category": "Groups (preview)",
    "method": "GET",
    "humanName": "track group changes",
    "requestUrl": "https://graph.microsoft.com/beta/groups/delta?$select=displayName,description",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/concepts/delta_query_groups"
},{
    "category": "Outlook Mail",
    "method": "GET",
    "humanName": "my high important mail",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/messages?$filter=importance eq 'high'",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_messages"
},{
    "category": "Outlook Mail",
    "method": "GET",
    "humanName": "my mail that has 'Hello World'",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/messages?$search=\"hello world\"",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_messages"
},{
    "category": "Outlook Mail",
    "method": "POST",
    "humanName": "send an email",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/sendMail",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_sendmail",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\r\n        \"message\": {\r\n            \"subject\": \"Meet for lunch?\",\r\n            \"body\": {\r\n                \"contentType\": \"Text\",\r\n                \"content\": \"The new cafeteria is open.\"\r\n            },\r\n            \"toRecipients\": [\r\n                {\r\n                    \"emailAddress\": {\r\n                    \"address\": \"garthf@contoso.com\"\r\n                    }\r\n                }\r\n            ]\r\n        }}"
},{
    "category": "Outlook Mail",
    "method": "POST",
    "humanName": "forward mail",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/messages/{message-id}/forward",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/message_forward",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\r\n  \"comment\": \"FYI\",\r\n  \"toRecipients\": [\r\n    {\r\n      \"emailAddress\": {\r\n        \"address\": \"FULL_USER_EMAIL\",\r\n        \"name\": \"Alex Darrow\"\r\n      }\r\n    }\r\n  ]\r\n}"
},{
    "category": "Outlook Mail (preview)",
    "method": "GET",
    "humanName": "track email changes",
    "requestUrl": "https://graph.microsoft.com/beta/me/mailFolders/Inbox/messages/delta",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/concepts/delta_query_messages"
},{
    "category": "Outlook Mail (preview)",
    "method": "GET",
    "humanName": "email I'm @ mentioned",
    "requestUrl": "https://graph.microsoft.com/beta/me/messages?$filter=mentionsPreview/isMentioned%20eq%20true&$select=subject,sender,receivedDateTime",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/user_list_messages#request-2"
},{
    "category": "Outlook Calendar",
    "method": "GET",
    "humanName": "my events for the next week",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/calendarview?startdatetime={today}&enddatetime={next-week}",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_calendarview"
},{
    "category": "Outlook Calendar",
    "method": "GET",
    "humanName": "all events in my calendar",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_events"
},{
    "category": "Outlook Calendar",
    "method": "GET",
    "humanName": "all my calendars",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/calendars",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_calendars"
},{
    "category": "Outlook Calendar",
    "method": "GET",
    "humanName": "all my event reminders for next week",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/reminderView?startdatetime={today}&enddatetime={next-week}",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_reminderview"
},{
    "category": "Outlook Calendar",
    "method": "POST",
    "humanName": "find meeting time",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/me/findMeetingTimes",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_findmeetingtimes",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\r\n        \"attendees\": [\r\n            {\r\n            \"emailAddress\": {\r\n                \"address\": \"FULL_USER_EMAIL\",\r\n                \"name\": \"Alex Darrow\"\r\n            },\r\n            \"type\": \"Required\"\r\n            }\r\n        ],\r\n        \"timeConstraint\": {\r\n            \"timeslots\": [\r\n            {\r\n            \"start\": {\r\n                \"dateTime\": \"{today}\",  \r\n                \"timeZone\": \"Pacific Standard Time\" \r\n                },  \r\n                \"end\": { \r\n                \"dateTime\": \"{next-week}\",  \r\n                \"timeZone\": \"Pacific Standard Time\" \r\n                }\r\n            }\r\n            ]\r\n        },\r\n        \"locationConstraint\": {\r\n        \"isRequired\": \"false\",\r\n        \"suggestLocation\": \"true\",\r\n        \"locations\": [\r\n            {\r\n            \"displayName\": \"Conf Room 32/1368\",\r\n            \"locationEmailAddress\": \"conf32room1368@imgeek.onmicrosoft.com\"\r\n            }\r\n        ]\r\n        },\r\n        \"meetingDuration\": \"PT1H\"\r\n        }"
},{
    "category": "Outlook Calendar",
    "method": "POST",
    "humanName": "schedule a meeting",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/events",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_post_events",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\r\n        \"subject\": \"My event\",\r\n        \"start\": {\r\n            \"dateTime\": \"{today}\",\r\n            \"timeZone\": \"UTC\"\r\n        },\r\n        \"end\": {\r\n            \"dateTime\": \"{next-week}\",\r\n            \"timeZone\": \"UTC\"\r\n        },\r\n    }"
},{
    "category": "Outlook Calendar (preview)",
    "method": "GET",
    "humanName": "track changes on my events for the next week",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/calendarView/delta?startDateTime={today}&endDateTime={next-week}",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/concepts/delta_query_events"
},{
    "category": "Personal Contacts",
    "method": "GET",
    "humanName": "my contacts",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/contacts",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_contacts"
},{
    "category": "Personal Contacts",
    "method": "POST",
    "humanName": "add contact",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/contacts",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_post_contacts",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\r\n    \"givenName\": \"Pavel\",\r\n    \"surname\": \"Bansky\",\r\n    \"emailAddresses\": [\r\n        {\r\n        \"address\": \"pavelb@fabrikam.onmicrosoft.com\",\r\n        \"name\": \"Pavel Bansky\"\r\n        }\r\n    ],\r\n    \"businessPhones\": [\r\n        \"+1 732 555 0102\"\r\n    ]\r\n}"
},{
    "category": "OneDrive",
    "method": "GET",
    "humanName": "all the items in my drive",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/root/children",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/item_list_children"
},{
    "category": "OneDrive",
    "method": "GET",
    "humanName": "my recent files",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/recent",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/drive_recent"
},{
    "category": "OneDrive",
    "method": "GET",
    "humanName": "files shared with me",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/sharedWithMe",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/drive_sharedwithme"
},{
    "category": "OneDrive",
    "method": "GET",
    "humanName": "all of my excel files",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/root/search(q='.xlsx')?select=name",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/item_search"
},{
    "category": "OneDrive",
    "method": "POST",
    "humanName": "create a folder",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/root/children",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/item_post_children",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\r\n  \"name\": \"New Folder\",\r\n  \"folder\": { }\r\n}"
},{
    "category": "Excel",
    "method": "GET",
    "humanName": "all of my excel files",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/root/search(q='.xlsx')?select=name",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/item_search"
},{
    "category": "Excel",
    "method": "POST",
    "humanName": "create session",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/items/{drive-item-id}/workbook/createSession",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/excel",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{ \"persistChanges\": true }"
},{
    "category": "Excel",
    "method": "GET",
    "humanName": "worksheets in a workbook",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/items/{drive-item-id}/workbook/worksheets",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/workbook_list_worksheets"
},{
    "category": "Excel",
    "method": "POST",
    "humanName": "add a new worksheet",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/items/{drive-item-id}/workbook/worksheets/",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/worksheetcollection_add",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\r\n  \"name\": \"My New Sheet\"\r\n}"
},{
    "category": "Excel",
    "method": "GET",
    "humanName": "used range in worksheet",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/items/{drive-item-id}/workbook/worksheets/('Sheet1')/usedRange",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/worksheet_usedrange"
},{
    "category": "Excel",
    "method": "GET",
    "humanName": "tables in worksheet",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/items/{drive-item-id}/workbook/worksheets/('Sheet1')/tables",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/worksheet_list_tables"
},{
    "category": "Excel",
    "method": "GET",
    "humanName": "charts in worksheet",
    "requestUrl": "https://graph.microsoft.com/v1.0/me/drive/items/{drive-item-id}/workbook/worksheets/('Sheet1')/charts",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/worksheet_list_charts"
},{
    "category": "Planner (beta)",
    "method": "GET",
    "humanName": "all Planner plans associated with a group",
    "requestUrl": "https://graph.microsoft.com/beta/groups/{group-id}/planner/plans ",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/plannergroup_list_plans"
},{
    "category": "Planner (beta)",
    "method": "GET",
    "humanName": "all Planner tasks for a plan",
    "requestUrl": "https://graph.microsoft.com/beta/groups/{group-id}/planner/plans/{plan-id}/tasks",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/plannerplan_list_tasks"
},{
    "category": "Planner (beta)",
    "method": "GET",
    "humanName": "all my Planner tasks",
    "requestUrl": "https://graph.microsoft.com/beta/me/planner/tasks",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/planner_overview"
},{
    "category": "SharePoint Sites (beta)",
    "method": "GET",
    "humanName": "my organization's default SharePoint site",
    "requestUrl": "https://graph.microsoft.com/beta/sharePoint/site",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/sharepoint"
},{
    "category": "SharePoint Sites (beta)",
    "method": "GET",
    "humanName": "a SharePoint site by URL",
    "requestUrl": "https://graph.microsoft.com/beta/sharepoint:/{site-path}",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/baseitem_getbyurl"
},{
    "category": "SharePoint Sites (beta)",
    "method": "GET",
    "humanName": "subsites in a SharePoint site",
    "requestUrl": "https://graph.microsoft.com/beta/sharepoint/sites:/{site-path}:/sites",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/subsites_list"
},{
    "category": "SharePoint Lists (beta)",
    "method": "GET",
    "humanName": "list in a SharePoint site ",
    "requestUrl": "https://graph.microsoft.com/beta/sharepoint:/{site-path}:/lists",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/lists_list"
},{
    "category": "OneNote (beta)",
    "method": "GET",
    "humanName": "my notebooks",
    "requestUrl": "https://graph.microsoft.com/beta/me/onenote/notebooks"
},{
    "category": "OneNote (beta)",
    "method": "GET",
    "humanName": "my sections",
    "requestUrl": "https://graph.microsoft.com/beta/me/onenote/sections"
},{
    "category": "OneNote (beta)",
    "method": "GET",
    "humanName": "my pages",
    "requestUrl": "https://graph.microsoft.com/beta/me/onenote/pages"
},{
    "category": "OneNote (beta)",
    "method": "POST",
    "humanName": "create notebook",
    "requestUrl": "https://graph.microsoft.com/beta/me/onenote/notebooks",
    "postBody": "{\r\n  \"name\": \"My Notebook\"\r\n}"
},{
    "category": "OneNote (beta)",
    "method": "POST",
    "humanName": "create section",
    "requestUrl": "https://graph.microsoft.com/beta/me/onenote/notebooks/{notebook-id}/sections",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\r\n  \"name\": \"Section 1\"\r\n}"
},{
    "category": "OneNote (beta)",
    "method": "POST",
    "humanName": "create page",
    "requestUrl": "https://graph.microsoft.com/beta/me/onenote/sections/{section-id}/pages",
    "headers": [
        {
            "name": "Content-type",
            "value": "multipart/form-data"
        },
        {
            "name": "boundary",
            "value": "MyPartBoundary198374"
        }
    ],
    "postBody": "\r\n--MyPartBoundary198374\r\nContent-Disposition:form-data; name=\"Presentation\"\r\nContent-Type:text/html\r\n\r\n<!DOCTYPE html>\r\n<html>\r\n  <head>\r\n    <title>A page with <i>rendered</i> images and an <b>attached</b> file</title>\r\n    <meta name=\"created\" content=\"2015-07-22T09:00:00-08:00\" />\r\n  </head>\r\n  <body>\r\n    <p>Here's an image from an online source:</p>\r\n    <img src=\"http://...\" alt=\"an image on the page\" width=\"500\" />\r\n    <p>Here's an image uploaded as binary data:</p>\r\n    <img src=\"name:imageBlock1\" alt=\"an image on the page\" width=\"300\" />\r\n    <p>Here's a file attachment:</p>\r\n    <object data-attachment=\"FileName.pdf\" data=\"name:fileBlock1\" type=\"application/pdf\" />\r\n  </body>\r\n</html>\r\n\r\n--MyPartBoundary198374\r\nContent-Disposition:form-data; name=\"imageBlock1\"\r\nContent-Type:image/jpeg\r\n\r\n... binary image data ...\r\n\r\n--MyPartBoundary198374\r\nContent-Disposition:form-data; name=\"fileBlock1\"\r\nContent-Type:application/pdf\r\n\r\n... binary file data ...\r\n\r\n--MyPartBoundary198374--"
}]