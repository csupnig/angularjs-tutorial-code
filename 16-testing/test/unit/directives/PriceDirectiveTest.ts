
describe("PriceDirective", () => {

    var $compile : ng.ICompileService;
    var $rootScope : ng.IRootScopeService;

    beforeEach(module('tutorialApp'));

    beforeEach(() => {
        inject(function (_$compile_, _$rootScope_) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;
        });
    });

    describe("price is set", ()=>{
        it('price is correct', function() {
            // Compile a piece of HTML containing the directive
            var element = $compile("<div price value=\"6\"></div>")($rootScope);
            $rootScope.$digest();
            expect(element.html()).toContain("6");
        });
    });

    describe("free is working", ()=>{
        it('kostenlos should be displayed', function() {
            // Compile a piece of HTML containing the directive
            var element = $compile("<div price value=\"0\"></div>")($rootScope);
            $rootScope.$digest();
            expect(element.html()).toContain("kostenlos");
        });
    });
});