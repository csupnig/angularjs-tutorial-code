
module at {
    'use strict';


    export class CartService{

        private items : Array<IArticle> = [];

        constructor(){}

        getItems() : Array<IArticle> {
            return this.items;
        }

        addArticle(item:IArticle) {
            this.items.push(item);
        }
    }

    angular.module('atServices')

        .factory('Cart',[ () : CartService => {
            return new CartService();
        }]);

}