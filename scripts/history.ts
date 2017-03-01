export let requestHistory:HistoryRecord[] = [];

export interface HistoryRecord {
    successful?: boolean,
    statusCode?: number,
    duration?: number,
    requestId?: string,
    urlText?: string,
    selectedVersion?: string,
    htmlOption?: string,
    jsonInput?: string
}

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

export function saveHistoryObject(historyObject:HistoryRecord, statusCode: number) {
    historyObject.successful = statusCode >= 200 && statusCode < 300;
    historyObject.statusCode = statusCode;
    historyObject.requestId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

    requestHistory.splice(0, 0, historyObject); //add history object to the array

    saveHistoryToLocalStorage();
}

export function fetchRequestHistory() {
    return requestHistory;
}


// init scripts
loadHistoryFromLocalStorage();