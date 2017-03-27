import { GraphApiCall, HistoryRecord } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
export declare class SidebarComponent extends GraphExplorerComponent {
    queries: GraphApiCall[];
    getRequestHistory: (limit?: number) => HistoryRecord[];
}
