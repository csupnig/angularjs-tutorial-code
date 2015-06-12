
module at{
    'use strict';

    //Interface to describe the scope
    export interface IArticleScope extends ng.IScope {
        vm:ArticlesCtrl;
    }




    export class ArticlesCtrl {

        public articles : Array<IArticle>;

        public static $inject = [
            '$scope', 'Article', 'Cart'
        ];
        constructor(private $scope:IArticleScope, public article : IArticleResource, public cart : CartService) {
            this.$scope.vm = this;
            this.articles = article.query();
        }

    }

}