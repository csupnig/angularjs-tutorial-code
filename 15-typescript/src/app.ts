
module at{
    'use strict';

    angular.module('tutorialApp', ['atControllers', 'atDirectives','ngResource', 'ngAnimate', 'ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/', { templateUrl: 'articles.html' })
                .when('/about', { template: 'Über unsere Pizzeria.' })
                .otherwise({ redirectTo: '/'});
        }]);

}