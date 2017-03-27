"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requestHistory = [];
var LocalStorageKeyGraphRequestHistory = "GRAPH_V3_REQUEST_HISTORY";
function saveHistoryToLocalStorage() {
    localStorage.setItem(LocalStorageKeyGraphRequestHistory, JSON.stringify(requestHistory));
}
function loadHistoryFromLocalStorage() {
    var possibleHistory = localStorage.getItem(LocalStorageKeyGraphRequestHistory);
    if (possibleHistory == null) {
        return null;
    }
    requestHistory = JSON.parse(possibleHistory);
}
function saveHistoryObject(historyObject) {
    historyObject.requestSentAt = new Date();
    historyObject.successful = historyObject.statusCode >= 200 && historyObject.statusCode < 300;
    historyObject.requestId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
    requestHistory.splice(0, 0, historyObject);
    saveHistoryToLocalStorage();
}
exports.saveHistoryObject = saveHistoryObject;
function fetchRequestHistory() {
    return requestHistory;
}
exports.fetchRequestHistory = fetchRequestHistory;
function clearRequestHistory() {
    requestHistory = [];
    saveHistoryToLocalStorage();
}
exports.clearRequestHistory = clearRequestHistory;
loadHistoryFromLocalStorage();
function safeGetRequestHistory() {
    return loadHistoryFromLocalStorage() || [];
}
exports.safeGetRequestHistory = safeGetRequestHistory;
//# sourceMappingURL=history.js.map