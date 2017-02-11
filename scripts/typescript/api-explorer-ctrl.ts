// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

let s:any;
declare const angular:any;

const GraphBaseUrl = "https://graph.microsoft.com/"
const GraphVersions = ['beta', 'v1.0']

angular.module('ApiExplorer')
    .controller('ApiExplorerCtrl', ['$scope', '$http', '$location', 'ApiExplorerSvc', '$timeout', '$templateCache', '$mdDialog', '$sce', function ($scope, $http, $location, apiService, $timeout, $templateCache, $mdDialog, $sce ) {

        s = $scope;
        $scope.userInfo = {};

        $scope.getAssetPath = function(relPath) {
            return s.pathToBuildDir + "/"+ relPath;
        }
  
        $scope.finishAdminConsertFlow = function() {
            // silently get a new access token with the admin scopes
            hello('msft_token_refresh').login({
                display: 'popup',
                response_type: "token",
                redirect_uri: $scope.redirectUrl,
                scope: $scope.scopes + " " + $scope.adminScopes,
                response_mode: 'fragment',
                prompt: 'none',
                domain_hint: 'organizations',
                login_hint: $scope.userInfo.preferred_username
            }, function(res) {
                if (res.authResponse) {
                    var accessToken = res.authResponse.access_token;
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                }
            }, function(res) {
                console.error(res);
            });
        }

        hello.on('auth.login', function (auth) {
            let accessToken;

            if (auth.network == "msft_token_refresh") {
                accessToken = hello('msft_token_refresh').getAuthResponse().access_token;
            } else if (auth.network == "msft") {
                let authResponse = hello('msft').getAuthResponse()

                accessToken = authResponse.access_token;
            }

            if (accessToken) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
           
                apiService.performQuery("GET")("https://graph.microsoft.com/v1.0/me")
                    .then(function (result) {
                        let resultBody = result.data;

                        $scope.userInfo = {
                            preferred_username: resultBody.mail
                        }
                    }, function(res) {
                        console.error(res);
                    });
            }

        });
        
        $scope.tabConfig = {
            disableRequestBodyEditor: true,
            hideContent: true,
            selected: 0
        }
        $scope.showImage = false;

        $scope.tabConfig.previousSelected = $scope.tabConfig.selected;
        $scope.processTabClick = function() {
            const switchingTabs = $scope.tabConfig.previousSelected != $scope.tabConfig.selected;
            if (!switchingTabs)
                $scope.tabConfig.hideContent = !$scope.tabConfig.hideContent;
            $scope.tabConfig.previousSelected = $scope.tabConfig.selected;
        }

        // For deep linking into the Graph Explorer
        let requestVal = $location.search().request;
        let actionVal = $location.search().method;
        let bodyVal = $location.search().body;
        let versionVal = $location.search().version;
        let headersVal = $location.search().headers;
        

        handleQueryString(apiService, actionVal, versionVal, requestVal);
        
        $timeout(function() {
            initializeHeadersEditor(headersVal);
            initializeJsonViewer($scope, apiService);
        });

        parseMetadata(apiService);

        $scope.isAuthenticated = function() {
            var session = hello('msft').getAuthResponse();

            if (session === null) return false;
            var currentTime = (new Date()).getTime() / 1000;
            return session && session.access_token && session.expires > currentTime;
        };

        $scope.$watch("getEditor()", function(event, args) {
            initializeJsonEditor(bodyVal);
        });

        // https://docs.microsoft.com/en-us/azure/active-directory/active-directory-v2-protocols-implicit
        $scope.login = function () {
            hello('msft').login({
                display: 'page',
                response_type: "id_token token",
                nonce: 'graph_explorer',
                prompt: 'select_account',
                msafed: 0
            }, function(res) {

            }, function() {
                console.error('error signing in');
            });
        };

        $scope.logout = function () {
            // change to GET and show request header tab
            apiService.selectedOption = "GET";
            $scope.tabConfig.disableRequestBodyEditor = true;
            setSelectedTab(0);

            hello('msft').logout(null, {force:true});
            delete $scope.userInfo;
        };


        $scope.getSearchText = function() {
            return apiService.text;
        }

        // todo should use construct graph
        $scope.getCurrentEntityName = function() {
            if (!apiService.text) return null;
            
            var txt = apiService.text;
            var pathArr = txt.split("/").filter((function(a) { return a.length > 0}));

            return pathArr.pop();
        }

        $scope.canInsertTemplate = function() {
            return apiService.selectedOption == "POST" && checkCanInsertTemplate(apiService.text);
        }

        $scope.insertPostTemplate = function() {
            var entity = $scope.getCurrentEntityName();
            var strToInsert = JSON.stringify(postTemplates[entity], null, 2).trim();

            var fullUserEmail = $scope.userInfo.preferred_username;
            var domain = fullUserEmail.split("@")[1];

            strToInsert = strToInsert.replace(/AUTHENTICATED_DOMAIN/g, domain);
            strToInsert = strToInsert.replace(/FULL_USER_EMAIL/g, fullUserEmail);
            

            initializeJsonEditor(strToInsert);
        }

        function checkCanInsertTemplate(URL) {s
            // get 'messages' from 'https://graph.microsoft.com/v1.0/me/messages'
            let entity = $scope.getCurrentEntityName()
            let canInsertTemplate = entity in postTemplates;
            return canInsertTemplate;
        }

        $scope.showShareDialog = function(ev) {
            $mdDialog.show({
                controller: ShareDialogController,
                templateUrl: pathToBuildDir + '/assets/views/shareDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                scope: $scope.$new(),
                locals: {
                    apiService: apiService,
                    $sce: $sce,
                    headers: formatRequestHeaders(getHeadersEditor().getSession().getValue()),
                    body: getJsonViewer().getSession().getValue()
                },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        };

}]);

angular.module('ApiExplorer')
    .controller('DropdownCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {

        $scope.onItemClick = function(choice) {
            if (choice != apiService.selectedOption) {
                apiService.selectedOption = choice;
                apiService.text = apiService.text.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|\/))/, ("https://graph.microsoft.com/" + apiService.selectedVersion + "/"));
                if (choice == 'POST' || choice == 'PATCH') {
                    showRequestBodyEditor();
                } else if (choice == 'GET' || choice == 'DELETE') {
                    s.tabConfig.disableRequestBodyEditor = true;
                    setSelectedTab(0);
                }
            }
        }

        $scope.items = [
            'GET',
            'POST',
            'PATCH',
            'DELETE'
        ];

        $scope.getServiceOption = function() {
            return apiService.selectedOption;
        }

    }]);

