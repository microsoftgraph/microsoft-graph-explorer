// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { GraphApiCall } from "./base";

const LocalStorageKeyGraphRequestHistory = "GRAPH_V4.1_REQUEST_HISTORY";

export function saveHistoryToLocalStorage(requestHistory:GraphApiCall[]) {
    localStorage.setItem(LocalStorageKeyGraphRequestHistory, JSON.stringify(requestHistory));
}

export function loadHistoryFromLocalStorage():GraphApiCall[] {
    let possibleHistory = localStorage.getItem(LocalStorageKeyGraphRequestHistory);

    if (!possibleHistory) {
        return [];
    }

    return JSON.parse(possibleHistory);
}