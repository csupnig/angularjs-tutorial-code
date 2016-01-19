
module at{
    'use strict';

    angular.module('tutorialApp', ['atControllers', 'atDirectives', 'atFilters','ngResource', 'ngAnimate', 'ui.router'])
        .config(
            [
                '$httpProvider',
                '$stateProvider',
                '$urlRouterProvider',
                ($httpProvider,
                 $stateProvider,
                 $urlRouterProvider) => {

                    $stateProvider
                        .state('app', {
                            url:'/',
                            templateUrl: 'welcome.html'
                        })
                        .state('routeresolve', {
                            url:'/route',
                            controller: 'ArticlesRouteCtrl',
                            controllerAs : 'vm',
                            templateUrl: 'articles.html',
                            resolve : {
                                value : ['ArticleService', (articleService : ArticleService) => {
                                    return articleService.load();
                                }]
                            }
                        })
                        .state('controllerresolve', {
                            url:'/ctrl',
                            controller: 'ArticlesCtrlCtrl',
                            controllerAs : 'vm',
                            templateUrl: 'articles.html'
                        })
                        .state('controlleremptystate', {
                            url:'/empty',
                            controller: 'ArticlesCtrlCtrl',
                            controllerAs : 'vm',
                            templateUrl: 'articlesempty.html'
                        })
                        .state('about', {
                            url:'/about',
                            template: 'About our little pizza company.'
                        });
                    $urlRouterProvider.otherwise('/');
                }]);

}
