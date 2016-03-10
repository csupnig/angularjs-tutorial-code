
module at{
    'use strict';



    export class ArticlesCtrlCtrl extends AbstractCtrl{

        public articles : Array<IArticle>;

        public static $inject : Array<string> = [
            'ArticleService',
            'Cart'
        ];
        constructor(public articleService : ArticleService,
                    public cart : CartService) {
            super();
            this.articleService.load().then((articles) => {
                this.articles = articles;
            });
        }

    }

    angular.module('atControllers').controller('ArticlesCtrlCtrl', ArticlesCtrlCtrl);

}
