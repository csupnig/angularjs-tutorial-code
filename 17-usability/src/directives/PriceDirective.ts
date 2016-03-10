
module at {
    'use strict';

    export interface IPriceScope extends ng.IScope {
        value : number;
    }

    export class PriceDirective {

        public static $inject: Array<string> = [];

        constructor() {
            var directive: ng.IDirective = {};
            directive.priority = 0;
            directive.restrict = "EA";
            directive.scope = {
                value:"="
            };
            directive.template= '<span ng-show="value == 0">kostenlos</span>' +
            '<span ng-show="value > 0">{{value | currency}}</span>';

            return directive;
        }
    }

    angular.module('atDirectives')
        .directive('price', PriceDirective);
}
