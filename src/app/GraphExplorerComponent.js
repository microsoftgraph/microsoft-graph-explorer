"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_explorer_helpers_1 = require("./api-explorer-helpers");
var app_component_1 = require("./app.component");
var scripts = document.getElementsByTagName("script");
var src = scripts[scripts.length - 1].src;
exports.pathToBuildDir = src.split('/').slice(0, -2).join('/');
var GraphExplorerComponent = (function () {
    function GraphExplorerComponent() {
    }
    GraphExplorerComponent.prototype.getStr = function (label) {
        return api_explorer_helpers_1.getString(app_component_1.AppComponent.options, label);
    };
    GraphExplorerComponent.prototype.getAssetPath = function (relPath) {
        return exports.pathToBuildDir + "/" + relPath;
    };
    return GraphExplorerComponent;
}());
exports.GraphExplorerComponent = GraphExplorerComponent;
//# sourceMappingURL=GraphExplorerComponent.js.map