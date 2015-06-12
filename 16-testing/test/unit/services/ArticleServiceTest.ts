
describe("ArticleService", () => {

    var $httpBackend : ng.IHttpBackendService;
    var articleService : at.IArticleResource;

    beforeEach(module('tutorialApp'));

    beforeEach(() => {
        inject(function (_$filter_, _$httpBackend_, Article) {
            $httpBackend = _$httpBackend_;
            articleService = Article;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should initialize correctly", () => {
        expect(articleService).toBeDefined();
    });

    it("should load articles", () => {
        $httpBackend.expectGET("articles.json").respond([
            {"id": "1", "name": "Pizza Vegetaria", "price": 5 },
            {"id": "2", "name": "Pizza Salami",    "price": 5.5 },
            {"id": "3", "name": "Pizza Thunfisch", "price": 6 },
            {"id": "4", "name": "Aktueller Flyer", "price": 0 }
        ]);

        var articles = articleService.query(function(){
            expect(articles).toBeDefined();
        });
        $httpBackend.flush();
    });
});