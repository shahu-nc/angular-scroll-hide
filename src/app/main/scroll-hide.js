'use strict';

angular.module('scrollHide')
.directive('scrollHide', function () {
  return {
    link: function($scope, element, attrs) {
      $scope.param = parseInt(attrs.scrollHide, 10);
    }
  }
});
