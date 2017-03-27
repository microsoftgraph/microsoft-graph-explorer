import { GraphApiCall } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
export declare class QueryRowComponent extends GraphExplorerComponent {
    query: GraphApiCall;
    getTitle: () => any;
    getQueryText: () => any;
    runQuery: () => void;
}
