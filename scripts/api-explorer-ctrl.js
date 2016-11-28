angular.module('ApiExplorer')
    .controller('ApiExplorerCtrl', ['$scope', '$http', '$location', 'ApiExplorerSvc', function ($scope, $http, $location, apiService) {

        hello.on('auth.login', function (auth) {
            var accessToken = hello('msft').getAuthResponse().access_token;
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

            apiService.performQuery("GET")("https://graph.microsoft.com/v1.0/me/", null, {})
                .success(function(res, statusCode) {
                    $scope.userInfo = res;
                })
                .error(function() {
                    console.error("Error getting user info")
                    debugger;
                });
        });

        
        $scope.showJsonEditor = apiService.showJsonEditor;
        $scope.showJsonViewer = apiService.showJsonViewer;
        $scope.showImage = false;
        initializeJsonViewer($scope, run, apiService);
        
        var requestVal = $location.search().request;
        var actionVal = $location.search().method;
        var bodyVal = $location.search().body;
        var versionVal = $location.search().version;
        var headersVal = $location.search().headers;
        
        handleQueryString(apiService, actionVal, versionVal, requestVal);
        
        initializeJsonEditorHeaders($scope, headersVal); 
        
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

        $scope.login = function () {
            hello('msft').login({
                display: 'popup'
            });
        };
        
        $scope.logout = function () {
            hello('msft').logout();
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
                console.log("switching to: " + $scope.selectedOption);
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

        $scope.selectedVersion = "Version";

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
              return $scope.urlArray.filter( function(option) {

                  var queryInOption = (option.autocompleteVal.indexOf(query)>-1);
                  var queryIsEmpty = (getEntityName(query).length == 0);

                  return  queryIsEmpty || queryInOption;
              });
         }else{
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
    $scope.hasAResponse = false;
    $scope.insufficientPrivileges = false;
    if (apiService.selectedOption === 'POST' || apiService.selectedOption === 'PATCH') {
        $scope.requestTab = 1;
    }else{
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
            scope: $scope.adminScopes,
            display: 'popup'
        });
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
        
        console.log("submitting " + apiService.text);
        $scope.requestInProgress = true;
        
        var accountType = "";

        if ($scope.isAuthenticated()) {
            // accountType = adalService.getAccountType();
        }else{
            accountType = "anonymous";
        }

        console.log("account type: ", accountType);
        
        if (typeof ga !== "undefined") {
            ga('send', 'account', 'GraphExplorer', accountType);
            ga('send', 'query', 'GraphExplorer', apiService.selectedOption + " " + query);
        }

        /*MscomCustomEvent('ms.InteractionType', '4', 'ms.controlname', 'graphexplorer', 'ms.ea_action', $scope.selectedOptions, 'ms.contentproperties', $scope.text);*/
        
        //create an object to store the api call
        var historyObj = {};

        historyObj.urlText = apiService.text;
        historyObj.selectedVersion = apiService.selectedVersion;
        historyObj.htmlOption = apiService.selectedOption;


        if (historyObj.htmlOption == 'POST' || historyObj.htmlOption == 'PATCH') {
            historyObj.jsonInput = $scope.jsonEditor.getSession().getValue();
        }else{
            historyObj.jsonInput ="";
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

            saveHistoryObject(status);
            $scope.hasAResponse = true;


            if (apiService.cache.get(apiService.selectedVersion + "Metadata") && apiService.selectedOption == "GET") {
                setEntity($scope.entityItem, apiService, true, apiService.text);
            }

            $scope.insufficientPrivileges = false;
        }

        var handleUnsuccessfulQueryResponse = function(err, status) {
            handleJsonResponse($scope, startTime, err, null, status);
            saveHistoryObject(status);
            $scope.hasAResponse = true;
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
            if (apiService.selectedOption == "POST" || apiService.selectedOption == "PATCH" || apiService.selectedOption == "DELETE") {
                var error = "action: " + apiService.selectedOption +  " not supported in anonymous login scenario";
                console.log(error);
                handleJsonResponse($scope, startTime, error, null, status);
                return;
            }
            
            apiService.performAnonymousQuery(apiService.selectedOption)(apiService.text, postBody, requestHeaders)
                .success(handleSuccessfulQueryResponse)
                .error(handleUnsuccessfulQueryResponse);
        }
        
        $scope.setSelectedTab(1);  

        function saveHistoryObject(statusCode) {
            historyObj.successful = statusCode >= 200 && statusCode < 300;
            historyObj.statusCode = statusCode;
            historyObj.duration = $scope.duration;
            $scope.history.splice(0, 0, historyObj); //add history object to the array
        }

    };
}]);