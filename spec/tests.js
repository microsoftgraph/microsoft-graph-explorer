// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

var assert = chai.assert;
var testCases = {
    validURLs: [
        'me',
        'me/manager',
        'me/messages',
        'users',
        'drives',
        'me/photo/width',
        'me/events',
        'me/contactFolders',
        'me/registeredDevices',
        'organization',
        'me/photo/$value'
    ],
    invalidURLs: [
        'me/users',
        'user',
        'me/manager/manager',
        'me/photos',
        'events',
        'organizations',
        'me/photo/size',
        'me/registeredDevice',
        'me/mySites',
        'me//manager',
        'me/manager/photo',
        'shares',
        'workbooks',
        'me/drive/items'
    ]
}

var baseURL = "https://graph.microsoft.com"
var version = "v1.0"

var apiService;
function runAutoCompleteTests(_apiService) {
    apiService = _apiService;
}

function addURLs(UrlArrayDestination, basePath, entity, maxDepthRemaining) {
    if (maxDepthRemaining == 0) {
        return;
    }

    var URL = basePath+"/"+entity.name;
    apiService.text = URL;
    setEntity(entity.name, apiService, true);
    if (apiService.entity == null) {
        return;
    }

    UrlArrayDestination.push(apiService.text);

    var entityURLs = apiService.entity.URLS.slice();
    for (var i=0;i<entityURLs.length;i++) {
        var generatedPath = entityURLs[i];
        var subPath = "";
        if (generatedPath.autocompleteVal)
            subPath = generatedPath.autocompleteVal;
        else
            subPath = URL + "/" + generatedPath.name;

        UrlArrayDestination.push(subPath);
        if (!generatedPath.isACollection) {
            addURLs(UrlArrayDestination, URL, generatedPath, maxDepthRemaining - 1);
        }
    }
}

function generateValidURLs() {
    var validURLs = [];
    var entities = apiService.cache.get("v1.0EntitySetData");
    for (var entityName in entities) {
        addURLs(validURLs, baseURL + '/' + version, {name: entityName}, 5);
    }
    return validURLs;
}

function isValidURL(validURLs, url) {
    return validURLs.indexOf(url) != -1;
}

describe('Autocomplete URLs', function() {
    this.timeout(15000);
    var generatedURLs = [];

    describe('Parsing metadata', function() {
        it ('Generate a list of URLs from the v1.0 meatadata', function(done) {
            setTimeout(function() {
                generatedURLs = generateValidURLs();
                console.log('Generated ' + generatedURLs.length + ' urls to compare test cases against');
                done();
            },  2000);
        });
    });

    describe('Positive results - these URLs should autocomplete', function() {
        for (var i=0;i<testCases.validURLs.length;i++) {
            var validURL = testCases.validURLs[i];
            (function(url) {
                var _url = url;
                it(url, function(done) {
                    var url = [baseURL,version,_url].join('/');
                    assert(generatedURLs.indexOf(url) != -1, "Missing URL");
                    done();
                });
            })(validURL)
        }
    });

    describe('Negative results - these URLs should not autocomplete', function() {
        for (var i=0;i<testCases.invalidURLs.length;i++) {
            var invalidURL = testCases.invalidURLs[i];
            (function(url) {
                var _url = url;
                it(url, function(done) {
                    var url = [baseURL,version,_url].join('/');
                    assert(generatedURLs.indexOf(url) == -1, "Providing user with invalid autocomplete URL");
                    done();
                });
            })(invalidURL)
        }
    });
});

describe('Header Parsing', function() {
    it ('Parses custom single line headers', function() {
        assert.deepEqual(formatRequestHeaders("A:B"), {A:"B"});
    });

    it('Parses multiline custom headers', function() {
        assert.deepEqual(formatRequestHeaders("A:B\nC:D"), {A:"B", C:"D"});
    });

    it('Parses multiline custom headers with extra line breaks before and after', function() {
        assert.deepEqual(formatRequestHeaders("\n\n\n\n\nA:B\n\n\n\nC:D\n\n\n"), {A:"B", C:"D"});        
    })
});