import { HistoryRecord } from "./base";
export declare function saveHistoryObject(historyObject: HistoryRecord): void;
export declare function fetchRequestHistory(): HistoryRecord[];
export declare function clearRequestHistory(): void;
export declare function safeGetRequestHistory(): HistoryRecord[];
