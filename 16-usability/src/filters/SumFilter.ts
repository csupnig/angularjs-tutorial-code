
module at {
    'use strict';

    export class SumFilter {

        public static $inject:Array<string> = [];

        constructor() {
        }

        filter(items:Array<IArticle>):number {
            var result = 0;
            if (!angular.isUndefined(items)) {
                return items.reduce(function(total : number, article:IArticle) {
                    return total + article.price;
                }, 0);
            }
            return result;
        }
    }

    angular.module('atFilters')
        .filter('sumfilter', function(){
            return (new SumFilter()).filter;
        })

}