angular.module('ApiExplorer')
    .controller('VersionCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {
        $scope.items = GraphVersions;

        $scope.getServiceVersion = function() {
            return apiService.selectedVersion;
        }

        $scope.onItemClick = function(choice) {
            if (apiService.selectedVersion !== choice) {
                apiService.selectedVersion = choice;
                apiService.text = apiService.text.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|\/))/, ("https://graph.microsoft.com/" + apiService.selectedVersion + "/"));
                $scope.$parent.$broadcast('updateUrlFromServiceText');                    
                parseMetadata(apiService);
            }
        }
}]);

angular.module('ApiExplorer').controller('datalistCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {

    $scope.searchTextChange = function(searchText) {
        apiService.text = searchText;

        // if the user typed in a different version, change the dropdown
        let graphPathStartingWithVersion = searchText.split(GraphBaseUrl);
        if (graphPathStartingWithVersion.length < 2) {
            return;
        }
        let possibleGraphPathArr = graphPathStartingWithVersion[1].split('/');
        if (possibleGraphPathArr.length == 0) {
            return;
        }

        let possibleVersion = possibleGraphPathArr[0];
        if (GraphVersions.indexOf(possibleVersion) != -1) {
            // possibleVersion is a valid version
            apiService.selectedVersion = possibleVersion;
            parseMetadata(apiService);
        }
        
    }

    $scope.getRequestHistory = function() {
        return requestHistory;
    }

    $scope.$on('updateUrlFromServiceText', function(event, data) {
        $scope.text = apiService.text;
    });
    
    $scope.searchTextChange(apiService.text);
    $scope.searchText = apiService.text; // for init (used in explorer.html)

    $scope.getMatches = function(query) {
        var urls = getUrlsFromServiceURL(apiService)
        return urls.filter(function(option) {
            var queryInOption = (option.indexOf(query)>-1);
            // var queryIsEmpty = (getEntityName(query).length == 0);

            return queryInOption;
        });
    }

    if (window['runTests'])
         runAutoCompleteTests(apiService);

}]);


