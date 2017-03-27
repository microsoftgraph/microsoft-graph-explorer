// // ------------------------------------------------------------------------------
// //  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// // ------------------------------------------------------------------------------

// import { initAuth } from './auth'
// import { loc_strings } from './loc_strings'
// import { runInTestMode } from './base'
// import { getStr } from "./api-explorer-helpers";

// // get the path to this script
// export let pathToBuildDir;

// declare const angular, hello;

// if (!runInTestMode) {
//     const scripts = document.getElementsByTagName("script")
//     const src = scripts[scripts.length-1].src;
//     pathToBuildDir = src.split('/').slice(0, -2).join('/');
// }


// if (!runInTestMode) {
//     angular.module('ApiExplorer')
//      .config(function($sceDelegateProvider, $httpProvider) {
//             $sceDelegateProvider.resourceUrlWhitelist([
//                 'self',
//                 pathToBuildDir + '/**'
//             ]);
// 	        $httpProvider.defaults.useXDomain = true;
// 	        delete $httpProvider.defaults.headers.common['X-Requested-With'];
//         })
//     .directive('apiExplorer', function() {
//         return {
//             scope: {
//                 options: '='
//             },
//             templateUrl: pathToBuildDir+'/assets/views/explorer.html',
//             controller: function ($scope) {
//                 $scope.pathToBuildDir = pathToBuildDir;

//                 angular.extend(GraphExplorerOptions, $scope.options);

//                 initAuth(GraphExplorerOptions.AuthUrl);

//                 $scope.str = loc_strings[GraphExplorerOptions.Language];

//                 $scope.getStr = getStr;


//                 setTimeout(() => {
//                     const disableSpellchecks = {
//                         autocomplete:"off",
//                         autocorrect:"off",
//                         autocapitalize:"off",
//                         spellcheck:"false"
//                     };

//                     $("md-autocomplete-wrap input").attr(disableSpellchecks);
//                 }, 0);
//             }
//         };
//     });
// }