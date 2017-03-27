"use strict";
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
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
require("rxjs/add/operator/toPromise");
var GraphService = (function () {
    function GraphService(http) {
        var _this = this;
        this.http = http;
        this.performAnonymousQuery = function (queryType) {
            var _http = _this.http;
            return function (query, requestHeaders) {
                var headersObj = {
                    "Authorization": "Bearer {token:https://graph.microsoft.com/}",
                    "Accept": "application/json"
                };
                if (requestHeaders && requestHeaders["Authorization"]) {
                    headersObj["Authorization"] = requestHeaders["Authorization"];
                }
                if (requestHeaders && requestHeaders["Accept"]) {
                    headersObj["Accept"] = requestHeaders["Accept"];
                }
                var request = {
                    url: 'https://proxy.apisandbox.msdn.microsoft.com/svc?url=' + encodeURIComponent(query),
                    method: 'GET',
                    headers: headersObj
                };
                if (queryType == "GET_BINARY") {
                    request["responseType"] = "arraybuffer";
                }
                if (queryType == "GET_BINARY" || queryType == "GET") {
                    return _http.get(query).toPromise();
                }
            };
        };
        this.performQuery = function (queryType) {
            var _http = _this.http;
            return function (query, postBody, requestHeaders) {
                switch (queryType) {
                    case "GET":
                        return _http.get(query, { headers: requestHeaders }).toPromise();
                    case "GET_BINARY":
                        return _http.get(query, { responseType: http_1.ResponseContentType.ArrayBuffer, headers: requestHeaders }).toPromise();
                    case "POST":
                        return _http.post(query, postBody, { headers: requestHeaders });
                    case "PATCH":
                        return _http.patch(query, postBody, { headers: requestHeaders });
                    case "DELETE":
                        return _http.delete(query, { headers: requestHeaders });
                }
            };
        };
        this.getMetadata = function (version) {
            return _this.performAnonymousQuery("GET")(app_component_1.AppComponent.options.GraphUrl + "/" + version + "/$metadata");
        };
    }
    return GraphService;
}());
GraphService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], GraphService);
exports.GraphService = GraphService;
;
//# sourceMappingURL=api-explorer-svc.js.map