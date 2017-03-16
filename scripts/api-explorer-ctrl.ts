// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import {GraphExplorerOptions, pathToBuildDir} from './api-explorer-directive'
import {isHtmlResponse, isImageResponse, isXmlResponse, handleHtmlResponse, handleImageResponse, handleXmlResponse, handleJsonResponse} from './response-handlers'
import { apiService } from "./api-explorer-svc"
import { tabConfig, handleQueryString, formatRequestHeaders, showRequestBodyEditor, initBodyPostEditor } from './api-explorer-helpers'
import {parseMetadata, GraphNodeLink, constructGraphLinksFromFullPath, getUrlsFromServiceURL} from './graph-structure'
import {requestHistory, saveHistoryObject} from "./history"
import {ShareDialogController} from './share-dialog'
import {getJsonViewer, getHeadersEditor, getRequestBodyEditor, initializeAceEditor} from './api-explorer-jseditor'
import {initializeJsonViewer} from "./api-explorer-jsviewer"

import { GettingStartedQueries } from "./getting-started-queries";
import { HistoryRecord, GraphApiCall } from "./base";
import { isAuthenticated } from "./auth";

declare const angular, hello, fabric;

type AuthenticationStatus = "anonymous" | "authenticating" | "authenticated";

angular.module('ApiExplorer')
    .controller('ApiExplorerCtrl', function ($scope, $http, $location, $timeout, $templateCache, $mdDialog, $sce) {
        var PivotElements = document.querySelectorAll(".ms-Pivot");
        for(var i = 0; i < PivotElements.length; i++) {
            new fabric['Pivot'](PivotElements[i]);
        }

        if (typeof fabric !== "undefined") {
            if ('Spinner' in fabric) {
                var elements = document.querySelectorAll('.ms-Spinner');
                var i = elements.length;
                var component;
                while(i--) {
                    component = new fabric['Spinner'](elements[i]);
                }
            }
        }

        initBodyPostEditor();

        $scope.requestInProgress = false;
        $scope.insufficientPrivileges = false;

        apiService.init($http);

        $scope.userInfo = {};
        $scope.authenticationStatus = isAuthenticated() ? "authenticating" : "anonymous"

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


        hello.on('auth.logout', function (auth) {
            $scope.authenticationStatus = "anonymous"
            $scope.$apply();
        });

        hello.on('auth.login', function (auth) {
            let accessToken;

            if (auth.network == "msft_token_refresh") {
                accessToken = hello('msft_token_refresh').getAuthResponse().access_token;
            } else if (auth.network == "msft") {
                let authResponse = hello('msft').getAuthResponse()

                accessToken = authResponse.access_token;
            }

            if (accessToken) {
                $scope.authenticationStatus = "authenticating"
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

                let promisesGetUserInfo = [];
                $scope.userInfo = {}

                // get displayName and email
                promisesGetUserInfo.push(apiService.performQuery("GET")(`${GraphExplorerOptions.GraphUrl}/v1.0/me`).then((result) => {
                    let resultBody = result.data;

                    $scope.userInfo.displayName = resultBody.displayName;
                    $scope.userInfo.mail = resultBody.mail;
                }));

                // get profile image
                promisesGetUserInfo.push(apiService.performQuery('GET_BINARY')(`${GraphExplorerOptions.GraphUrl}/beta/me/photo/$value`).then((result) => {
                        let blob = new Blob( [ result.data ], { type: "image/jpeg" } );
                        let imageUrl = window.URL.createObjectURL( blob );
                        $scope.userInfo.profileImageUrl = imageUrl;
                }));

                Promise.all(promisesGetUserInfo).then(() => {
                    $scope.authenticationStatus = "authenticated"
                    $scope.$apply();
                })
            }

        });
        $scope.showImage = false;
        // $scope.tabConfig = tabConfig;
        // tabConfig.previousSelected = tabConfig.selected;
        // $scope.processTabClick = function() {
        //     const switchingTabs = tabConfig.previousSelected != tabConfig.selected;
        //     if (!switchingTabs)
        //         tabConfig.hideContent = !tabConfig.hideContent;
        //     tabConfig.previousSelected = tabConfig.selected;
        // }

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
            initializeJsonViewer();
        });

        $scope.isAuthenticated = isAuthenticated;

        // https://docs.microsoft.com/en-us/azure/active-directory/active-directory-v2-protocols-implicit
        $scope.login = function () {
            hello('msft').login({
                display: 'page',
                response_type: "id_token token",
                nonce: 'graph_explorer',
                prompt: 'select_account'
            }, function(res) {

            }, function() {
                console.error('error signing in');
            });
        };

        $scope.logout = function () {
            // change to GET and show request header tab
            apiService.selectedOption = "GET";
            // tabConfig.disableRequestBodyEditor = true;
            // setSelectedTab(0);

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


    let lastApiResponse:GraphApiCall;
    $scope.lastApiResponse = lastApiResponse;
    $scope.clearLastApiResponse = () => {
        $scope.lastApiResponse = null;
    }

    if (hello('msft').getAuthResponse() != null && 
        (apiService.selectedOption === 'POST' || apiService.selectedOption === 'PATCH')) {
            showRequestBodyEditor();
    } else {
        // setSelectedTab(0);
    }
 
    function searchTextChange(searchText) {
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

    $scope.getRequestHistory = (limit?) => {
        if (limit) return requestHistory.slice(0, limit);
        return requestHistory;
    }

    $scope.$on('updateUrlFromServiceText', (event, data) => {
        $scope.searchText = apiService.text;
    });

    $scope.searchTextChange(apiService.text);
    $scope.searchText = apiService.text; // for init (used in explorer.html)

    function getRelativeUrlFromGraphNodeLinks(links:GraphNodeLink[]) {
        return links.map((x) => x.name).join('/');
    }

    function getFullUrlFromGraphLinks(links:GraphNodeLink[]):Promise<any[]> {
        return new Promise((resolve, reject) => {
            if (typeof links === 'string') { //@todo investigate why a string is sometimes passed
                resolve(constructGraphLinksFromFullPath(links));
            }
            resolve(links)
        }).then((_links:GraphNodeLink[]) => {
            return [GraphExplorerOptions.GraphUrl, apiService.selectedVersion, getRelativeUrlFromGraphNodeLinks(_links)];    
        });
    }

    $scope.getFullUrlFromGraphLinks = getFullUrlFromGraphLinks;

    $scope.searchTextChangeFromAutoCompleteItem = function(item:AutoCompleteItem) {
        // if (typeof item === 'string' || !item) {
        //     return;
        // }
        searchTextChange(item.fullUrl);
    };

    interface AutoCompleteItem {
        url: string
        fullUrl: string
    }

    $scope.getMatches = getMatches;

    function getMatches(query):Promise<AutoCompleteItem[]> {
        return getUrlsFromServiceURL(apiService.selectedVersion).then((urls) => {
            return constructGraphLinksFromFullPath(query).then((graph) => {
                // if query ends with odata query param, don't return any URLs
                const lastNode = graph.pop();
                if (lastNode && lastNode.name.indexOf("?") != -1) {
                    return [];
                }

                return urls.filter((option) => option.indexOf(query)>-1);
            });
        }).then((urls) => {
            const serviceTextLength = apiService.text.length;
            const useLastPathSegmentOnly = serviceTextLength !== undefined && serviceTextLength > 64;

            return Promise.all(urls.map((url) => {
                if (!useLastPathSegmentOnly) {
                    return {
                        fullUrl: url,
                        url: url
                    };
                }
                return constructGraphLinksFromFullPath(url).then((links) => {
                    return {
                        url: ".../" + links[links.length - 1].name,
                        fullUrl: url
                    }
                });
            }));
        }).catch((e) => {
            debugger;
        }).then((a) => {
            return a;
        });
    }

    // custom link re-routing logic to resolve links
    $scope.$parent.$on("urlChange", function (event, args) {
        msGraphLinkResolution($scope, getJsonViewer().getSession().getValue(), args, apiService);
    });
    
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
        $scope.clearLastApiResponse();

        //create an object to store the api call
        let historyObj:HistoryRecord = {
            requestUrl: apiService.text,
            selectedVersion: apiService.selectedVersion,
            method: apiService.selectedOption,
            jsonInput: null
        };

        if (historyObj.method == 'POST' || historyObj.method == 'PATCH') {
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
            $scope.requestInProgress = false;
            const status = result.status;
            const headers = result.headers;
            const resultBody = result.data;

            if (isImageResponse(headers)) {
                handleImageResponse($scope, headers, status, handleUnsuccessfulQueryResponse);
            } else if (isHtmlResponse(headers)) {
                handleHtmlResponse(resultBody, headers);
            } else if (isXmlResponse(result)) {
                handleXmlResponse(resultBody, headers);
            } else {
                handleJsonResponse(resultBody, headers);
                // startSimFromGraphResponse(resultBody);
            }

            historyObj.duration = (new Date()).getTime()- startTime.getTime();
            historyObj.statusCode = status;
            saveHistoryObject(historyObj);

            $scope.lastApiResponse = {
                duration: historyObj.duration,
                statusCode: status
            } as GraphApiCall

            $scope.insufficientPrivileges = false;
        }

        function handleUnsuccessfulQueryResponse(result) {
            $scope.requestInProgress = false;
            const status = result.status;
            const headers = result.headers;
            const resultBody = result.data;

            handleJsonResponse(resultBody, headers);
            historyObj.duration = (new Date()).getTime()- startTime.getTime();
            historyObj.statusCode = status;
            saveHistoryObject(historyObj);

            $scope.lastApiResponse = {
                duration: historyObj.duration,
                statusCode: status
            } as GraphApiCall

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
});

angular.module('ApiExplorer')
    .directive('autocompleteSubmit', () => {
        return  (scope, element) => {
            element.bind("keydown keypress",  (event) => {
                if(event.which === 13) {
                    scope.$apply( () => {
                        scope.submit();
                    });
                    event.preventDefault();
                }
            });
        };
    });

angular.module('ApiExplorer')
    .directive('httpMethodSelect', function() {
        return function(scope, element, attrs) {
            setTimeout(() => {
                scope.apiService = apiService;

                scope.methods = [
                    'GET',
                    'POST',
                    'PATCH',
                    'DELETE'
                ];

                element[0].mwfInstances.t.selectMenu.subscribe({
                    onSelectionChanged: (method) => {
                        apiService.selectedOption = method.id;
                        if (apiService.selectedOption == 'POST' || apiService.selectedOption == 'PATCH') {
                            showRequestBodyEditor();
                        } else if (apiService.selectedOption == 'GET' || apiService.selectedOption == 'DELETE') {
                            tabConfig.disableRequestBodyEditor = true;
                            // setSelectedTab(0);
                        }
                        scope.$apply();
                    }
                })
                scope.$apply();
            }, 1500)
        }  
    });


angular.module('ApiExplorer')
    .directive('versionSelect', function() {
        return function(scope, element, attrs) {
            setTimeout(() => {
                scope.apiService = apiService;

                scope.items = GraphExplorerOptions.GraphVersions;

                scope.$watch("apiService.selectedVersion", (newValue, oldValue) => {
                    if (oldValue === newValue) return;
                    const idx = scope.items.indexOf(newValue);
                    element[0].mwfInstances.t.selectMenu.onItemSelected(element[0].mwfInstances.t.selectMenu.items[idx])
                }, true);

                element[0].mwfInstances.t.selectMenu.subscribe({
                    onSelectionChanged: (version) => {
                        apiService.selectedVersion = version.id;
                        apiService.text = apiService.text.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|\/))/, (GraphExplorerOptions.GraphUrl + "/" + apiService.selectedVersion + "/"));
                        scope.$parent.$broadcast('updateUrlFromServiceText');
                        scope.$apply();
                    }
                })
                scope.$apply();
            }, 1500)
        }
    });

