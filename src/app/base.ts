// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AppComponent } from "./app.component";

export interface ExplorerOptions {
    AuthUrl?: string
    GraphUrl?: string
    ClientId?: string
    Language?: string
    RedirectUrl?: string
    DefaultUserScopes?: string
    GraphVersions?: string[]
    PathToBuildDir: string
}

export let Methods:RequestType[] = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE'
];


export type GraphApiVersion = "v1.0" | "beta";
export let GraphApiVersions:GraphApiVersion[] = ["v1.0", "beta"];

export type AuthenticationStatus = "anonymous" | "authenticating" | "authenticated";

export type RequestType = "GET" | "PUT" | "POST" | "GET_BINARY" | "POST" | "PATCH" | "DELETE";

export interface PermissionScope {
  name: string
  description: string
  longDescription: string
  preview: boolean
  admin: boolean

  enabled?: boolean

  /**
   * Used in the scopes dialog for checking/unchecking before scope is actually enabled in the token.
   */
  enabledTarget?: boolean
}

export interface GraphApiCall {
    statusCode?: number
    duration?: number
    method?: RequestType
    humanName?: string
    requestUrl?: string
    postBody?: string
    headers?: GraphRequestHeader[]

    requestSentAt?: Date
    relativeDate?: string

}

export interface SampleQuery extends GraphApiCall {
    docLink?: string
    AAD?: boolean
    MSA?: boolean
    category: string
    tip?: string
}

export interface SampleQueryCategory {
    title: string
    enabled?: boolean
    queries?: SampleQuery[]
}

export interface ExplorerValues {
    selectedOption?: RequestType
    selectedVersion?: GraphApiVersion
    endpointUrl?: string
    authentication?: {
        status?: AuthenticationStatus
        user?: {
            displayName?: string
            emailAddress?: string
            profileImageUrl?: string
        }
    }
    showImage?: boolean
    requestInProgress?: boolean,
    headers?: GraphRequestHeader[]
    postBody?: string
}

export interface GraphRequestHeader {
    name: string
    value: string
    enabled?: boolean
    readonly?: boolean
}

export interface AutoCompleteItem {
    url: string
    fullUrl: string
}

export const CommonHeaders = [
    "Accept",
    "Accept-Charset",
    "Accept-Encoding",
    "Accept-Language",
    "Accept-Datetime",
    "Authorization",
    "Cache-Control",
    "Connection",
    "Cookie",
    "Content-Length",
    "Content-MD5",
    "Content-Type",
    "Date",
    "Expect",
    "Forwarded",
    "From",
    "Host",
    "If-Match",
    "If-Modified-Since",
    "If-None-Match",
    "If-Range",
    "If-Unmodified-Since",
    "Max-Forwards",
    "Origin",
    "Pragma",
    "Proxy-Authorization",
    "Range",
    "User-Agent",
    "Upgrade",
    "Via",
    "Warning"
]

let today = new Date();
let nextWeek = new Date();
nextWeek.setDate(today.getDate()+7);

const Tokens = {
    "{user-mail}": "annew@CIE493742.onmicrosoft.com",
    "{group-id}": "8f4e3cfd-432d-4b9a-b801-f424aaf08ca1",
    "{drive-item-id}": "01ZDJCYOZPW7IKQNDL3NHZVRODY2GC2YKW",
    "{section-id}": "1-fb22b2f1-379f-4da4-bf7b-be5dcca7b99a",
    "{notebook-id}": "1-fb22b2f1-379f-4da4-bf7b-be5dcca7b99a",
    "{group-id-with-plan}": "d2b6c7fe-f440-446b-99d8-9ac12e036bf0",
    "{plan-id}": "RVBp6oJJt0K5f6Lq42zBK2UAA-Rs",
    "{task-id}": "9jBI6WHDwk60lEWpL4TQ92UAGLhh",
    "{extension-id}": "com.contoso.roamingSettings",
    "{host-name}": "cie493742.sharepoint.com",
    "{server-relative-path}": "sites/Contoso/Operations/Manufacturing",
    "{group-id-for-teams}": "d2b6c7fe-f440-446b-99d8-9ac12e036bf0",
    "{channel-id}": "ee3f919c-28e1-4659-86d2-8e37e581335c",
    "{today}": today.toISOString(),
    "{next-week}": nextWeek.toISOString(),
    "AUTHENTICATED_DOMAIN": () => {
        try {
            return AppComponent.explorerValues.authentication.user.emailAddress.split("@")[1];
        } catch(e) {
            return "example@contoso.com"
        }
    },
    "FULL_USER_EMAIL": () => {
        try {
            return AppComponent.explorerValues.authentication.user.emailAddress;
        } catch(e) {
            return "example@contoso.com"
        }
    }
}

export function substitueTokens(query:SampleQuery) {
    for (let token in Tokens) {
        if (query.requestUrl.indexOf(token) !== -1) {
            query.requestUrl = query.requestUrl.replace(token, Tokens[token]);
        }
    }
}

export function substituePostBodyTokens(query:SampleQuery) {
    for (let token in Tokens) {
        if (query.postBody.indexOf(token) !== -1) {
            let val;
            if (typeof Tokens[token] === "string") {
                val = Tokens[token];
            } else {
                val = Tokens[token]();
            }
            query.postBody = query.postBody.replace(token, val);
        }
    }
}

export interface Message {
    title: string
    body: string
}

export interface MessageBarContent {
    icon: string
    backgroundClass: string
    text: string
}

export let AllowedGraphDomains = [
    "https://graph.microsoft.com",
    "https://microsoftgraph.chinacloudapi.cn"
]