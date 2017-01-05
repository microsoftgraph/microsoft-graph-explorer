// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

'use strict';

angular.module('ApiExplorer', ['ngAnimate', 'ngMaterial'])
    .config(['$mdThemingProvider', function ($mdThemingProvider) {

    $mdThemingProvider.definePalette('O365PrimaryPalette', {
            '50': 'e9f0fc',
            '100': 'd3e2f8',
            '200': 'bdd3f5',
            '300': '91b6ee', 
            '400': '6599e7',
            '500': '4685e2', //blue
            '600': '387be0',
            '700': '226ddd',
            '800': '1f62c7', 
            '900': '1c57b0',
            'A100': 'FF6A00', 
            'A200': 'FF6A00', 
            'A400': 'FF6A00', 
            'A700': 'FF6A00', 
            'contrastDefaultColor': 'light',   
            'contrastDarkColors': ['50', '100', 
                '200', '300', '400', 'A100'],
            'contrastLightColors': undefined 
    });
    
    $mdThemingProvider.definePalette('O365AccentPalette', {
            '50': 'ffc499',
            '100': 'ffb580',
            '200': 'ffa666',
            '300': 'ff974d', 
            '400': 'ff8833',
            '500': 'FF6A00', //orange
            '600': 'e66000',
            '700': 'cc5500',
            '800': 'b34a00', 
            '900': '994000',
            'A100': 'FF6A00',
            'A200': 'FF6A00', 
            'A400': 'FF6A00', 
            'A700': 'FF6A00', 
    });

    $mdThemingProvider.theme('default').primaryPalette('O365PrimaryPalette');
    $mdThemingProvider.theme('default').accentPalette('O365AccentPalette');
}]);