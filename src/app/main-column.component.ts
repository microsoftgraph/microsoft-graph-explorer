import { Component, OnInit, AfterViewInit, ViewChild, ContentChildren, ViewContainerRef } from '@angular/core';
import { AuthenticationStatus, GraphApiCall, HistoryRecord, Methods, ExplorerValues } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { AppComponent } from "./app.component";

declare let mwf:any;

@Component({
  selector: 'main-column',
  template: `
    <div id="request-bar-row-form" layout="row" layout-align="start center">

        <!-- HTTP METHOD -->
        <div [title]="isAuthenticated() ? '' : getStr('login to send requests')" #httpMethod class="c-select f-border first-row-mobile bump-flex-row-mobile">
            <select [disabled]="!isAuthenticated()">
                <option *ngFor="let choice of methods">{{choice}}</option>
            </select>
        </div>

        <!-- version button -->

        <div class="c-select f-border first-row-mobile bump-flex-row-mobile" #graphVersion>
            <select>
                <option *ngFor="let version of GraphVersions">{{version}}</option>
            </select>
        </div>

                
        <md-input-container>
            <input type="text" mdInput [mdAutocomplete]="auto">
        </md-input-container>

        <md-autocomplete #auto="mdAutocomplete">
            <md-option *ngFor="let option of methods" [value]="option">
                {{ option }}
            </md-option>
        </md-autocomplete>

    </div>


  `,
  styles: [`
    /* make url bar responsive*/
    #request-bar-row-form {
        display: flex;
        flex-wrap: wrap;
    }
    #request-bar-row-form::after {
        content: '';
        width: 100%;
    }

    .c-select.f-border {
        min-width: inherit;
    }


    @media (max-width: 639px) {
        .bump-flex-row-mobile {
            order: 1;
            margin: 0px auto;
        }
        md-autocomplete {
            min-width: 100% !important;
        }
    }

    .c-select:after {
        display: none;
    }


  `]
})


export class MainColumnComponent extends GraphExplorerComponent implements OnInit, AfterViewInit {
    static httpMethodEl;
    ngAfterViewInit(): void {
        MainColumnComponent.httpMethodEl = this._httpMethodEl;
        // Init httpMethod
        mwf.ComponentFactory.create([{
            component: mwf.Select,
            elements: [this._httpMethodEl.element.nativeElement],
            callback: (event:any) => {
                event[0].selectMenu.subscribe({
                    onSelectionChanged: (method) => {
                        this.explorerValues.selectedOption = method.id;
                    }
                })
            }
        }]);

        updateHttpMethod();


        // init Graph version selector
        mwf.ComponentFactory.create([{
            component: mwf.Select,
            elements: [this._graphVersionEl.element.nativeElement],
            callback: (event:any) => {
                event[0].selectMenu.subscribe({
                    onSelectionChanged: (method) => {
                        this.explorerValues.selectedVersion = method.id;
                    }
                })
            }
        }]);

        const graphVersionSelectMenu = this._graphVersionEl.element.nativeElement.mwfInstances.t.selectMenu;

        const graphVersionIdx = graphVersionSelectMenu.items[this.GraphVersions.indexOf(this.explorerValues.selectedVersion)];
        graphVersionSelectMenu.onItemSelected(graphVersionIdx);
    }

    ngOnInit(): void { }

    @ViewChild('httpMethod', {read: ViewContainerRef}) _httpMethodEl;
    @ViewChild('graphVersion', {read: ViewContainerRef}) _graphVersionEl;

    methods = Methods;
    GraphVersions = AppComponent.Options.GraphVersions;
}

export function updateHttpMethod() {
    const httpMethodSelectMenu = MainColumnComponent.httpMethodEl.element.nativeElement.mwfInstances.t.selectMenu;

    const elementIdxToSelect = httpMethodSelectMenu.items[Methods.indexOf(AppComponent.explorerValues.selectedOption)];
    httpMethodSelectMenu.onItemSelected(elementIdxToSelect);
}