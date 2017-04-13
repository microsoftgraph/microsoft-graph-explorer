// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

export const runInTestMode = typeof document === "undefined";

export interface ExplorerOptions {
    AuthUrl?: string,
    GraphUrl?: string,
    ClientId?: string,
    Language?: string,
    AdminScopes?: string,
    RedirectUrl?: string,
    UserScopes?: string,
    GraphVersions?: string[]
}

export let Methods:RequestType[] = [
    'GET',
    'POST',
    'PATCH',
    'DELETE'
];

export type AuthenticationStatus = "anonymous" | "authenticating" | "authenticated";

export type RequestType = "GET" | "POST" | "GET_BINARY" | "POST" | "PATCH" | "DELETE";

export interface GraphApiCall {
    statusCode?: number
    duration?: number
    method?: RequestType
    humanName?: string
    requestUrl?: string
}

export interface SampleQuery extends GraphApiCall {
    docLink?: string
    AAD?: boolean
    MSA?: boolean
    category: string
}

export interface SampleQueryCategory {
    title: string
    enabled?: boolean
    queries?: SampleQuery[]
}

export interface HistoryRecord extends GraphApiCall {
    requestId?: string
    // selectedVersion?: string // take from requestUrl
    requestBody?: string
    requestHeaders?: string
    requestSentAt?: Date
    relativeDate?: string
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
    requestInProgress: boolean
}

export interface AutoCompleteItem {
    url: string
    fullUrl: string
}
