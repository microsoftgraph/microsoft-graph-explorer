"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GraphExplorerComponent_1 = require("./GraphExplorerComponent");
var getting_started_queries_1 = require("./getting-started-queries");
var history_1 = require("./history");
var SidebarComponent = (function (_super) {
    __extends(SidebarComponent, _super);
    function SidebarComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queries = getting_started_queries_1.GettingStartedQueries;
        _this.getRequestHistory = function (limit) {
            if (limit)
                return history_1.safeGetRequestHistory().slice(0, limit);
            return history_1.safeGetRequestHistory();
        };
        return _this;
    }
    return SidebarComponent;
}(GraphExplorerComponent_1.GraphExplorerComponent));
SidebarComponent = __decorate([
    core_1.Component({
        selector: 'sidebar',
        template: "\n      <div id=\"explorer-sidebar\">\n        <div class=\"arrow-left\"></div>\n        <div>\n            <span id=\"explorer-title\" class=\"c-heading-3 panel-header\">{{getStr(['Graph Explorer'])}}</span>\n        </div>\n        <div class=\"c-drawer\">\n            <button id=\"auth-drawer-button\" class=\"c-glyph\" aria-expanded=\"true\" disabled=\"true\" aria-controls=\"authDrawer\">\n                  <span class=\"c-heading-5 panel-header\"><i class=\"ms-Icon ms-Icon--Permissions\" aria-hidden=\"true\"></i>{{getStr(['Authentication'])}}</span></button>\n            <div id=\"authDrawer\" class=\"panel-content\">\n\n              <authentication></authentication>\n            </div>\n        </div>\n\n        <div class=\"c-drawer\">\n            <button class=\"c-glyph\" aria-expanded=\"true\" aria-controls=\"refineDrawer\">\n                \n                <span class=\"c-heading-5 panel-header\"><img  id=\"getting-started-svg\" src=\"{{getAssetPath('assets/images/rocket1.svg')}}\"/>{{getStr(['Getting Started'])}}</span></button>\n            <div id=\"refineDrawer\" class=\"panel-content\">\n                <div getting-started>\n                    <query-row [query]=\"query\" *ngFor=\"let query of queries\"></query-row>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"c-drawer\">\n            <button class=\"c-glyph\" aria-expanded=\"true\" aria-controls=\"historyDrawer\">\n                  <span class=\"c-heading-5 panel-header\"><i class=\"ms-Icon ms-Icon--History\" aria-hidden=\"true\"></i>{{getStr('History')}}</span></button>\n            <div id=\"historyDrawer\" class=\"panel-content\">\n                <query-row [query]=\"query\" *ngFor=\"let query of getRequestHistory(5)\">\n                    <div class=\"history-row-2\">\n                        <span class=\"date\">{{query.requestSentAt}} ms</span>\n                        <span class=\"status-code\"  ng-class=\"{'success': query.successful, 'error': !query.successful}\">{{query.statusCode}}</span>\n                        <span class=\"duration\">{{query.duration}} ms</span>\n                    </div>\n                </query-row>\n                <a href=\"#\" id=\"show-full-history\" *ngIf=\"getRequestHistory().length > 0\" class=\"c-hyperlink\" tabindex=0 (click)=\"logout()\">{{getStr('Show More')}}</a>\n            </div>\n        </div>\n\n  </div>\n\n  ",
        styles: ["\n    #explorer-sidebar {\n        background: #2F2F2F!important;\n        height: 1024px;\n        padding: 0px;\n        /*height: 100%;*/\n        color: white;\n      \tfont-family: \"Segoe UI\", Frutiger, \"Frutiger Linotype\", \"Dejavu Sans\", \"Helvetica Neue\", Arial, sans-serif;\n\n    }\n\n    #explorer-sidebar .c-hyperlink {\n        color: #00bcf2;\n    }\n\n\n    #getting-started-svg {\n        display: inline-block;\n        width: 29px;\n        height: 29px;\n        margin: -2px 4px 2px -4px;\n    }\n\n    a#show-full-history {\n        float: right;\n        margin-right: 27px;\n    }\n\n\n    span#explorer-title {\n        margin-left: 40px;\n        margin-top: 14px;\n    }\n\n    .c-drawer {\n        padding-bottom: 5px;\n    }\n\n    #explorer-sidebar .panel-header {\n        font-family: \"Segoe UI\",\"wf_segoe-ui_normal\",\"Arial\",sans-serif;\n        display: inline-block;\n        padding: 0px;\n        padding-left: 6px;\n        font-weight: 100;\n        color: white;\n    }\n\n    #explorer-sidebar .panel-content {\n        padding-left: 46px;\n        font-size: 13px;\n    }\n\n    #explorer-sidebar .panel-header i.ms-Icon{\n        margin-right: 10px;\n    }\n\n\n    /* Remove drawer carrot on auth */\n    #auth-drawer-button:after{\n        content:none;\n    }\n\n\n    .arrow-left {\n        border-top: 18px solid transparent;\n        border-bottom: 18px solid transparent;\n        border-right: 18px solid white;\n        position: relative;\n        right: -10px;\n        top: 13px;\n        margin-bottom: -45px;\n    }\n\n    button.c-glyph {\n        color: white;\n    }\n\n\n  "]
    })
], SidebarComponent);
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map