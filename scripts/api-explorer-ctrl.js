var a;
angular.module('ApiExplorer')
    .controller('ApiExplorerCtrl', ['$scope', '$http', '$location', 'ApiExplorerSvc', '$timeout', function ($scope, $http, $location, apiService, $timeout) {
        a = $scope;
        $scope.getUsername = function() {
            if (!$scope.userInfo) {
                console.log('userInfo does not exist');
                return;
            }

            return $scope.userInfo.mail || $scope.userInfo.userPrincipalName;
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
                login_hint: $scope.userInfo.mail
            }, function(res) {
                debugger;
                try {
                    if (res.authResponse) {
                        var accessToken = res.authResponse.access_token;
                        $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                    }

                } catch (e) {
                    console.error(e);
                }
            }, function(res) {
                debugger;
                console.error(res);
            });
        }

        hello.on('auth.login', function (auth) {
            var accessToken = null;

            if (auth.network == "msft_token_refresh") {
                accessToken = hello('msft_token_refresh').getAuthResponse().access_token;
            } else if (auth.network == "msft") {
                accessToken = hello('msft').getAuthResponse().access_token;
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                apiService.performQuery("GET")("https://graph.microsoft.com/v1.0/me/", null, {})
                    .success(function(res, statusCode) {
                        saveUserState(res);
                    })
                    .error(function() {
                        console.error("Error getting user info");
                    });

            }

            if (accessToken) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
            }
        });
        
        $scope.showJsonEditor = apiService.showJsonEditor;
        $scope.showJsonViewer = apiService.showJsonViewer;
        $scope.showImage = false;
        
        // For deep linking into the Graph Explorer
        var requestVal = $location.search().request;
        var actionVal = $location.search().method;
        var bodyVal = $location.search().body;
        var versionVal = $location.search().version;
        var headersVal = $location.search().headers;
        
        handleQueryString(apiService, actionVal, versionVal, requestVal);
        
        $timeout(function() {
            initializeJsonEditorHeaders($scope, headersVal);
            initializeJsonViewer($scope, apiService);
        });
        
        parseMetadata(apiService, $scope);

        $scope.isAuthenticated = function() {
            var session = hello('msft').getAuthResponse();

            if (session === null) return false;
            var currentTime = (new Date()).getTime() / 1000;
            return session && session.access_token && session.expires > currentTime;
        };

        $scope.getEditor = function() {
            return apiService.showJsonEditor;
        }

        $scope.$watch("getEditor()", function(event, args) {
            $scope.showJsonEditor = $scope.getEditor();
            if ($scope.showJsonEditor) {
                initializeJsonEditor($scope, bodyVal);
            }
        });

        function saveUserState(userInfo) {
            $scope.userInfo = userInfo;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }

        function loadUserInfo() {
            var userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                $scope.userInfo = JSON.parse(userInfo);
            }
        }

        function clearUserInfo() {
            localStorage.clear('userInfo');
        }

        loadUserInfo();

        // https://docs.microsoft.com/en-us/azure/active-directory/active-directory-v2-protocols-implicit
        $scope.login = function () {
            hello('msft').login({
                display: 'page',
                response_type: "id_token token",
                nonce: "abc"
            }, function(res) {

            }, function() {
                console.error('error signing in');
            });
        };

        $scope.logout = function () {
            hello('msft').logout();
            clearUserInfo();
        };

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        
}]);

angular.module('ApiExplorer')
    .controller('DropdownCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {
    
        $scope.selectedOption = apiService.selectedOption;

        $scope.onItemClick = function(choice) {
            $scope.selectedOption = choice;
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
    
        $scope.getOption = function() {
            return $scope.selectedOption;
        }

        $scope.$watch("getOption()", function(newVal, oldVal) {
            if (oldVal !== newVal) {
                apiService.selectedOption = $scope.selectedOption;
                apiService.text = apiService.text.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|\/))/, ("https://graph.microsoft.com/" + apiService.selectedVersion + "/"));
                if ($scope.selectedOption == 'POST' || $scope.selectedOption == 'PATCH') {
                    apiService.showJsonEditor = true;
                    showRequestHeaders($scope);
                    $scope.setSelectedTab(1);
                } else if ($scope.selectedOption == 'GET' || $scope.selectedOption == 'DELETE') {
                    apiService.showJsonEditor = false;
                    $scope.setSelectedTab(1);
                }
            }
        });
    }]);  
        
angular.module('ApiExplorer')
    .controller('VersionCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {
        $scope.selectedVersion = apiService.selectedVersion;
        
        $scope.items = [
            'beta',
            'v1.0',
          ];
    
        $scope.getVersion = function() {
            return $scope.selectedVersion;
        }
        
       $scope.getServiceVersion = function() {
            return apiService.selectedVersion;
        }
        
        $scope.onItemClick = function(choice) {
            $scope.selectedVersion = choice;
            apiService.selectedVersion = choice;
        }
        $scope.$watch("getVersion()", function(newVal, oldVal) {
            if (oldVal !== newVal) {
                apiService.selectedVersion = $scope.selectedVersion;
                if ($scope.$parent.searchText) {
                    apiService.text = $scope.$parent.searchText.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|\/))/, ("https://graph.microsoft.com/" + apiService.selectedVersion + "/"));
                } else {
                    apiService.text = apiService.text.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|\/))/, ("https://graph.microsoft.com/" + apiService.selectedVersion + "/"));    
                }
                parseMetadata(apiService, $scope);
            }
        });
}]);

