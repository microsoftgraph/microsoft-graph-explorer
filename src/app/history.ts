// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { HistoryRecord } from "./base";

const LocalStorageKeyGraphRequestHistory = "GRAPH_V4_REQUEST_HISTORY";

export function saveHistoryToLocalStorage(requestHistory:HistoryRecord[]) {
    localStorage.setItem(LocalStorageKeyGraphRequestHistory, JSON.stringify(requestHistory));
}

export function loadHistoryFromLocalStorage():HistoryRecord[] {
    let possibleHistory = localStorage.getItem(LocalStorageKeyGraphRequestHistory);

    if (possibleHistory == null) {
        return [];
    }

    return JSON.parse(possibleHistory);
}