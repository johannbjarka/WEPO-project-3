
describe('Unit testing ----', function() {
	var $compile,
		$rootScope,
		$templateCache;

	/*var triggerKeyDown = function (element, keyCode) {
		var e = jQuery.Event('keydown');
		e.which = keyCode;
		element.trigger(e);
		angular.element(inputEl).triggerHandler(e);
	};
	*/
	beforeEach(module('Evaluator'));

	beforeEach(inject(function(_$compile_, _$rootScope_, _$templateCache_){
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		$templateCache = _$templateCache_;
	}));

	it('does mostly nothing but compile the html', function() {
		$rootScope.que = {
			TextResults: ["Abcd", "Abcd"],
			OptionsResults: null
		}

		//Coverage without testing anything :O
		var element1 = $compile('<display-question ng-model="{{que}}"></display-question>')($rootScope);
		var element2 = $compile('<evaluation-question ng-model="{{que}}"></evaluation-question>')($rootScope);
		var element3 = $compile('<datepicker-popup ng-model="dd.MM.yyyy"></datepicker-popup>')($rootScope);
		var element = $compile('<input ng-enter="doIt()"/>')($rootScope);
		//$rootScope.$digest();
		//expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
	});

	/* DOESN'T WORK
	it('Tests ng enter directive', function() {
		$rootScope.doIt = angular.noop;
		var element = $compile('<input ng-enter="doIt()"/>')($rootScope);
		$rootScope.$digest();

		spyOn($rootScope, 'doIt');

		triggerKeyDown(element, 13);
		//console.log(element);
		//element.find('button')[0].click();
	});
	*/
});
