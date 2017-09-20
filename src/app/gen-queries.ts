
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

// WARNING - This file is generated from util-scripts/query-importer.js

import { SampleQuery } from "./base";

export const SampleQueries: SampleQuery[] = [
  {
    "category": "Getting Started",
    "method": "GET",
    "humanName": "my profile",
    "requestUrl": "/v1.0/me/",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/users"
},
{
    "category": "Getting Started",
    "method": "GET",
    "humanName": "my photo",
    "requestUrl": "/v1.0/me/photo/$value",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/profilephoto_get"
},
{
    "category": "Getting Started",
    "method": "GET",
    "humanName": "my mail",
    "requestUrl": "/v1.0/me/messages",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_messages"
},
{
    "category": "Getting Started",
    "method": "GET",
    "humanName": "all the items in my drive",
    "requestUrl": "/v1.0/me/drive/root/children",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/item_list_children"
},
{
    "category": "Getting Started",
    "method": "GET",
    "humanName": "items trending around me",
    "requestUrl": "/beta/me/insights/trending",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/insights_list_trending"
},
{
    "category": "Getting Started",
    "method": "GET",
    "humanName": "my manager",
    "requestUrl": "/v1.0/me/manager",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_manager"
},
{
    "category": "Users",
    "method": "GET",
    "humanName": "my direct reports",
    "requestUrl": "/v1.0/me/directReports",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_directreports"
},
{
    "category": "Users",
    "method": "GET",
    "humanName": "all users in the organization",
    "requestUrl": "/v1.0/users",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/users"
},
{
    "category": "Users",
    "method": "GET",
    "humanName": "all users in the Finance department",
    "requestUrl": "/v1.0/users?$filter=Department eq 'Finance'",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/users"
},
{
    "category": "Users",
    "method": "GET",
    "humanName": "my skills",
    "requestUrl": "/v1.0/me/?$select=displayName,skills",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/user"
},
{
    "category": "Users",
    "method": "GET",
    "humanName": "user by email",
    "requestUrl": "/v1.0/users/{user-mail}",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/user"
},
{
    "category": "Users",
    "method": "GET",
    "humanName": "all my Planner tasks",
    "requestUrl": "/beta/me/planner/tasks",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/planner_overview"
},
{
    "category": "Users",
    "method": "POST",
    "humanName": "create user",
    "requestUrl": "/v1.0/users",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_post_users",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\n        \"accountEnabled\": true,\n        \"city\": \"Seattle\",\n        \"country\": \"United States\",\n        \"department\": \"Sales & Marketing\",\n        \"displayName\": \"Melissa Darrow\",\n        \"givenName\": \"Melissa\",\n        \"jobTitle\": \"Marketing Director\",\n        \"mailNickname\": \"MelissaD\",\n        \"passwordPolicies\": \"DisablePasswordExpiration\",\n        \"passwordProfile\": {\n            \"password\": \"Test1234\",\n            \"forceChangePasswordNextSignIn\": false\n        },\n        \"officeLocation\": \"131/1105\",\n        \"postalCode\": \"98052\",\n        \"preferredLanguage\": \"en-US\",\n        \"state\": \"WA\",\n        \"streetAddress\": \"9256 Towne Center Dr., Suite 400\",\n        \"surname\": \"Darrow\",\n        \"mobilePhone\": \"+1 206 555 0110\",\n        \"usageLocation\": \"US\",\n        \"userPrincipalName\": \"MelissaD@{domain}\"\n    }"
},
{
    "category": "Users",
    "method": "GET",
    "humanName": "track user changes",
    "requestUrl": "/v1.0/users/delta?$select=displayName,givenName,surname",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/concepts/delta_query_users"
},
{
    "category": "Groups",
    "method": "GET",
    "humanName": "all groups in my organization",
    "requestUrl": "/v1.0/groups",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/group"
},
{
    "category": "Groups",
    "method": "GET",
    "humanName": "all groups I belong to",
    "requestUrl": "/v1.0/me/memberOf",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_memberof"
},
{
    "category": "Groups",
    "method": "GET",
    "humanName": "group members",
    "requestUrl": "/v1.0/groups/{group-id}/members",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/group_list_members",
    "tip": "This query requires a group id.  To find the ID of a group you belong to, you can run: GET https://graph.microsoft.com/v1.0/me/memberOf"
},
{
    "category": "Groups",
    "method": "GET",
    "humanName": "group's conversations",
    "requestUrl": "/v1.0/groups/{group-id}/conversations",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/group_list_conversations",
    "tip": "This query requires a group id.  To find the ID of a group you belong to, you can run: GET https://graph.microsoft.com/v1.0/me/memberOf"
},
{
    "category": "Groups",
    "method": "GET",
    "humanName": "group's events",
    "requestUrl": "/v1.0/groups/{group-id}/events",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/group_list_events",
    "tip": "This query requires a group id.  To find the ID of a group you belong to, you can run: GET https://graph.microsoft.com/v1.0/me/memberOf"
},
{
    "category": "Groups",
    "method": "POST",
    "humanName": "add favorite group",
    "requestUrl": "/v1.0/groups/{group-id}/addFavorite",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/group_addfavorite",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "tip": "This query requires a group id.  To find the ID of a group you belong to, you can run: GET https://graph.microsoft.com/v1.0/me/memberOf"
},
{
    "category": "Groups",
    "method": "GET",
    "humanName": "items in a group drive",
    "requestUrl": "/v1.0/groups/{group-id}/drive/root/children",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/drive_get",
    "tip": "This query requires a group id.  To find the ID of a group you belong to, you can run: GET https://graph.microsoft.com/v1.0/me/memberOf"
},
{
    "category": "Groups",
    "method": "GET",
    "humanName": "track group changes",
    "requestUrl": "/v1.0/groups/delta?$select=displayName,description",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/concepts/delta_query_groups"
},
{
    "category": "Outlook Mail",
    "method": "GET",
    "humanName": "my high important mail",
    "requestUrl": "/v1.0/me/messages?$filter=importance eq 'high'",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_messages"
},
{
    "category": "Outlook Mail",
    "method": "GET",
    "humanName": "my mails from an address",
    "requestUrl": "/v1.0/me/messages?$filter=(from/emailAddress/address) eq '{user-mail}'",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_messages"
},
{
    "category": "Outlook Mail",
    "method": "GET",
    "humanName": "my mail that has 'Hello World'",
    "requestUrl": "/v1.0/me/messages?$search=\"hello world\"",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_messages"
},
{
    "category": "Outlook Mail",
    "method": "POST",
    "humanName": "send an email",
    "requestUrl": "/v1.0/me/sendMail",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_sendmail",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\n        \"message\": {\n            \"subject\": \"Meet for lunch?\",\n            \"body\": {\n                \"contentType\": \"Text\",\n                \"content\": \"The new cafeteria is open.\"\n            },\n            \"toRecipients\": [\n                {\n                    \"emailAddress\": {\n                    \"address\": \"garthf@contoso.com\"\n                    }\n                }\n            ]\n        }}",
    "tip": "Update the Request Body and select Run Query."
},
{
    "category": "Outlook Mail",
    "method": "POST",
    "humanName": "forward mail",
    "requestUrl": "/v1.0/me/messages/{message-id}/forward",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/message_forward",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\n  \"comment\": \"FYI\",\n  \"toRecipients\": [\n    {\n      \"emailAddress\": {\n        \"address\": \"{user-mail}\",\n        \"name\": \"Alex Darrow\"\n      }\n    }\n  ]\n}",
    "tip": "This query requires a message id. To get the ID, run the following query, find the message in the response and use its ID property: GET https://graph.microsoft.com/v1.0/me/messages"
},
{
    "category": "Outlook Mail",
    "method": "GET",
    "humanName": "track email changes",
    "requestUrl": "/v1.0/me/mailFolders/Inbox/messages/delta",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/concepts/delta_query_messages"
},
{
    "category": "Outlook Mail (beta)",
    "method": "GET",
    "humanName": "email I'm @ mentioned",
    "requestUrl": "/beta/me/messages?$filter=mentionsPreview/isMentioned eq true&$select=subject,sender,receivedDateTime",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/user_list_messages#request-2"
},
{
    "category": "Outlook Calendar",
    "method": "GET",
    "humanName": "my events for the next week",
    "requestUrl": "/v1.0/me/calendarview?startdatetime={today}&enddatetime={next-week}",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_calendarview"
},
{
    "category": "Outlook Calendar",
    "method": "GET",
    "humanName": "all events in my calendar",
    "requestUrl": "/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_events"
},
{
    "category": "Outlook Calendar",
    "method": "GET",
    "humanName": "all my calendars",
    "requestUrl": "/v1.0/me/calendars",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_calendars"
},
{
    "category": "Outlook Calendar",
    "method": "POST",
    "humanName": "find meeting time",
    "requestUrl": "/v1.0/me/findMeetingTimes",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_findmeetingtimes",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\n        \"attendees\": [\n            {\n            \"emailAddress\": {\n                \"address\": \"{user-mail}\",\n                \"name\": \"Alex Darrow\"\n            },\n            \"type\": \"Required\"\n            }\n        ],\n        \"timeConstraint\": {\n            \"timeslots\": [\n            {\n            \"start\": {\n                \"dateTime\": \"{today}\",  \n                \"timeZone\": \"Pacific Standard Time\" \n                },  \n                \"end\": { \n                \"dateTime\": \"{next-week}\",  \n                \"timeZone\": \"Pacific Standard Time\" \n                }\n            }\n            ]\n        },\n        \"locationConstraint\": {\n        \"isRequired\": \"false\",\n        \"suggestLocation\": \"true\",\n        \"locations\": [\n            {\n            \"displayName\": \"Conf Room 32/1368\",\n            \"locationEmailAddress\": \"conf32room1368@imgeek.onmicrosoft.com\"\n            }\n        ]\n        },\n        \"meetingDuration\": \"PT1H\"\n        }",
    "tip": "Update the Request Body and select Run Query."
},
{
    "category": "Outlook Calendar",
    "method": "POST",
    "humanName": "schedule a meeting",
    "requestUrl": "/v1.0/me/events",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_post_events",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\n        \"subject\": \"My event\",\n        \"start\": {\n            \"dateTime\": \"{today}\",\n            \"timeZone\": \"UTC\"\n        },\n        \"end\": {\n            \"dateTime\": \"{next-week}\",\n            \"timeZone\": \"UTC\"\n        }\n    }",
    "tip": "Update the Request Body and select Run Query."
},
{
    "category": "Outlook Calendar",
    "method": "GET",
    "humanName": "track changes on my events for the next week",
    "requestUrl": "/v1.0/me/calendarView/delta?startDateTime={today}&endDateTime={next-week}",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/concepts/delta_query_events",
    "tip": "This query uses date and time parameters. Use an ISO 8601 format. For example, \"2017-04-30T19:00:00.0000000\"."
},
{
    "category": "Personal Contacts",
    "method": "GET",
    "humanName": "my contacts",
    "requestUrl": "/v1.0/me/contacts",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_contacts"
},
{
    "category": "Personal Contacts",
    "method": "POST",
    "humanName": "add contact",
    "requestUrl": "/v1.0/me/contacts",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_post_contacts",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\n    \"givenName\": \"Pavel\",\n    \"surname\": \"Bansky\",\n    \"emailAddresses\": [\n        {\n        \"address\": \"pavelb@fabrikam.onmicrosoft.com\",\n        \"name\": \"Pavel Bansky\"\n        }\n    ],\n    \"businessPhones\": [\n        \"+1 732 555 0102\"\n    ]\n}",
    "tip": "Update the Request Body and select Run Query."
},
{
    "category": "OneDrive",
    "method": "GET",
    "humanName": "all the items in my drive",
    "requestUrl": "/v1.0/me/drive/root/children",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/item_list_children"
},
{
    "category": "OneDrive",
    "method": "GET",
    "humanName": "my recent files",
    "requestUrl": "/v1.0/me/drive/recent",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/drive_recent"
},
{
    "category": "OneDrive",
    "method": "GET",
    "humanName": "files shared with me",
    "requestUrl": "/v1.0/me/drive/sharedWithMe",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/drive_sharedwithme"
},
{
    "category": "OneDrive",
    "method": "GET",
    "humanName": "search my OneDrive",
    "requestUrl": "/v1.0/me/drive/root/search(q='finance')?select=name,id,webUrl",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/item_search"
},
{
    "category": "OneDrive",
    "method": "POST",
    "humanName": "create a folder",
    "requestUrl": "/v1.0/me/drive/root/children",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/item_post_children",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\n  \"name\": \"New Folder\",\n  \"folder\": { }\n}",
    "tip": "Update the Request Body and select Run Query."
},
{
    "category": "Excel",
    "method": "POST",
    "humanName": "create session",
    "requestUrl": "/v1.0/me/drive/items/{drive-item-id}/workbook/createSession",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/excel",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{ \"persistChanges\": true }",
    "tip": "This query requires a driveItem id.  To find the ID of the driveItem that corresponds to an Excel Workbook, you can run: GET https://graph.microsoft.com/v1.0/me/drive/root/search(q='.xlsx')?select=name,id,webUrl."
},
{
    "category": "Excel",
    "method": "GET",
    "humanName": "worksheets in a workbook",
    "requestUrl": "/v1.0/me/drive/items/{drive-item-id}/workbook/worksheets",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/workbook_list_worksheets",
    "tip": "This query requires a driveItem id.  To find the ID of the driveItem that corresponds to an Excel Workbook, you can run: GET https://graph.microsoft.com/v1.0/me/drive/root/search(q='.xlsx')?select=name,id,webUrl."
},
{
    "category": "Excel",
    "method": "POST",
    "humanName": "add a new worksheet",
    "requestUrl": "/v1.0/me/drive/items/{drive-item-id}/workbook/worksheets/",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/worksheetcollection_add",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\n  \"name\": \"My New Sheet\"\n}",
    "tip": "This query requires a driveItem id.  To find the ID of the driveItem that corresponds to an Excel Workbook, you can run: GET https://graph.microsoft.com/v1.0/me/drive/root/search(q='.xlsx')?select=name,id,webUrl."
},
{
    "category": "Excel",
    "method": "GET",
    "humanName": "used range in worksheet",
    "requestUrl": "/v1.0/me/drive/items/{drive-item-id}/workbook/worksheets('Sheet1')/usedRange",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/worksheet_usedrange",
    "tip": "This query requires a driveItem id.  To find the ID of the driveItem that corresponds to an Excel Workbook, you can run: GET https://graph.microsoft.com/v1.0/me/drive/root/search(q='.xlsx')?select=name,id,webUrl."
},
{
    "category": "Excel",
    "method": "GET",
    "humanName": "tables in worksheet",
    "requestUrl": "/v1.0/me/drive/items/{drive-item-id}/workbook/worksheets/Sheet1/tables",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/worksheet_list_tables",
    "tip": "This query requires a driveItem id.  To find the ID of the driveItem that corresponds to an Excel Workbook, you can run: GET https://graph.microsoft.com/v1.0/me/drive/root/search(q='.xlsx')?select=name,id,webUrl."
},
{
    "category": "Excel",
    "method": "GET",
    "humanName": "charts in worksheet",
    "requestUrl": "/v1.0/me/drive/items/{drive-item-id}/workbook/worksheets('Sheet1')/charts",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/worksheet_list_charts",
    "tip": "This query requires a driveItem id.  To find the ID of the driveItem that corresponds to an Excel Workbook, you can run: GET https://graph.microsoft.com/v1.0/me/drive/root/search(q='.xlsx')?select=name,id,webUrl."
},
{
    "category": "Planner",
    "method": "GET",
    "humanName": "all Planner plans associated with a group",
    "requestUrl": "/v1.0/groups/{group-id-with-plan}/planner/plans",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/plannergroup_list_plans",
    "tip": "This query requires a group id.  To find the ID of a group you belong to, you can run: GET https://graph.microsoft.com/v1.0/me/memberOf"
},
{
    "category": "Planner",
    "method": "GET",
    "humanName": "Planner plan",
    "requestUrl": "/v1.0/planner/plans/{plan-id}",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/plannerplan_get",
    "tip": "This query requires a plan id.  To find the ID of the plan you can run: GET https://graph.microsoft.com/v1.0/me/groups/{group-id}/plans."
},
{
    "category": "Planner",
    "method": "PATCH",
    "humanName": "update a Planner plan",
    "requestUrl": "/v1.0/planner/plans/{plan-id}",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/plannerplan_update",
    "headers": [
        {
            "name": "If-Match",
            "value": "{if-match}"
        }
    ],
    "postBody": "{\n    \"title\": \"Updated plan title\"\n}",
    "tip": "This query requires a Plan ID and value of @odata.etag for a selected task. To find the ID of the Plan, you can run: GET https://graph.microsoft.com/v1.0/me/planner/tasks. To get the @odata.etag, run: GET https://graph.microsoft.com/v1.0/planner/plans/{plan-id}"
},
{
    "category": "Planner",
    "method": "GET",
    "humanName": "all buckets in Planner plan",
    "requestUrl": "/v1.0/planner/plans/{plan-id}/buckets",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/plannerplan_list_buckets",
    "tip": "This query requires a plan id.  To find the ID of the plan you can run: GET https://graph.microsoft.com/v1.0/me/groups/{group-id}/plans."
},
{
    "category": "Planner",
    "method": "POST",
    "humanName": "create a bucket in Planner plan",
    "requestUrl": "/v1.0/planner/buckets",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/planner_post_buckets",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\n  \"name\": \"{bucket-name}\",\n  \"planId\": \"{plan-id}\",\n  \"orderHint\": \" !\"\n}",
    "tip": "This query requires a Plan id.  To find the ID of the Plan you can run: GET https://graph.microsoft.com/v1.0/me/planner/plans"
},
{
    "category": "Planner",
    "method": "PATCH",
    "humanName": "update a bucket in Planner plan",
    "requestUrl": "/v1.0/planner/buckets/{bucket-id}",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/plannerbucket_update",
    "headers": [
        {
            "name": "If-Match",
            "value": "{if-match}"
        }
    ],
    "postBody": "{\n    \"name\": \"Updated bucket name\"\n}",
    "tip": "This query requires a bucket id and value of @odata.etag for a selected bucket.  To find the ID of the bucket run: GET https://graph.microsoft.com/v1.0/planner/plans/{plan-id}/buckets and then run: GET https://graph.microsoft.com/v1.0/planner/buckets/{bucket-id} to discover @odata.etag"
},
{
    "category": "Planner",
    "method": "GET",
    "humanName": "all Planner tasks for a plan",
    "requestUrl": "/v1.0/planner/plans/{plan-id}/tasks",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/plannerplan_list_tasks",
    "tip": "This query requires a plan id.  To find the ID of the plan you can run: GET https://graph.microsoft.com/v1.0/me/groups/{group-id}/plans."
},
{
    "category": "Planner",
    "method": "GET",
    "humanName": "all my Planner tasks",
    "requestUrl": "/v1.0/me/planner/tasks",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/planner_overview"
},
{
    "category": "Planner",
    "method": "GET",
    "humanName": "all Planner tasks for user",
    "requestUrl": "/v1.0/users/{coworker-mail}/planner/tasks",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/planneruser_list_tasks"
},
{
    "category": "Planner",
    "method": "GET",
    "humanName": "Planner task by id",
    "requestUrl": "/v1.0/planner/tasks/{task-id}",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/plannertask_get",
    "tip": "This query requires a task id.  To find the ID of the task you can run: GET https://graph.microsoft.com/v1.0/me/planner/tasks"
},
{
    "category": "Planner",
    "method": "POST",
    "humanName": "create a Planner task",
    "requestUrl": "/v1.0/planner/tasks",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/planner_post_tasks",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\n  \"planId\": \"{plan-id}\",\n  \"title\": \"{task-title}\",\n  \"assignments\": {}\n}",
    "tip": "This query requires a Plan id.  To find the ID of the Plan you can run: GET https://graph.microsoft.com/v1.0/me/planner/tasks"
},
{
    "category": "Planner",
    "method": "PATCH",
    "humanName": "update a Planner task",
    "requestUrl": "/v1.0//planner/tasks/{task-id}",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/plannertask_update",
    "headers": [
        {
            "name": "If-Match",
            "value": "{if-match}"
        }
    ],
    "postBody": "{\n    \"title\": \"Updated task title\"\n}",
    "tip": "This query requires a task id and value of @odata.etag for a selected task.  To find the ID of the task and @odata.etag you can run: GET https://graph.microsoft.com/v1.0/me/planner/tasks"
},
{
    "category": "Planner",
    "method": "GET",
    "humanName": "details for Planner task",
    "requestUrl": "/v1.0/planner/tasks/{task-id}/details",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/plannertaskdetails_get",
    "tip": "This query requires a task id.  To find the ID of the task you can run: GET https://graph.microsoft.com/v1.0/me/planner/tasks"
},
{
    "category": "Insights",
    "method": "GET",
    "humanName": "my recent files",
    "requestUrl": "/v1.0/me/drive/recent",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/drive_recent"
},
{
    "category": "Insights (beta)",
    "method": "GET",
    "humanName": "items trending around me",
    "requestUrl": "/beta/me/insights/trending",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/insights_list_trending"
},
{
    "category": "People",
    "method": "GET",
    "humanName": "people I work with",
    "requestUrl": "/v1.0/me/people",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_people"
},
{
    "category": "People",
    "method": "GET",
    "humanName": "people whose name starts with J",
    "requestUrl": "/v1.0/me/people/?$search=j",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/person_get"
},
{
    "category": "People",
    "method": "GET",
    "humanName": "people relevant to a topic",
    "requestUrl": "/v1.0/me/people/?$search=\"topic: contoso\"",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/person_get"
},
{
    "category": "Extensions",
    "method": "GET",
    "humanName": "get an open extension",
    "requestUrl": "/v1.0/me?$select=id,displayName,mail,mobilePhone&$expand=extensions",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/opentypeextension"
},
{
    "category": "Extensions",
    "method": "POST",
    "humanName": "create an open extension",
    "requestUrl": "/v1.0/me/extensions",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/opentypeextension_post_opentypeextension",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\n  \"@odata.type\":\"microsoft.graph.openTypeExtension\",    \"extensionName\":\"com.contoso.roamingSettings\",\n    \"theme\":\"dark\",\n    \"color\":\"purple\",\n    \"lang\":\"Japanese\"\n}"
},
{
    "category": "Extensions",
    "method": "PATCH",
    "humanName": "update an open extension",
    "requestUrl": "/v1.0/me/extensions/{extension-id}",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/opentypeextension_update",
    "postBody": "{\n    \"theme\":\"light\",\n    \"color\":\"yellow\",\n    \"lang\":\"Swahili\"\n}"
},
{
    "category": "Extensions",
    "method": "GET",
    "humanName": "get available schema extensions",
    "requestUrl": "/v1.0/schemaExtensions",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/schemaextension_post_schemaextensions"
},
{
    "category": "Extensions",
    "method": "GET",
    "humanName": "filter groups by extension property value",
    "requestUrl": "/v1.0/groups?$filter=adatumisv_courses/id eq '123'&$select=id,displayName,adatumisv_courses",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/schemaextension_post_schemaextensions"
},
{
    "category": "Extensions",
    "method": "POST",
    "humanName": "create a group with extension data",
    "requestUrl": "/v1.0/groups",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/schemaextension_post_schemaextensions",
    "postBody": "{\n    \"displayName\": \"Extensions sample group\",\n    \"description\": \"Extensions sample group\",\n    \"groupTypes\": [\"Unified\"],\n    \"mailEnabled\": true,\n    \"mailNickname\": \"extSample123\",\n    \"securityEnabled\": false,\n    \"adatumisv_courses\": {\n        \"id\":\"123\",\n        \"name\":\"New Managers\",\n        \"type\":\"Online\"\n    }\n}"
},
{
    "category": "Extensions",
    "method": "PATCH",
    "humanName": "update a group with extension data",
    "requestUrl": "/v1.0/groups/{group-id}",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/schemaextension_post_schemaextensions",
    "postBody": "{\n   \"adatumisv_courses\": {\n        \"id\":\"123\",\n        \"name\":\"New Managers\",\n        \"type\":\"Online\"\n    }\n}"
},
{
    "category": "OneNote",
    "method": "GET",
    "humanName": "my notebooks",
    "requestUrl": "/v1.0/me/onenote/notebooks",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/onenote"
},
{
    "category": "OneNote",
    "method": "GET",
    "humanName": "my sections",
    "requestUrl": "/v1.0/me/onenote/sections",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/section"
},
{
    "category": "OneNote",
    "method": "GET",
    "humanName": "my pages",
    "requestUrl": "/v1.0/me/onenote/pages",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/section_list_pages"
},
{
    "category": "OneNote",
    "method": "POST",
    "humanName": "create notebook",
    "requestUrl": "/v1.0/me/onenote/notebooks",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/onenote_post_notebooks",
    "postBody": "{\n  \"displayName\": \"My Notebook\"\n}",
    "tip": "Update the Request Body and select Run Query."
},
{
    "category": "OneNote",
    "method": "POST",
    "humanName": "create section",
    "requestUrl": "/v1.0/me/onenote/notebooks/{notebook-id}/sections",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/notebook_post_sections",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\n  \"displayName\": \"Section 1\"\n}",
    "tip": "This query requires a notebook id.  To find the ID, you can run: GET https://graph.microsoft.com/v1.0/me/onenote/notebooks. "
},
{
    "category": "OneNote",
    "method": "POST",
    "humanName": "create page",
    "requestUrl": "/v1.0/me/onenote/sections/{section-id}/pages",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/section_post_pages",
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
    "postBody": "\n--MyPartBoundary198374\nContent-Disposition:form-data; name=\"Presentation\"\nContent-Type:text/html\n\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>A page with <i>rendered</i> images and an <b>attached</b> file</title>\n    <meta name=\"created\" content=\"2015-07-22T09:00:00-08:00\" />\n  </head>\n  <body>\n    <p>Here's an image from an online source:</p>\n    <img src=\"http://...\" alt=\"an image on the page\" width=\"500\" />\n    <p>Here's an image uploaded as binary data:</p>\n    <img src=\"name:imageBlock1\" alt=\"an image on the page\" width=\"300\" />\n    <p>Here's a file attachment:</p>\n    <object data-attachment=\"FileName.pdf\" data=\"name:fileBlock1\" type=\"application/pdf\" />\n  </body>\n</html>\n\n--MyPartBoundary198374\nContent-Disposition:form-data; name=\"imageBlock1\"\nContent-Type:image/jpeg\n\n... binary image data ...\n\n--MyPartBoundary198374\nContent-Disposition:form-data; name=\"fileBlock1\"\nContent-Type:application/pdf\n\n... binary file data ...\n\n--MyPartBoundary198374--",
    "tip": "This query requires a section id.  To find the ID, you can run: GET https://graph.microsoft.com/v1.0/me/onenote/sections."
},
{
    "category": "SharePoint Sites",
    "method": "GET",
    "humanName": "my organization's default SharePoint site",
    "requestUrl": "/v1.0/sites/root",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/site_get"
},
{
    "category": "SharePoint Sites",
    "method": "GET",
    "humanName": "Enumerate the document libraries under the root site",
    "requestUrl": "/v1.0/sites/root/drives",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/drive_list#list-a-sites-drives"
},
{
    "category": "SharePoint Sites",
    "method": "GET",
    "humanName": "SharePoint site based on relative path of the site",
    "requestUrl": "/v1.0/sites/{host-name}:/{server-relative-path}",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/site_getbypath"
},
{
    "category": "SharePoint Sites",
    "method": "GET",
    "humanName": "Search for a SharePoint site by keyword",
    "requestUrl": "/v1.0/sites?search=contoso",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/site_search"
},
{
    "category": "SharePoint Sites",
    "method": "GET",
    "humanName": "Enumerate subsites of the root site",
    "requestUrl": "/v1.0/sites/root/sites",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/site_list_subsites"
},
{
    "category": "SharePoint Sites",
    "method": "GET",
    "humanName": "Enumerate site columns of the root site",
    "requestUrl": "/v1.0/sites/root/columns",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/site_list_columns"
},
{
    "category": "SharePoint Sites",
    "method": "GET",
    "humanName": "Enumerate site content types of the root site",
    "requestUrl": "/v1.0/sites/root/contentTypes",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/site_list_contenttypes"
},
{
    "category": "SharePoint Lists",
    "method": "GET",
    "humanName": "Enumerate the lists in the root site",
    "requestUrl": "/v1.0/sites/root/lists",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/list_list"
},
{
    "category": "SharePoint Lists",
    "method": "GET",
    "humanName": "Enumerate list columns",
    "requestUrl": "/v1.0/sites/root/lists/{list-id}/columns",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/list_list_columns"
},
{
    "category": "SharePoint Lists",
    "method": "GET",
    "humanName": "Enumerate list content types",
    "requestUrl": "/v1.0/sites/root/lists/{list-id}/contentTypes",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/list_list_contenttypes"
},
{
    "category": "SharePoint Lists",
    "method": "GET",
    "humanName": "Enumerate the list items in a list",
    "requestUrl": "/v1.0/sites/root/lists/{list-id}/items",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/listitem_list"
},
{
    "category": "SharePoint Lists",
    "method": "GET",
    "humanName": "Enumerate list items with specific column values",
    "requestUrl": "/v1.0/sites/root/lists/{list-id}/items?$filter=fields/Title eq '{title}'",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/listitem_list"
},
{
    "category": "Batching (beta)",
    "method": "POST",
    "humanName": "Perform parallel GETs",
    "requestUrl": "/beta/$batch",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/concepts/json_batching",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\"requests\" : [{\"url\" : \"/me\", \"method\" : \"GET\", \"id\" : \"1\"}, {\"url\" : \"/me/messages\", \"method\" : \"GET\", \"id\" : \"2\"}, {\"url\" : \"/me/events\", \"method\" : \"GET\", \"id\" : \"3\"}]  }",
    "tip": "This query shows you how to use batching to get your user information, your messages, and your events."
},
{
    "category": "Batching (beta)",
    "method": "POST",
    "humanName": "Combine a POST and a GET",
    "requestUrl": "/beta/$batch",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/concepts/json_batching",
    "headers": [
        {
            "name": "Content-type",
            "value": "application/json"
        }
    ],
    "postBody": "{\n \"requests\": [{\n   \"url\": \"/me/drive/root/children\",\n   \"method\": \"POST\",\n   \"id\": \"1\",\n   \"body\": {\n    \"name\": \"TestBatchingFolder\",\n    \"folder\": {}\n   },\n   \"headers\": {\n    \"Content-Type\": \"application/json\"\n   }\n  }, {\n   \"url\": \"/me/drive/root/children/TestBatchingFolder \",\n   \"method\": \"GET\",\n   \"id\": \"2\",\n   \"DependsOn\": [\"1\"]\n  }\n ]\n} ",
    "tip": "This query will create a folder called TestBatchingFolder in your OneDrive and return it back to you via a GET."
},
{
    "category": "Microsoft Teams (beta)",
    "method": "GET",
    "humanName": "my joined teams",
    "requestUrl": "/beta/me/joinedTeams",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/user_list_joinedteams"
},
{
    "category": "Microsoft Teams (beta)",
    "method": "GET",
    "humanName": "members of a team",
    "requestUrl": "/beta/groups/{group-id-for-teams}/members",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/group_list_memberof",
    "tip": "This query requires a group id of the Team.  To find the group id of Teams you belong to, you can run: GET https://graph.microsoft.com/beta/me/joinedTeams"
},
{
    "category": "Microsoft Teams (beta)",
    "method": "GET",
    "humanName": "channels of a team which I am member of",
    "requestUrl": "/beta/groups/{group-id-for-teams}/channels",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/group_list_channels",
    "tip": "This query requires a group id of the Team.  To find the group id of Teams you belong to, you can run: GET https://graph.microsoft.com/beta/me/joinedTeams"
},
{
    "category": "Microsoft Teams (beta)",
    "method": "GET",
    "humanName": "channel info",
    "requestUrl": "/beta/groups/{group-id-for-teams}/channels/{channel-id}",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/channel_get",
    "tip": "This query requires a group id of the Team and channel id of the corresponding channel of that Team. To find the group id  & channel id, you can run: 1) GET https://graph.microsoft.com/beta/me/joinedTeams 2) GET https://graph.microsoft.com/beta/groups/{group-id-for-teams}/channels"
},
{
    "category": "Microsoft Teams (beta)",
    "method": "POST",
    "humanName": "create channel",
    "requestUrl": "/beta/groups/{group-id-for-teams}/channels",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/group_post_channels",
    "postBody": "{\n   \"displayName\": \"Architecture Discussion\",\t\t\n   \"description\": \"This channel is where we debate all future architecture plans\"\t\t\n }",
    "tip": "This query requires a group id of the Team.  To find the group id of Teams you belong to, you can run: GET https://graph.microsoft.com/beta/me/joinedTeams"
},
{
    "category": "Microsoft Teams (beta)",
    "method": "POST",
    "humanName": "create chat thread",
    "requestUrl": "/beta/groups/{group-id-for-teams}/channels/{channel-id}/chatThreads",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/channel_post_chatthreads",
    "postBody": "{\n\"rootMessage\": {\n       \"body\": {\n         \"contentType\": 2,\t\t\n         \"content\": \"Hello world\"\t\t\n       }\t\t\n   }\t\t\n }",
    "tip": "This query requires a group id of the Team and channel id of the corresponding channel of that Team. To find the group id  & channel id, you can run: 1) GET https://graph.microsoft.com/beta/me/joinedTeams 2) GET https://graph.microsoft.com/beta/groups/{group-id-for-teams}/channels"
},
{
    "category": "Microsoft Teams (beta)",
    "method": "GET",
    "humanName": "items in a team drive",
    "requestUrl": "/beta/groups/{group-id-for-teams}/drive/root/children",
    "docLink": "https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/item_list_children",
    "tip": "This query requires a group id of the Team.  To find the group id of Teams you belong to, you can run: GET https://graph.microsoft.com/beta/me/joinedTeams"
}]