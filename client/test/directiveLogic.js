
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
		console.log($templateCache);
		$rootScope.que = {
			TextResults: ["Abcd", "Abcd"],
			OptionsResults: null
		}
		//var element = $compile('<display-question ng-model="{{que}}"></display-question>')($rootScope);
		var element = $compile('<evaluation-question ng-model="{{que}}"></evaluation-question>')($rootScope);
		//$rootScope.$digest();
		//expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
	});
});
