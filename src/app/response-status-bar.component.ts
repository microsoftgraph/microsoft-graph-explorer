import { Component, OnInit, Input } from '@angular/core';
import { GraphApiCall } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { getString } from "./api-explorer-helpers";
import { AppComponent } from "./app.component";

@Component({
  selector: 'response-status-bar',
  template: `
    <div class="ms-MessageBar ms-MessageBar-singleline" [ngClass]="{'ms-MessageBar--success': success, 'ms-MessageBar--error': !success, 'hide-action-bar':!query()}">
        <div class="ms-MessageBar-content">
            <div class="ms-MessageBar-icon">
                <i class="ms-Icon" [ngClass]="{'ms-Icon--Completed': success, 'ms-Icon--errorBadge': !success}" ></i>
            </div>
            <div class="ms-MessageBar-actionables">
                <div class="ms-MessageBar-text" *ngIf="query()">
                    {{createTextSummary()}}<span id="duration-label">{{query().duration}}ms</span>
                </div>
            </div>
            <div class="ms-MessageBar-actionsOneline">
                <div id="dismiss-btn" class="ms-MessageBar-icon">
                    <a href="#" (click)="clearLastCallMessage()"><i class="ms-Icon ms-Icon--Cancel" style="padding-right: 10px;" title="LightningBolt" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
    </div>
    `,
    styles: [`

    .ms-MessageBar {
        width: 100%;
        margin: 0px auto;
        font-size: 15px;
    }

    span#duration-label {
        font-weight: 800;
        margin-left: 40px;
    }


    .ms-MessageBar-content {
        padding: 6px;
    }
    .ms-MessageBar-content div {
        float: left;
    }
    .ms-MessageBar-content .ms-MessageBar-actionsOneline {
        float: right;
    }
    .hide-action-bar {
        opacity: 0;
    }

`]
})
export class ResponseStatusBarComponent extends GraphExplorerComponent {
    success:boolean;

    query() {
        return AppComponent.lastApiCall;
    }

    createTextSummary() {
        this.success = AppComponent.lastApiCall.statusCode >= 200 && AppComponent.lastApiCall.statusCode < 300;
        let text = "";
        if (this.success) {
            text += this.getStr("Success");
        } else {
            text += this.getStr("Failure");
        }

        text += ` - ${this.getStr("Status Code")} ${AppComponent.lastApiCall.statusCode}`
        return text;
    }

    clearLastCallMessage() {
        AppComponent.lastApiCall = null;
    }
}