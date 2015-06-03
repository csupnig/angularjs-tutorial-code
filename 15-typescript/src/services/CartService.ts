
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

        sum() : number {
            return <number> this.items.reduce(function(total : number, article:IArticle) {
                return total + article.price;
            }, 0);
        }
    }

}