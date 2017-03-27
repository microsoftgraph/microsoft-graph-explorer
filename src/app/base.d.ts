export declare const runInTestMode: boolean;
export interface ExplorerOptions {
    AuthUrl?: string;
    GraphUrl?: string;
    ClientId?: string;
    Language?: string;
    AdminScopes?: string;
    RedirectUrl?: string;
    UserScopes?: string;
    GraphVersions?: string[];
}
export declare type AuthenticationStatus = "anonymous" | "authenticating" | "authenticated";
export declare type RequestType = "GET" | "POST" | "GET_BINARY" | "POST" | "PATCH" | "DELETE";
export interface GraphApiCall {
    statusCode?: number;
    duration?: number;
    method?: RequestType;
    humanName?: string;
    requestUrl?: string;
}
export interface HistoryRecord extends GraphApiCall {
    successful?: boolean;
    requestId?: string;
    selectedVersion?: string;
    jsonInput?: string;
    requestSentAt?: Date;
}