angular.module('ApiExplorer')
    .controller('datalistCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {
        $scope.urlOptions = {};
        $scope.urlArray = []; 
        $scope.urlArrayHash = {};
        
        $scope.getEntity = function() {
            return apiService.entity;
        }

        $scope.getText = function() {
            return apiService.text;
        }
        
        $scope.$watch("getText()", function(event, args) {
             $scope.text = apiService.text;
             this.searchText = $scope.text;
        });

       $scope.searchTextChange = function(searchText) {
            this.searchText = searchText;
            if (searchText.charAt(searchText.length-1) === "/" && apiService.entity && getEntityName(searchText) !== apiService.entity.name) {
                if (apiService.cache.get(apiService.selectedVersion + "Metadata")) {
                    apiService.text = searchText;
                    setEntity(getEntityName(searchText), apiService, true);
                }
            }
       }

       $scope.urlHashFunction = function(urlObj) {
            var hash = urlObj.autocompleteVal.length;
            for(var i=0; i<urlObj.name.length; i++) {
                hash += urlObj.name.charCodeAt(i);
            }
            return hash;
       }

        $scope.$on("clearUrlOptions", function() {
            console.log("clearing options");
            $scope.urlOptions = {};
            $scope.urlArray = [];
            $scope.urlArrayHash = {};
        });

        $scope.$on("updateUrlOptions", function() {
            console.log("updating url options");
            console.log(apiService.entity);
            if (apiService.entity && apiService.entity.name === apiService.selectedVersion) {
                 $scope.urlOptions = apiService.cache.get(apiService.selectedVersion + "EntitySetData");
                 apiService.entity.name = apiService.selectedVersion;
            }else if (apiService.entity != null) {
                $scope.urlOptions = apiService.entity.URLS;  
            }else{
                return;
            }

            //for each new URL to add
            for(var x in $scope.urlOptions) {

                if (apiService.text.charAt((apiService.text).length-1) != '/') {
                    $scope.urlOptions[x].autocompleteVal = apiService.text + '/' + $scope.urlOptions[x].name;
                }else{
                    $scope.urlOptions[x].autocompleteVal = apiService.text + $scope.urlOptions[x].name;
                }

                //find the hash bucket that it would be in
                var hashNumber = $scope.urlHashFunction($scope.urlOptions[x]);
                var bucket = $scope.urlArrayHash[hashNumber.toString()];
                //if it exists
                if (bucket) {
                    var inBucket = false;
                    //for each value already in the hash, 
                     for(var i=0; i<bucket.length; i++) {
                        //check to see if its the value to add
                        if (bucket[i].autocompleteVal === $scope.urlOptions[x].autocompleteVal) {
                            inBucket = true;
                            break;
                        } 
                     }

                    if (!inBucket) {
                        //if its not, add it
                         bucket.push($scope.urlOptions[x]);
                         $scope.urlArray.push($scope.urlOptions[x]);
                    }

                }else{
                    //if the bucket does not already exist, create a new array and add it
                     $scope.urlArrayHash[hashNumber.toString()] = [$scope.urlOptions[x]];
                     $scope.urlArray.unshift($scope.urlOptions[x]);
                }
            }

        });

        $scope.$watch("getEntity()", function(event, args) {
            console.log("entity changed - changing URLs");
            $scope.$emit("updateUrlOptions");

        }, true);


       $scope.getMatches = function(query) {
         if (apiService.cache.get(apiService.selectedVersion + "EntitySetData")) {
              return $scope.urlArray.filter(function(option) {

                  var queryInOption = (option.autocompleteVal.indexOf(query)>-1);
                  var queryIsEmpty = (getEntityName(query).length == 0);

                  return queryIsEmpty || queryInOption;
              });
         } else {
             var obj = {
                 autocompleteVal: apiService.text
             }
             return [obj];
         }
     }
        
}]);


