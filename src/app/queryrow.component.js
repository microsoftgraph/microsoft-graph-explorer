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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GraphExplorerComponent_1 = require("./GraphExplorerComponent");
var app_component_1 = require("./app.component");
var api_explorer_helpers_1 = require("./api-explorer-helpers");
var QueryRowComponent = (function (_super) {
    __extends(QueryRowComponent, _super);
    function QueryRowComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getTitle = function () {
            return this.query.requestUrl;
        };
        _this.getQueryText = function () {
            var shortQueryUrl;
            if (this.query.requestUrl) {
                shortQueryUrl = this.query.requestUrl.split(app_component_1.AppComponent.options.GraphUrl)[1];
            }
            var queryText = this.query.humanName || shortQueryUrl;
            return (api_explorer_helpers_1.getString(app_component_1.AppComponent.options, queryText)) || queryText;
        };
        _this.runQuery = function () {
        };
        return _this;
    }
    return QueryRowComponent;
}(GraphExplorerComponent_1.GraphExplorerComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], QueryRowComponent.prototype, "query", void 0);
QueryRowComponent = __decorate([
    core_1.Component({
        selector: 'query-row',
        template: "\n    <div class=\"api-query\" (click)=\"runQuery(query)\" title=\"{{getTitle()}}\">\n        <div class=\"row-1\">\n            <span class=\"request-badge\" [ngClass]=\"query.method\">{{query.method}}</span><span class=\"query\">{{getQueryText()}}</span>\n        </div>\n      <ng-content></ng-content>\n    </div>",
        styles: ["\n      .api-query:hover, .c-drawer>button:hover {\n          background: rgba(0,0,0,0.25);\n      }\n\n      .api-query {\n          cursor: pointer;\n          font-size: 13px;\n          line-height: 16px;\n          display: block;\n          border: 0;\n          background: 0 0;\n          font-weight: 500;\n          padding: 5px 5px 5px 12px;\n          left: 0;\n          text-align: left;\n          width: 100%;\n          overflow: hidden;\n          white-space: nowrap;\n          text-overflow: ellipsis;\n          margin-left: -26px;\n      }\n\n      .api-query .request-badge {\n          border: 1px solid gray;\n          min-width: 55px;\n          display: inline-block;\n          padding: 2px;\n          text-align: center;\n          margin-right: 15px;\n          font-weight: 600;\n      }\n\n      .request-badge.GET {\n          background-color: #000fdf\n      }\n\n      .request-badge.POST {\n          background-color: #008412\n      }\n\n      .request-badge.PATCH {\n          background-color: #be8b00\n      }\n\n      .request-badge.DELETE {\n          background-color: #a10000  \n      }\n\n\n      .api-query .row-1 {\n          display: inline;\n      }\n\n"]
    })
], QueryRowComponent);
exports.QueryRowComponent = QueryRowComponent;
//# sourceMappingURL=queryrow.component.js.map