angular.module('ApiExplorer')
    .directive('queryRow', function() {
        return {
            scope: {
                query: '='
            }, template: `
            <div class="api-query" ng-click="runQuery(query)">
                <span class="request-badge" ng-class="query.method">{{query.method}}</span><span ng-attr-title="{{::getQueryText()}}" class="query">{{::getQueryText()}}</span>
            </div>`,
            controller: ($scope) => {
                const query = $scope.query as GraphApiCall;

                $scope.getQueryText = function() {
                    if (query.humanName) return query.humanName;
                    if (query.requestUrl) {
                        return query.requestUrl.split(GraphExplorerOptions.GraphUrl)[1];
                    }
                    return query.humanName || query.requestUrl;
                }
            
                $scope.runQuery = function() {
                    apiService.text = query.requestUrl;
                    apiService.selectedOption = query.method;
                    $scope.$parent.$parent.$broadcast('updateUrlFromServiceText');
                    $scope.$parent.submit();
                }
            }
    }});

angular.module('ApiExplorer')
    .directive('gettingStarted', function() {
        return function(scope, element, attrs) {
               let queries:GraphApiCall[] = GettingStartedQueries;
               scope.queries = queries;

               scope.runQuery = function(query:GraphApiCall) {
                   apiService.text = query.requestUrl;
                   apiService.selectedOption = query.method;
                   scope.$broadcast('updateUrlFromServiceText');
                   scope.submit();
               }
            }
    });

