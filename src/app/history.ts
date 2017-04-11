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