export const runInTestMode = typeof document === "undefined";

export type AuthenticationStatus = "anonymous" | "authenticating" | "authenticated";

export type RequestType = "GET" | "POST" | "GET_BINARY" | "POST" | "PATCH" | "DELETE";

export interface GraphApiCall {
    statusCode?: number,
    duration?: number,
    method?: RequestType
    humanName?: string
    requestUrl?: string
}

export interface HistoryRecord extends GraphApiCall {
    successful?: boolean,
    requestId?: string,
    selectedVersion?: string,
    jsonInput?: string,
    requestSentAt?: Date
}