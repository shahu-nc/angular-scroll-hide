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
    
    describe('scrolling within passed scroll limit', function() {
      beforeEach(function() {
        $$window[0].pageYOffset = 50;
        $$window.triggerHandler('scroll');
      });

      it('should transform the y-position by the scroll amount', function() {
        expect($scrollHideEl.css('transform')).toEqual('translateY(-50px)');
      });

      describe('scrolling back up', function() {

        beforeEach(function() {
          $$window[0].pageYOffset = 49;
          $$window.triggerHandler('scroll');
        });

        it('should set translateY to 0', function() {
          expect($scrollHideEl.css('transform')).toEqual('translateY(0px)');
        });

        describe('continue scrolling up', function() {
          it('should maintain the y position at 0', function() {
            $$window[0].pageYOffset = 48;
            $$window.triggerHandler('scroll');
            expect($scrollHideEl.css('transform')).toEqual('translateY(0px)');
          });
        });
      });
    });

    describe('scrolling past passed scroll limit', function() {
      it('should not transform the y-position by more than the passed limit', function() {
        $$window[0].pageYOffset = 51;
        $$window.triggerHandler('scroll');
        expect($scrollHideEl.css('transform')).toEqual('translateY(-50px)');
      });
    });

  });
});