angular.module('ApiExplorer')
    .directive('responseMessage', function() {
        return {
            scope: {
                apiResponse: '='
            }, controller: ($scope) => {
                $scope.clearLastCallMessage = () => {
                    $scope.$parent.clearLastApiResponse();
                };

                $scope.createTextSummary = () => {
                    let apiRes = $scope.apiResponse as GraphApiCall;
                    if (!apiRes) return;

                    let text = "";
                    if (apiRes.statusCode >= 200 && apiRes.statusCode <= 300) {
                        $scope.success = true;
                        text += "Success"
                    } else {
                        $scope.success = false;
                        text += "Failure"
                    }

                    text += ` - Status Code ${apiRes.statusCode}`
                    return text;
                }
            },transclude: true,
            template: `<div ng-if="apiResponse" class="ms-MessageBar ms-MessageBar-singleline" ng-class="{'ms-MessageBar--success': success, 'ms-MessageBar--error': !success}">
                <div class="ms-MessageBar-content">
                    <div class="ms-MessageBar-icon">
                        <i class="ms-Icon" ng-class="{'ms-Icon--Completed': success, 'ms-Icon--errorBadge': !success}" ></i>
                    </div>
                    <div class="ms-MessageBar-actionables">
                        <div class="ms-MessageBar-text">
                            {{createTextSummary()}}<span id="duration-label">{{apiResponse.duration}}ms</span>
                        </div>
                    </div>
                    <div class="ms-MessageBar-actionsOneline">
                        <div id="dismiss-btn" class="ms-MessageBar-icon">
                            <a href="#" ng-click="clearLastCallMessage()"><i class="ms-Icon ms-Icon--Cancel"  style="padding-right: 10px;" title="LightningBolt" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
            </div>`
        }
        
    });
