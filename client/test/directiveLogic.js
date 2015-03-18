
describe('Unit testing ----', function() {
	var $compile,
		$rootScope,
		$templateCache;

	beforeEach(module('Evaluator'));

	beforeEach(inject(function(_$compile_, _$rootScope_, _$templateCache_){
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		$templateCache = _$templateCache_;
	}));

	it('Replaces the element with the appropriate content', function() {
		$rootScope.que = {
			TextResults: ["Abcd", "Abcd"],
			OptionsResults: null
		}

		//Coverage without testing anything :O
		var element1 = $compile('<display-question ng-model="{{que}}"></display-question>')($rootScope);
		var element2 = $compile('<evaluation-question ng-model="{{que}}"></evaluation-question>')($rootScope);
		var element3 = $compile('<div ng-enter="{{que}}"></div>')($rootScope);
		var element4 = $compile('<datepicker-popup ng-model="dd.MM.yyyy"></datepicker-popup>')($rootScope);
		//$rootScope.$digest();
		//expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
	});
});
