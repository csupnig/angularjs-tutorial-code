/* global angular */
(function () {
    'use strict';

    angular.module('tutorialApp')
        .directive('price', function(){
            return {
                restrict: 'E',
                scope: {
                    value: '='
                },
                template: '<span ng-show="value == 0">kostenlos</span>' +
                    '<span ng-show="value > 0">{{value | currency}}</span>'
            };
        });
}());