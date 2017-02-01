declare let requestHistory: HistoryRecord[];
interface HistoryRecord {
    successful: boolean;
    statusCode: number;
    duration: number;
    requestId: string;
}
declare const LocalStorageKeyGraphRequestHistory = "GRAPH_REQUEST_HISTORY";
declare function saveHistoryToLocalStorage(): void;
declare function loadHistoryFromLocalStorage(): void;
declare function saveHistoryObject(historyObject: HistoryRecord, statusCode: number, duration: number): void;
