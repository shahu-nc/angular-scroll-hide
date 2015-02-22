'use strict';

describe('controllers', function(){
  var $scrollHideEl, $$window;

  beforeEach(module('scrollHide'));

  beforeEach(function() {
    var $window = document.createElement('div');
    $$window = angular.element($window);

    module(function($provide) {
      $provide.value('$window', $window);
    });

    inject(function($rootScope, $compile) {
      var $scope = $rootScope.$new();
      var container = document.createElement('div');
      container.innerHTML = '<div scroll-hide="50"></div>';
      $scrollHideEl = $compile(container)($scope).find('div');
    })
  });

  describe('on window scroll', function() {
    it('should transform the y-position by the scroll amount', function() {
      $$window[0].pageYOffset = 5;
      $$window.triggerHandler('scroll');
      expect($scrollHideEl.css('transform')).toEqual('translateY(-5px)');
    });
  });
});
