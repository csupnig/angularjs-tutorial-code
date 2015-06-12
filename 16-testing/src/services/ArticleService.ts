
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

}