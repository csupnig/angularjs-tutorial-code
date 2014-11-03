/* global angular */
(function () {
    'use strict';

    angular.module('tutorialApp')
        .controller('ArticlesCtrl', ['$scope', 'Article', 'Cart', function($scope, Article, Cart){
            $scope.cart = Cart;
            $scope.articles = Article.query();
        }])
        .controller('CartCtrl', ['$scope', 'Cart', function($scope, Cart){
            $scope.cart = Cart;
        }]);
}());