angular.module('ApiExplorer').controller('FormCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {
    $scope.history = [];
    $scope.text = apiService.text;
    $scope.requestInProgress = false;
    $scope.entityItem = null;
    $scope.insufficientPrivileges = false;

    if (apiService.selectedOption === 'POST' || apiService.selectedOption === 'PATCH') {
        $scope.requestTab = 1;
    } else {
        $scope.requestTab = 0;
    }

    $scope.submissionInProgress = false;
            
    $scope.getText = function() {
        return apiService.text;
    }
    
    $scope.$watch("getText()", function(event, args) {
        $scope.text = apiService.text;
    });
 
    // custom link re-routing logic to resolve links
    $scope.$parent.$on("urlChange", function (event, args) {
        msGraphLinkResolution($scope, $scope.$parent.jsonViewer.getSession().getValue(), args, apiService);
    });
    
    //function called when link in the back button history is clicked
    $scope.historyOnClick = function(input) {
        if (input.urlText == "Query") {
            return;
        }
        
        $scope.text = input.urlText;
        apiService.selectedVersion = input.selectedVersion;
        apiService.selectedOption = input.htmlOption;

        if (input.htmlOption == 'POST' || input.htmlOption == 'PATCH') {
            apiService.showJsonEditor = true;
            if ($scope.jsonEditor) {
                $scope.jsonEditor.getSession().setValue(input.jsonInput);
            } else {
                console.error("json editor watch event not firing");
            }
        } else {
            //clear jsonEditor
            if ($scope.jsonEditor) {
                $scope.jsonEditor.getSession().setValue("");
            }
            apiService.showJsonEditor = false;

        }
        $scope.submit($scope.text);
    }
    
    $scope.closeAdminConsentBar = function() {
        $scope.insufficientPrivileges = false;
    }

    $scope.getAdminConsent = function () {
        hello('msft_admin_consent').login({
            display: 'popup'
        }).then(function() {
            debugger;
            $scope.finishAdminConsertFlow();
        }, function() {
            debugger;
            $scope.finishAdminConsertFlow();
        })
    }
    
    $scope.selectedItemChange = function(item) {
        $scope.entityItem = item;
    }
    
    $scope.setSelectedTab = function(num) {
        if (num >= 2 || num < 0) {
            return;
        } else {
            $scope.requestTab = num;
        }
    }

    $scope.submit = function (query) {
        if (!query) {
            return;
        }
        
        apiService.text = query;
        $scope.requestInProgress = true;

        //create an object to store the api call
        var historyObj = {};

        historyObj.urlText = query;
        historyObj.selectedVersion = apiService.selectedVersion;
        historyObj.htmlOption = apiService.selectedOption;


        if (historyObj.htmlOption == 'POST' || historyObj.htmlOption == 'PATCH') {
            historyObj.jsonInput = $scope.jsonEditor.getSession().getValue();
        } else {
            historyObj.jsonInput = "";
        }

        $scope.showJsonViewer = true;
        $scope.showImage = false;


        var postBody = "";
        if ($scope.jsonEditor != undefined) {
            postBody = $scope.jsonEditor.getSession().getValue();
        }

        var requestHeaders = "";
        if ($scope.jsonEditorHeaders != undefined) {
            requestHeaders = $scope.jsonEditorHeaders.getSession().getValue();
            requestHeaders = formatRequestHeaders(requestHeaders);
        }

        var startTime = new Date();

        var handleSuccessfulQueryResponse = function(results, status, headers) {
            if (isImageResponse(headers)) {
                handleImageResponse($scope, apiService, startTime, results, headers, status, handleUnsuccessfulQueryResponse);
            } else if (isHtmlResponse(headers)) {
                handleHtmlResponse($scope, startTime, results, headers, status);
            } else if (isXmlResponse(results)) {
                handleXmlResponse($scope, startTime, results, headers, status);
            } else {
                handleJsonResponse($scope, startTime, results, headers, status);
            }

            saveHistoryObject(historyObj, status);


            if (apiService.cache.get(apiService.selectedVersion + "Metadata") && apiService.selectedOption == "GET") {
                setEntity($scope.entityItem, apiService, true, apiService.text);
            }

            $scope.insufficientPrivileges = false;
        }

        var handleUnsuccessfulQueryResponse = function(err, status) {
            handleJsonResponse($scope, startTime, err, null, status);
            saveHistoryObject(historyObj, status);
            if (apiService.cache.get(apiService.selectedVersion + "Metadata") && apiService.selectedOption == "GET") {
                setEntity($scope.entityItem, apiService, false, apiService.text);
            }

            if (status === 401 || status === 403) {
                $scope.insufficientPrivileges = true;
            }
        }


        if ($scope.isAuthenticated()) {
            apiService.performQuery(apiService.selectedOption)(apiService.text, postBody, requestHeaders)
                .success(handleSuccessfulQueryResponse)
                .error(handleUnsuccessfulQueryResponse);

        } else {
            apiService.performAnonymousQuery(apiService.selectedOption)(apiService.text, postBody, requestHeaders)
                .success(handleSuccessfulQueryResponse)
                .error(handleUnsuccessfulQueryResponse);
        }
        
        $scope.setSelectedTab(1);
    };

    
    function saveHistoryObject(historyObject, statusCode) {
        historyObject.successful = statusCode >= 200 && statusCode < 300;
        historyObject.statusCode = statusCode;
        historyObject.duration = $scope.duration;
        $scope.history.splice(0, 0, historyObject); //add history object to the array
    }
}]);