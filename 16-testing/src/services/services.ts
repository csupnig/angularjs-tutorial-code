
module at {
    'use strict';

    angular.module('atServices', [])

        .factory('Article',['$resource',($resource : ng.resource.IResourceService) : IArticleResource => {

            // Return the resource, include your custom actions
            return <IArticleResource> $resource('articles.json', {}, {
                query: { method: 'GET', params: {}, isArray: true }
            });

        }])
        .factory('Cart',[ () : CartService => {
            return new CartService();
        }]);

}