// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { initAuth } from './auth'
import { loc_strings } from './loc_strings'
import { runInTestMode } from './base'

// get the path to this script
export let pathToBuildDir;

declare const angular, hello;

if (!runInTestMode) {
    const scripts = document.getElementsByTagName("script")
    const src = scripts[scripts.length-1].src;
    pathToBuildDir = src.split('/').slice(0, -2).join('/');
}

export interface ExplorerOptions {
    AuthUrl?: string,
    GraphUrl?: string,
    ClientId?: string,
    Language?: string,
    AdminScopes?: string,
    RedirectUrl?: string,
    UserScopes?: string,
    GraphVersions?: string[]
}

export const GraphExplorerOptions:ExplorerOptions = {
    AuthUrl: "https://login.microsoftonline.com",
    GraphUrl: "https://graph.microsoft.com",
    Language: "en-US",
    GraphVersions: ["v1.0", "beta"]
};

if (!runInTestMode) {
    angular.module('ApiExplorer')
     .config(function($sceDelegateProvider, $httpProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                pathToBuildDir + '/**'
            ]);
	        $httpProvider.defaults.useXDomain = true;
	        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        })
    .directive('apiExplorer', function() {
        return {
            scope: {
                options: '='
            },
            templateUrl: pathToBuildDir+'/assets/views/explorer.html',
            controller: function ($scope) {
                $scope.pathToBuildDir = pathToBuildDir;

                angular.extend(GraphExplorerOptions, $scope.options);

                initAuth(GraphExplorerOptions.AuthUrl);

                $scope.str = loc_strings[GraphExplorerOptions.Language];

                $scope.getStr = (label:string):string => {
                    if (label in loc_strings[GraphExplorerOptions.Language])
                        return loc_strings[GraphExplorerOptions.Language][label];
                    return loc_strings["en-US"][label];
                }

                hello.init({
                    msft: GraphExplorerOptions.ClientId
                }, {
                    scope: GraphExplorerOptions.UserScopes,
                    redirect_uri: window.location.pathname //required to remove extra url params that make URLs not match
                });

                hello.init({
                    msft_admin_consent: GraphExplorerOptions.ClientId,
                    msft_token_refresh: GraphExplorerOptions.ClientId,
                }, {
                    redirect_uri: window.location.pathname
                });

                setTimeout(() => {
                    const disableSpellchecks = {
                        autocomplete:"off",
                        autocorrect:"off",
                        autocapitalize:"off",
                        spellcheck:"false"
                    };

                    $("md-autocomplete-wrap input").attr(disableSpellchecks);
                }, 0);
            }
        };
    });
}