
module at{
    'use strict';



    export class ArticlesRouteCtrl extends AbstractCtrl{

        public static $inject : Array<string> = [
            'ArticleService',
            'value',
            'Cart'
        ];
        constructor(public articleService : ArticleService,
                    public articles : Array<IArticle>,
                    public cart : CartService) {
            super();
        }

    }

    angular.module('atControllers').controller('ArticlesRouteCtrl', ArticlesRouteCtrl);

}
