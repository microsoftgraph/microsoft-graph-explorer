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
var auth_1 = require("./auth");
var fabric_components_1 = require("./fabric-components");
var api_explorer_svc_1 = require("./api-explorer-svc");
var AppComponent = AppComponent_1 = (function (_super) {
    __extends(AppComponent, _super);
    function AppComponent(GraphService) {
        var _this = _super.call(this) || this;
        _this.GraphService = GraphService;
        return _this;
    }
    AppComponent.prototype.ngOnInit = function () {
        for (var key in AppComponent_1.options) {
            if (key in window)
                AppComponent_1.options[key] = window[key];
        }
        auth_1.initAuth(AppComponent_1.options);
        fabric_components_1.initFabricComponents();
        mwf.ComponentFactory.create([{
                'component': mwf.Drawer,
            }]);
    };
    return AppComponent;
}(GraphExplorerComponent_1.GraphExplorerComponent));
AppComponent.options = {
    ClientId: "",
    Language: "en-US",
    AdminScopes: "User.ReadWrite.All Group.ReadWrite.All Directory.ReadWrite.All Directory.AccessAsUser.All IdentityRiskEvent.Read.All",
    UserScopes: "openid profile User.Read User.ReadWrite User.ReadBasic.All Mail.ReadWrite Mail.Send Mail.Send.Shared Calendars.ReadWrite Calendars.ReadWrite.Shared Contacts.ReadWrite MailboxSettings.ReadWrite Files.ReadWrite Files.ReadWrite.All Files.ReadWrite.AppFolder Notes.Create Notes.ReadWrite.All People.Read Sites.ReadWrite.All Tasks.ReadWrite",
    AuthUrl: "https://login.microsoftonline.com",
    GraphUrl: "https://graph.microsoft.com",
    GraphVersions: ["v1.0", "beta"]
};
AppComponent.explorerValues = {
    endpointUrl: AppComponent_1.options.GraphUrl + '/v1.0/me/',
    selectedOption: "GET",
    selectedVersion: "v1.0"
};
AppComponent = AppComponent_1 = __decorate([
    core_1.Component({
        selector: 'api-explorer',
        providers: [api_explorer_svc_1.GraphService],
        template: "\n    <div class=\"ms-Grid\"> \n      <div class=\"ms-Grid-row\">\n        <sidebar class=\"ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg4 ms-u-xl3 ms-u-xxl3 ms-u-xxxl2\"></sidebar>\n      </div>\n    </div>\n    ",
        styles: ["\n    \n    \n"]
    }),
    __metadata("design:paramtypes", [api_explorer_svc_1.GraphService])
], AppComponent);
exports.AppComponent = AppComponent;
var AppComponent_1;
//# sourceMappingURL=app.component.js.map