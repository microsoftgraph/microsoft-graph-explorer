// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

declare const angular:any;
interface TabConfig {
    disableRequestBodyEditor: boolean
    hideContent: boolean
    selected: number
    previousSelected?: number
}

let tabConfig:TabConfig = {
    disableRequestBodyEditor: true,
    hideContent: true,
    selected: 0,
}

angular.module('ApiExplorer')
    .controller('ApiExplorerCtrl', function ($scope, $http, $location, $timeout, $templateCache, $mdDialog, $sce, $cacheFactory ) {
        apiService.init($http, $cacheFactory);

        $scope.userInfo = {};

        $scope.getAssetPath = (relPath) => {
            return $scope.pathToBuildDir + "/"+ relPath;
        }
  
        $scope.finishAdminConsertFlow = function() {
            // silently get a new access token with the admin scopes
            hello('msft_token_refresh').login({
                display: 'popup',
                response_type: "token",
                redirect_uri: GraphExplorerOptions.RedirectUrl,
                scope: GraphExplorerOptions.UserScopes + " " + GraphExplorerOptions.AdminScopes,
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

                apiService.performQuery("GET")(`${GraphExplorerOptions.GraphUrl}/v1.0/me`)

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
        $scope.showImage = false;
        $scope.tabConfig = tabConfig;
        tabConfig.previousSelected = tabConfig.selected;
        $scope.processTabClick = function() {
            const switchingTabs = tabConfig.previousSelected != tabConfig.selected;
            if (!switchingTabs)
                tabConfig.hideContent = !tabConfig.hideContent;
            tabConfig.previousSelected = tabConfig.selected;
        }

        // For deep linking into the Graph Explorer
        let requestVal = $location.search().request;
        let actionVal = $location.search().method;
        let bodyVal = $location.search().body;
        let versionVal = $location.search().version;
        let headersVal = $location.search().headers;
        

        handleQueryString(actionVal, versionVal, requestVal);
        
        $timeout(function() {
            let editor = getHeadersEditor();
            initializeAceEditor(editor, headersVal);
            initializeJsonViewer($scope);
        });

        $scope.isAuthenticated = function() {
            var session = hello('msft').getAuthResponse();

            if (session === null) return false;
            var currentTime = (new Date()).getTime() / 1000;
            return session && session.access_token && session.expires > currentTime;
        };

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
            tabConfig.disableRequestBodyEditor = true;
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
            

            const editor = getRequestBodyEditor();
            initializeAceEditor(editor, strToInsert);
            editor.getSession().setMode("ace/mode/javascript");
        }

        function checkCanInsertTemplate(URL) {
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
        };

});

angular.module('ApiExplorer')
    .controller('DropdownCtrl', ['$scope', function ($scope) {

        $scope.onItemClick = function(choice) {
            if (choice != apiService.selectedOption) {
                apiService.selectedOption = choice;
                apiService.text = apiService.text.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|\/))/, (GraphExplorerOptions.GraphUrl + "/" + apiService.selectedVersion + "/"));
                if (choice == 'POST' || choice == 'PATCH') {
                    showRequestBodyEditor();
                } else if (choice == 'GET' || choice == 'DELETE') {
                    tabConfig.disableRequestBodyEditor = true;
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
    .controller('VersionCtrl', ['$scope', function ($scope) {
        $scope.items = GraphExplorerOptions.GraphVersions;

        $scope.getServiceVersion = function() {
            return apiService.selectedVersion;
        }

        $scope.onItemClick = function(choice) {
            if (apiService.selectedVersion !== choice) {
                apiService.selectedVersion = choice;
                apiService.text = apiService.text.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|\/))/, (GraphExplorerOptions.GraphUrl + "/" + apiService.selectedVersion + "/"));
                $scope.$parent.$broadcast('updateUrlFromServiceText');                    
                parseMetadata();
            }
        }
}]);

angular.module('ApiExplorer').controller('datalistCtrl', ['$scope', function ($scope) {
    let searchTextChange = function(searchText) {
        apiService.text = searchText;

        // if the user typed in a different version, change the dropdown
        if (!searchText) return;
        let graphPathStartingWithVersion = searchText.split(GraphExplorerOptions.GraphUrl+"/");
        if (graphPathStartingWithVersion.length < 2) {
            return;
        }
        let possibleGraphPathArr = graphPathStartingWithVersion[1].split('/');
        if (possibleGraphPathArr.length == 0) {
            return;
        }

        let possibleVersion = possibleGraphPathArr[0];
        if (GraphExplorerOptions.GraphVersions.indexOf(possibleVersion) != -1) {
            // possibleVersion is a valid version
            apiService.selectedVersion = possibleVersion;
            parseMetadata();
        }
    }
    $scope.searchTextChange = searchTextChange;

    $scope.getRequestHistory = function() {
        return requestHistory;
    }

    $scope.$on('updateUrlFromServiceText', function(event, data) {
        $scope.text = apiService.text;
    });

    $scope.searchTextChange(apiService.text);
    $scope.searchText = apiService.text; // for init (used in explorer.html)

    function getRelativeUrlFromGraphNodeLinks(links:GraphNodeLink[]) {
        return links.map((x) => x.name).join('/');
    }

    function getFullUrlFromGraphLinks(links:GraphNodeLink[]) {
        if (typeof links === 'string') { //@todo investigate why a string is sometimes passed
            links = constructGraphLinksFromFullPath(links);
        }
        return [GraphExplorerOptions.GraphUrl, apiService.selectedVersion, getRelativeUrlFromGraphNodeLinks(links)];
    }

    $scope.getFullUrlFromGraphLinks = getFullUrlFromGraphLinks;

    $scope.searchTextChangeFromGraphLinks = function(links:GraphNodeLink[]) {
        if (links === undefined) return; // when getMatches returns [] links is undefined
        let fullUrl = getFullUrlFromGraphLinks(links);
        searchTextChange(fullUrl.join('/'));
    };

    $scope.constructUrlForAutocompleteItemUI = (links:GraphNodeLink[], serviceTextLength?: number):string => {
        let useLastPathSegmentOnly = serviceTextLength !== undefined && serviceTextLength > 64;
        
        if (useLastPathSegmentOnly) {
            return ".../" + links[links.length - 1].name;
        } else {
            return getFullUrlFromGraphLinks(links).join('/');
        }
    }

    $scope.getMatches = function(query) {
        // @todo need to turn url -> links -> urls?
        var urls = getUrlsFromServiceURL()
        return urls.filter((option) => {
            var queryInOption = (option.indexOf(query)>-1);
            // var queryIsEmpty = (getEntityName(query).length == 0);

            return queryInOption;
        }).map((fullUrl) => {
            return constructGraphLinksFromFullPath(fullUrl);
        });
    }
}]);


angular.module('ApiExplorer').controller('FormCtrl', ['$scope', function ($scope) {
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
        parseMetadata(); // if clicked on beta or other version that we haven't fetched metadata for, download so autocomplete works

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
                handleImageResponse($scope, startTime, headers, status, handleUnsuccessfulQueryResponse);
            } else if (isHtmlResponse(headers)) {
                handleHtmlResponse($scope, startTime, resultBody, headers, status);
            } else if (isXmlResponse(result)) {
                handleXmlResponse($scope, startTime, resultBody, headers, status);
            } else {
                handleJsonResponse($scope, startTime, resultBody, headers, status);
                startSimFromGraphResponse(resultBody);
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