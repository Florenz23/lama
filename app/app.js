angular.module('myApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/list1");
        //
        // Now set up the states
        $stateProvider
            .state('list1', {
                url: "/list",
                templateUrl: "views/ratingList/rating-list-main.html",
                controller:'scoreCtrl',
                controllerAs: "scoreCtrl"
            })
            .state('insert1', {
                url: "/insert",
                templateUrl: 'views/addStar/add-star-main.html',
                controller: 'insertCtrl'
            })
    })
    .directive('pageHeader', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/main/page-header.html'
        };
    })
    .directive('ratingListMain', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/ratingList/rating-list-main.html'
        };
    })
    .directive('addStarMain', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/addStar/add-star-main.html'
        };
    });