angular.module('ApiExplorer').controller('FormCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {
    $scope.requestInProgress = false;
    $scope.insufficientPrivileges = false;

    if (hello('msft').getAuthResponse() != null && 
        (apiService.selectedOption === 'POST' || apiService.selectedOption === 'PATCH')) {
            showRequestBodyEditor();
    } else {
        setSelectedTab(0);
    }
 
    // custom link re-routing logic to resolve links
    $scope.$parent.$on("urlChange", function (event, args) {
        msGraphLinkResolution($scope, getJsonViewer().getSession().getValue(), args, apiService);
    });

    // function called when link in the back button history is clicked
    $scope.historyOnClick = function(historyItem) {
        apiService.text = historyItem.urlText;
        $scope.$broadcast('updateUrlFromServiceText');
        apiService.selectedVersion = historyItem.selectedVersion;
        apiService.selectedOption = historyItem.htmlOption;
        parseMetadata(apiService); // if clicked on beta or other version that we haven't fetched metadata for, download so autocomplete works

        if (historyItem.htmlOption == 'POST' || historyItem.htmlOption == 'PATCH') {
            if (getJsonViewer()) {
                getJsonViewer().getSession().setValue(historyItem.jsonInput);
            } else {
                console.error("json editor watch event not firing");
            }
        } else {
            //clear jsonEditor
            if (getJsonViewer()) {
                getJsonViewer().getSession().setValue("");
            }

        }
        $scope.submit();
    }
    
    $scope.closeAdminConsentBar = function() {
        $scope.insufficientPrivileges = false;
    }

    $scope.getAdminConsent = function () {
        hello('msft_admin_consent').login({
            display: 'popup'
        }).then(function() {
            $scope.finishAdminConsertFlow();
        }, function() {
            $scope.finishAdminConsertFlow();
        })
    }
        

    $scope.submit = function () {
        $scope.requestInProgress = true;

        //create an object to store the api call
        let historyObj:HistoryRecord = {
            urlText: apiService.text,
            selectedVersion: apiService.selectedVersion,
            htmlOption: apiService.selectedOption,
            jsonInput: null
        };

        if (historyObj.htmlOption == 'POST' || historyObj.htmlOption == 'PATCH') {
            historyObj.jsonInput = getRequestBodyEditor().getSession().getValue();
        }

        $scope.showImage = false;

        let postBody;
        if (getRequestBodyEditor() != undefined) {
            postBody = getRequestBodyEditor().getSession().getValue();
        }

        let requestHeaders:any = "";
        if (getHeadersEditor() != undefined) {
            requestHeaders = getHeadersEditor().getSession().getValue();
            requestHeaders = formatRequestHeaders(requestHeaders);
        }

        let startTime = new Date();

        function handleSuccessfulQueryResponse(result) {
            let status = result.status;
            let headers = result.headers;
            let resultBody = result.data;

            if (isImageResponse(headers)) {
                handleImageResponse($scope, apiService, startTime, headers, status, handleUnsuccessfulQueryResponse);
            } else if (isHtmlResponse(headers)) {
                handleHtmlResponse($scope, startTime, resultBody, headers, status);
            } else if (isXmlResponse(result)) {
                handleXmlResponse($scope, startTime, resultBody, headers, status);
            } else {
                handleJsonResponse($scope, startTime, resultBody, headers, status);
            }

            historyObj.duration = (new Date()).getTime()- startTime.getTime();
            saveHistoryObject(historyObj, status);


            $scope.insufficientPrivileges = false;
        }

        function handleUnsuccessfulQueryResponse(result) {
            let status = result.status;
            let headers = result.headers;
            handleJsonResponse($scope, startTime, result.data, headers, status);
            historyObj.duration = (new Date()).getTime()- startTime.getTime();
            saveHistoryObject(historyObj, status);

            if (status === 401 || status === 403) {
                $scope.insufficientPrivileges = true;
            }
        }


        if ($scope.isAuthenticated()) {
            apiService.performQuery(apiService.selectedOption)(apiService.text, postBody, requestHeaders)
                .then(handleSuccessfulQueryResponse, handleUnsuccessfulQueryResponse);

        } else {
            apiService.performAnonymousQuery(apiService.selectedOption)(apiService.text, postBody, requestHeaders)
                .then(handleSuccessfulQueryResponse, handleUnsuccessfulQueryResponse);
        }
    };
}]);