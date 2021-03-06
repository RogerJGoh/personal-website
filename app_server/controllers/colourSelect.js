//auto-complete suggestion and responsive button label using Angular 1.0.0

function DefaultCtrl($scope) {
    $scope.names = ["red","orange","yellow","green","blue","indigo", "violet"];
}

angular.module('MyModule', []).directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
});