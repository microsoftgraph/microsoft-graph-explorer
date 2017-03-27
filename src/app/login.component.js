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
var AuthenticationComponent = (function (_super) {
    __extends(AuthenticationComponent, _super);
    function AuthenticationComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.title = 'Tour of Heroes!!';
        _this.getAuthenticationStatus = function () {
            return "anonymous";
        };
        _this.login = function () {
            var loginProperties = {
                display: 'page',
                response_type: "id_token token",
                nonce: 'graph_explorer',
                prompt: 'select_account',
                msafed: 0
            };
            hello('msft').login(loginProperties, function () {
                debugger;
            });
        };
        return _this;
    }
    return AuthenticationComponent;
}(GraphExplorerComponent_1.GraphExplorerComponent));
AuthenticationComponent = __decorate([
    core_1.Component({
        selector: 'authentication',
        styles: ["\n      #ms-signin-button {\n          max-width: 215px;\n          margin: 20px 0 0px 0px;\n          cursor: pointer;\n      }\n\n      #signout {\n          margin-right: 32px;\n          max-width: 100%;\n          display: block;\n          text-align: right;\n      }\n\n\n      #authDrawer {\n          min-height: 96px;\n      }\n\n      #userDisplayName {\n          color: #e2e2e2\n      }\n\n      #userMail {\n          color: #a0a0a0;\n      }\n\n      #authenticating-progress-bar {\n          margin: 0px auto;\n      }\n\n\n"],
        template: "\n    <div *ngIf=\"getAuthenticationStatus() == 'anonymous'\">\n        <div tabindex=\"-1\">{{getStr('Using demo tenant')}}</div>\n        <div tabindex=\"-1\">{{getStr('To access your own data:')}}</div>\n        <img id=\"ms-signin-button\" alt=\"{{getStr('sign in')}}\" src=\"{{getAssetPath('assets/images/MSSignInButton.svg')}}\" (click)=\"login()\"/>\n    </div>\n    "
    })
], AuthenticationComponent);
exports.AuthenticationComponent = AuthenticationComponent;
//# sourceMappingURL=login.component.js.map