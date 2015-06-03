
module at{
    'use strict';

    angular.module('atControllers', ['atServices'])
        .controller('ArticlesCtrl', ArticlesCtrl)
        .controller('CartCtrl', CartCtrl);

}