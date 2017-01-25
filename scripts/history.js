var requestHistory = [];
var LocalStorageKeyGraphRequestHistory = "GRAPH_REQUEST_HISTORY";

function saveHistoryToLocalStorage() {
    localStorage.setItem(LocalStorageKeyGraphRequestHistory, JSON.stringify(requestHistory));
}

function loadHistoryFromLocalStorage() {
    var possibleHistory = localStorage.getItem(LocalStorageKeyGraphRequestHistory);

    if (possibleHistory == null) {
        return;
    }

    requestHistory = JSON.parse(possibleHistory);
}


function saveHistoryObject(historyObject, statusCode, duration) {
    historyObject.successful = statusCode >= 200 && statusCode < 300;
    historyObject.statusCode = statusCode;
    historyObject.duration = duration;
    historyObject.requestId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

    requestHistory.splice(0, 0, historyObject); //add history object to the array

    saveHistoryToLocalStorage();
}


// init scripts


loadHistoryFromLocalStorage();