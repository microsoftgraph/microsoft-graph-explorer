// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

'use strict';

angular.module('ApiExplorer')
.config(function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
        rewriteLinks: false
    });
    
})
.factory('ApiExplorerSvc', [function () {
    var apiExplorerService = {};
    return apiExplorerService;
}]);