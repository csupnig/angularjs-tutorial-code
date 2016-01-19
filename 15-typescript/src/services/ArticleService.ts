
module at {
    'use strict';

    export interface IArticle extends ng.resource.IResource<IArticle>
    {
        id: number;
        name : string;
        price : number;
    }

    export interface IArticleResource extends ng.resource.IResourceClass<IArticle>
    {

    }

    angular.module('atServices')
        .factory('Article',['$resource',($resource : ng.resource.IResourceService) : IArticleResource => {

            // Return the resource, include your custom actions
            return <IArticleResource> $resource('articles.json', {}, {
                query: { method: 'GET', params: {}, isArray: true }
            });

        }])

}