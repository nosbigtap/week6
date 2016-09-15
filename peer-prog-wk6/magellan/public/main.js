angular.module( 'mainModule', [] )


angular.module( 'mainModule' )
    .controller('mainController', ['$scope', '$http', '$location', function($scope, $http, $location){
        console.log($location === window.location)
        $scope.next = function(location){
            $http.get('/next?location=' + location).then(function(returnData){
                console.log(returnData.data)
                window.location.href = '/html/' + returnData.data.nextLocation + '.html'
            })
        }

    }])
