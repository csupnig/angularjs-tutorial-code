
describe("SumFilter", () => {

    var $filter : ng.IFilterService;

    beforeEach(module('tutorialApp'));

    beforeEach(() => {
        inject(function (_$filter_) {
            $filter = _$filter_;
        });
    });

    it("should initialize correctly", () => {
        var sumFilter = $filter('sumfilter');
        expect(sumFilter).toBeDefined();
    });

    it("should add up prices", () => {
        var sumFilter = $filter('sumfilter');
        expect(sumFilter([
            {"id": "1", "name": "Pizza Vegetaria", "price": 5 },
            {"id": "2", "name": "Pizza Salami",    "price": 5.5 },
            {"id": "3", "name": "Pizza Thunfisch", "price": 6 },
            {"id": "4", "name": "Aktueller Flyer", "price": 0 }
        ])).toBe(16.5);
    });
});

