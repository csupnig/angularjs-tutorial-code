
module at{
    'use strict';

    angular.module('atFilters', [])
        .filter('sumfilter', function(){
            return (new SumFilter()).filter;
        });
}