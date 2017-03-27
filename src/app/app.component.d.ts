import { OnInit } from '@angular/core';
import { ExplorerOptions, ExplorerValues } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { GraphService } from "./api-explorer-svc";
export declare class AppComponent extends GraphExplorerComponent implements OnInit {
    private GraphService;
    constructor(GraphService: GraphService);
    ngOnInit(): void;
    static options: ExplorerOptions;
    static explorerValues: ExplorerValues;
}
