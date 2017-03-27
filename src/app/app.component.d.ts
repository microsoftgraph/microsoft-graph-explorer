import { OnInit } from '@angular/core';
import { ExplorerOptions } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
export declare class AppComponent extends GraphExplorerComponent implements OnInit {
    ngOnInit(): void;
    static options: ExplorerOptions;
}
