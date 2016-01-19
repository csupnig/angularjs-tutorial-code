
module at{
    'use strict';



    export class ArticlesCtrl extends AbstractCtrl{

        public articles : Array<IArticle>;

        public static $inject = [
            '$scope', 'Article', 'Cart'
        ];
        constructor(private $scope:ng.IScope, public article : IArticleResource, public cart : CartService) {
            super();
            this.articles = article.query();
        }

    }

    angular.module('atControllers').controller('ArticlesCtrl', ArticlesCtrl);

}