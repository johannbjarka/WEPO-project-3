describe("Main test suite", function() {

	var fakeEval = {
		getEval: function() { return ["3", "theTitle", "englishTitle"];}
	}

	var evalProvider;

	beforeEach (function() {
		evalProvider = new EvalProvider (fakeEval);
	});

	it("should have IS and EN title", function () {
		var result = evalProvider.hasTitle("theTitle");
		expect (result).toEqual("theTitle");
	});
});