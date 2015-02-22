'use strict';

describe('controllers', function(){
  var $scope;

  beforeEach(module('scrollHide'));

  beforeEach(inject(function($rootScope, $compile) {
    $scope = $rootScope.$new();
    var container = document.createElement('div');
    container.innerHTML = '<div scroll-hide="50"></div>';
    $compile(container)($scope);
  }));

  it('should return the passed parameter', function() {
    expect($scope.param).toEqual(50);
  });
});
