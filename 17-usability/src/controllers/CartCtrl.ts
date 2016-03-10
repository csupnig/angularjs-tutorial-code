
module at{
    'use strict';

    //Interface to describe the scope
    export interface ICartScope extends ng.IScope {
        vm:CartCtrl;
    }

    export class CartCtrl extends AbstractCtrl{


        public static $inject = [
            '$scope', 'Cart'
        ];

        constructor(private $scope:ICartScope, public cart : CartService) {
            super();
            this.$scope.vm = this;
        }



    }

    angular.module('atControllers').controller('CartCtrl', CartCtrl);

}