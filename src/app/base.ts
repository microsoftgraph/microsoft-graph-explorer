// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Tokens } from "./tokens";
import { isAuthenticated } from "./auth";

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
];

/**
 * Tokens are used as placeholder values in sample queries to cover many scenarios:
 * - ID tokens for sample tenant nodes like user IDs, file IDs and other string constants
 * - Tokens that must be determined at runtime like the current date
 * - Tokens that are determined from the authenticated users session
 * - Tokens can be in the POST body or part of the URL
 *
 * The token fields are split into default, demo and authenticated. If neither the demo or
 * auth values are supplied, the token falls back to the default value.
 *
 * Tokens are maintained in tokens.ts.
 */

export interface Token {
    placeholder: string

    // base defaults to replace the placeholder with. Not used if any of the below are defined
    defaultValue?: string
    defaultValueFn?: Function

    // when the user is not authenticated, use these values for the demo tenant
    demoTenantValue?: string
    demoTenantValueFn?: Function

    // when the user is authenticated with MSA or AAD, replace token with these values
    authenticatedUserValue?: string
    authenticatedUserValueFn?: Function
}

/*
 * Given a token, go through each of the possible replacement scenarios and find which value to
 * replace the token with.
 * Order: Authenticated user values, demo tenant replacament values, default replacement values.
 */
function getTokenSubstituteValue(token:Token) {
    let priorityOrder = []; // desc

    if (isAuthenticated()) {
        priorityOrder.push(token.authenticatedUserValueFn);
        priorityOrder.push(token.authenticatedUserValue);
    } else {
        priorityOrder.push(token.demoTenantValueFn);
        priorityOrder.push(token.demoTenantValue);
    }

    priorityOrder.push(token.defaultValueFn);
    priorityOrder.push(token.defaultValue);

    for (let tokenVal of priorityOrder) {
        if (!tokenVal) {
            continue;
        }
        if (typeof tokenVal === "string") {
            return tokenVal;
        } else if (typeof tokenVal === "function") {
            return tokenVal();
        }
    }

}

/**
 * Given a query, replace all tokens in the request URL and the POST body with thier
 * values.  When a token is found, use getTokenSubstituteValue() to find the right
 * value to substitute based on the session.
 */
export function substituteTokens(query:SampleQuery) {
    type QueryFields = keyof GraphApiCall;

    for (let token of Tokens) {
        let queryFieldsToCheck:QueryFields[] = ['requestUrl', 'postBody'];

        for (let queryField of queryFieldsToCheck) {
            if (!query[queryField]) { // if the sample doesn't have a post body, don't search for tokens in it
                continue;
            }

            if ((query[queryField] as string).indexOf(`{${token.placeholder}}`) !== -1) {
                let substitutedValue = getTokenSubstituteValue(token);
                if (!substitutedValue) {
                    continue;
                }
                query[queryField] = (query[queryField] as string).replace(`{${token.placeholder}}`, substitutedValue);
            }
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
    "https://canary.graph.microsoft.com",
    "https://microsoftgraph.chinacloudapi.cn"
]