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
        <div title="{{isAuthenticated() ? null : getStr('login to send requests')}}" #httpMethod class="c-select f-border first-row-mobile bump-flex-row-mobile">
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
    ngAfterViewInit(): void {
        // Init httpMethod
        mwf.ComponentFactory.create([{
            component: mwf.Select,
            elements: [this.httpMethodEl.element.nativeElement],
            callback: (event:any) => {
                event[0].selectMenu.subscribe({
                    onSelectionChanged: (method) => {
                        this.explorerValues.selectedOption = method.id;
                    }
                })
            }
        }]);

        const httpMethodSelectMenu = this.httpMethodEl.element.nativeElement.mwfInstances.t.selectMenu;

        let elementIdxToSelect = httpMethodSelectMenu.items[this.methods.indexOf(this.explorerValues.selectedOption)];
        httpMethodSelectMenu.onItemSelected(elementIdxToSelect);

        // init Graph version selector
        mwf.ComponentFactory.create([{
            component: mwf.Select,
            elements: [this.graphVersionEl.element.nativeElement],
            callback: (event:any) => {
                event[0].selectMenu.subscribe({
                    onSelectionChanged: (method) => {
                        this.explorerValues.selectedVersion = method.id;
                    }
                })
            }
        }]);

        const graphVersionSelectMenu = this.graphVersionEl.element.nativeElement.mwfInstances.t.selectMenu;

        let graphVersionIdx = graphVersionSelectMenu.items[this.GraphVersions.indexOf(this.explorerValues.selectedVersion)];
        graphVersionSelectMenu.onItemSelected(graphVersionIdx);
    }

    ngOnInit(): void { }

    @ViewChild('httpMethod', {read: ViewContainerRef}) httpMethodEl;
    @ViewChild('graphVersion', {read: ViewContainerRef}) graphVersionEl;

    methods = Methods;
    GraphVersions = AppComponent.options.GraphVersions;
}