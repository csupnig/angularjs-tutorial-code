
module at{
    'use strict';

    //Interface to describe the scope
    export interface ICartScope extends ng.IScope {
        vm:CartCtrl;
    }

    export class CartCtrl {


        public static $inject = [
            '$scope', 'Cart'
        ];

        constructor(private $scope:ICartScope, public cart : CartService) {
            this.$scope.vm = this;
        }



    }

}