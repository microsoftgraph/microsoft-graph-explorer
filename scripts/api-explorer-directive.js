angular.module('ApiExplorer')
    .directive('apiExplorer', function() {
        return {
            scope: {
                strings: '=',
                scopes: '=',
                adminScopes: '=',
                clientId: '='
            },
            templateUrl: '/views/explorer.html',
            controller: function ($scope) {

                // default strings
                $scope.str = {
                    "go": "go",
                    "login_to_send_requests": "Login to send other types of requests",
                    "method": "Method",
                    "status_code": "Status Code",
                    "duration": "Duration",
                    "query": "Query",
                    "history": "History",
                    "sign_in": "sign in",
                    "sign_out": "sign out",
                    "using_sample_tenant": "Using demo tenant"
                };

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