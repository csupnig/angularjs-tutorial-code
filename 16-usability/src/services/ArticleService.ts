
module at {
    'use strict';

    export interface IArticle
    {
        id: number;
        name : string;
        price : number;
    }


    export class ArticleService {
        private articlestore : Array<IArticle> = [];
        private static DELAY : number = 10000;

        public static $inject : Array<string> = [
            '$q',
            '$timeout'
        ];

        constructor(public $q : ng.IQService,
                    public $timeout : ng.ITimeoutService) {
            this.articlestore.push({
                id : 0,
                name : 'Pizza Diavolo',
                price : 8
            });
            this.articlestore.push({
                id : 1,
                name : 'Pizza Provinciale',
                price : 7
            });
            this.articlestore.push({
                id : 2,
                name : 'Pizza Spinacci',
                price : 9
            });
            this.articlestore.push({
                id : 3,
                name : 'Pizza Burger',
                price : 10
            });
        }

        public load() : ng.IPromise<Array<IArticle>> {
            var deferred = this.$q.defer();
            this.$timeout(() => {
                deferred.resolve(this.articlestore);
            }, ArticleService.DELAY);
            return deferred.promise;
        }
    }

    angular.module('atServices').service('ArticleService', ArticleService);
}

