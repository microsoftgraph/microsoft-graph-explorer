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

export let Methods = [
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

export interface HistoryRecord extends GraphApiCall {
    requestId?: string
    // selectedVersion?: string // take from requestUrl
    requestBody?: string
    requestHeaders?: string
    requestSentAt?: Date
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
}

export interface AutoCompleteItem {
    url: string
    fullUrl: string
}
