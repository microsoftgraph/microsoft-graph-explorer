// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

// get the path to this script
var scripts = document.getElementsByTagName("script")
var src = scripts[scripts.length-1].src;

angular.module('ApiExplorer')
    .directive('apiExplorer', function() {
        return {
            scope: {
                strings: '=',
                language: '=',
                scopes: '=',
                adminScopes: '=',
                clientId: '=',
                redirectUrl: '='
            },
            templateUrl: '../assets/views/explorer.html',
            controller: function ($scope) {
                $scope.pathToBuildDir = src.split('/').slice(0, -2).join('/');

                // default strings
                $scope.str = loc_strings['en_us'];

                // if the user specified a language, use that instead
                if ($scope.language) {
                    $scope.str = loc_strings[$scope.language];
                }

                // merge $scope.strings into $scope.str
                angular.extend($scope.str, $scope.strings);


                hello.init( {
                    msft: $scope.clientId
                }, {
                    scope: $scope.scopes
                });

                hello.init( {
                    msft_admin_consent: $scope.clientId,
                    msft_token_refresh: $scope.clientId,
                }, {});
            }
        };
    });