import { Query } from "./api-explorer-svc";

export const GettingStartedQueries: Query[] = [
    {
        humanName: "my profile",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/"
    },
    {
        humanName: "my files",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/drive/root/children"
    },
    {
        humanName: "my photo",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/photo/$value"
    },
    {
        humanName: "my mail",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/messages"
    },
    {
        humanName: "my high importance mail",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/messages?$filter=importance eq 'high'"
    },
    {
        humanName: "my calendar",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/calendar"
    },
    {
        humanName: "my manager",
        method: "GET",
        requestUrl: "https://graph.microsoft.com/v1.0/me/manager"
    }
];