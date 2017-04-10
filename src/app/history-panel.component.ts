import { Component } from '@angular/core';
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { HistoryRecord } from "./base";
import { AppComponent } from "./app.component";


@Component({
  selector: 'history-panel',
  styles: [`

    /* Make selected rows in history panel the same color as other rows */
    .ms-Table-row.is-selected, .ms-Table tr.is-selected {
        background-color: inherit;
    }

`],
  template: `
        <div id="history-panel" class="ms-Panel ms-Panel--xl">
            <button class="ms-Panel-closeButton ms-PanelAction-close" tabindex="1">
                <i class="ms-Panel-closeIcon ms-Icon ms-Icon--Cancel"></i>
            </button>
            <div class="ms-Panel-contentInner">
                <p class="ms-Panel-headerText">{{getStr('History')}}</p>
                <div class="ms-Panel-content">
                    
                <table class="ms-Table ms-Table--selectable">
                <thead>
                    <tr>
                        <th>{{getStr('Method')}}</th>
                        <th>{{getStr('Query')}}</th>
                        <th>{{getStr('Status Code')}}</th>
                        <th>{{getStr('Duration')}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let query of getRequestHistory()" (click)="runQuery(query); closeHistoryPanel();">
                        <td>{{query.method}}</td>
                        <td>{{query.requestUrl}}</td>
                        <td>{{query.statusCode}}</td>
                        <td>{{query.duration}} ms</td>
                    </tr>
                </tbody>
                </table>
                </div>
            </div>
        </div>
     `,
})
export class HistoryPanelComponent extends GraphExplorerComponent {
    closeHistoryPanel = () => {
        (document.querySelector("#history-panel .ms-Panel-closeButton") as any).click()
    };
}
