var Evaluator = angular.module('Evaluator', ['ngRoute', 'ngAnimate', 'toastr', 'ui.bootstrap', 'chart.js']);
angular.module("Evaluator").constant("API", "http://localhost:19358/api/v1");

Evaluator.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});