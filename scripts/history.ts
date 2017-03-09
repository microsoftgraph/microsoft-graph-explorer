
import { HistoryRecord } from "./base";

export let requestHistory: HistoryRecord[] = [];

const LocalStorageKeyGraphRequestHistory = "GRAPH_REQUEST_HISTORY";

function saveHistoryToLocalStorage() {
    localStorage.setItem(LocalStorageKeyGraphRequestHistory, JSON.stringify(requestHistory));
}

function loadHistoryFromLocalStorage() {
    let possibleHistory = localStorage.getItem(LocalStorageKeyGraphRequestHistory);

    if (possibleHistory == null) {
        return;
    }

    requestHistory = JSON.parse(possibleHistory);
}

export function saveHistoryObject(historyObject:HistoryRecord) {
    historyObject.successful = historyObject.statusCode >= 200 && historyObject.statusCode < 300;
    historyObject.requestId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

    requestHistory.splice(0, 0, historyObject); //add history object to the array

    saveHistoryToLocalStorage();
}

export function fetchRequestHistory() {
    return requestHistory;
}

export function clearRequestHistory() {
    requestHistory = [];
    saveHistoryToLocalStorage();
}


// init scripts
loadHistoryFromLocalStorage();