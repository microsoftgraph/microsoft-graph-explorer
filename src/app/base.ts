// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import {Headers} from "@angular/http"

export const runInTestMode = typeof document === "undefined";

export interface ExplorerOptions {
    AuthUrl?: string
    GraphUrl?: string
    ClientId?: string
    Language?: string
    AdminScopes?: string
    RedirectUrl?: string
    UserScopes?: string
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

export type AuthenticationStatus = "anonymous" | "authenticating" | "authenticated";

export type RequestType = "GET" | "PUT" | "POST" | "GET_BINARY" | "POST" | "PATCH" | "DELETE";

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
    postBodyTemplateName?: string
    postBodyTemplateContents?: string
}

export interface SampleQueryCategory {
    title: string
    enabled?: boolean
    queries?: SampleQuery[]
}

export interface ExplorerValues {
    selectedOption: RequestType
    selectedVersion: string
    endpointUrl: string
    authentication: {
        status?: AuthenticationStatus
        user?: {
            displayName?: string
            emailAddress?: string
            profileImageUrl?: string
        }
    }
    showImage: boolean
    requestInProgress: boolean,
    headers: GraphRequestHeader[]
    postBody: string
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