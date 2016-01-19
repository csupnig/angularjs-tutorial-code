
describe("ArticleCtrl", () => {

    var $httpBackend : ng.IHttpBackendService;
    var articleService : at.IArticleResource;
    var cartService : at.CartService;
    var $controller : ng.IControllerService;

    beforeEach(module('tutorialApp'));

    beforeEach(() => {
        inject(function (_$controller_, _$httpBackend_, Article, Cart) {
            $httpBackend = _$httpBackend_;
            $controller = _$controller_;
            articleService = Article;
            cartService = Cart;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should initialize correctly", () => {
        expect(articleService).toBeDefined();
    });
    describe("$scope.vm.articles", ()=>{
        var scope, controller;
        beforeEach(()=>{
            scope = {};
            controller = $controller("ArticlesCtrl",{$scope:scope,Article:articleService,Cart:cartService});
        });

        it('articles has been initialized', function() {
            $httpBackend.expectGET("articles.json").respond([
                {"id": "1", "name": "Pizza Vegetaria", "price": 5 },
                {"id": "2", "name": "Pizza Salami",    "price": 5.5 },
                {"id": "3", "name": "Pizza Thunfisch", "price": 6 },
                {"id": "4", "name": "Aktueller Flyer", "price": 0 }
            ]);
            expect(scope.vm.articles).toBeDefined();
            $httpBackend.flush();
        });
    });

});