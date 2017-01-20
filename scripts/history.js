var requestHistory = [];
var LocalStorageKeyGraphRequestHistory = "GRAPH_REQUEST_HISTORY";

function saveHistoryToLocalStorage() {
    localStorage.setItem(LocalStorageKeyGraphRequestHistory, JSON.stringify(requestHistory));
}

function loadHistoryFromLocalStorage() {
    var possibleHistory = localStorage.getItem(LocalStorageKeyGraphRequestHistory);
    if (possibleHistory != null) {
        requestHistory = JSON.parse(possibleHistory);
        requestHistory = requestHistory.filter(function(value, index, self) { 
            return self.indexOf(value) === index;   
        });
    }
}


function saveHistoryObject(historyObject, statusCode, duration) {
    historyObject.successful = statusCode >= 200 && statusCode < 300;
    historyObject.statusCode = statusCode;
    historyObject.duration = duration;
    requestHistory.splice(0, 0, historyObject); //add history object to the array

    saveHistoryToLocalStorage();
}


// init scripts


loadHistoryFromLocalStorage();

