'use strict';

describe('controllers', function(){
  var $scrollHideEl, $scrollingEl, $document, $rootScope;

  beforeEach(module('scrollHide'));

  beforeEach(inject(function(_$rootScope_, $compile, _$document_) {
    $rootScope = _$rootScope_;
    $document = _$document_;
    var $scope = $rootScope.$new();
    var container = $document[0].createElement('div');
    var scrollingEl = $document[0].createElement('div');
    scrollingEl.style.height = '100px';
    scrollingEl.style.overflow = 'scroll';
    scrollingEl.innerHTML = '<div style="height: 1000px">Test</div>';
    $scrollingEl = angular.element(scrollingEl);
    $scrollingEl.addClass('scrolling');
    $document[0].querySelector('body').appendChild(scrollingEl);

    spyOn($document[0], 'querySelector').and.callFake(function(selector) {
      if (selector === '.scrolling') {
        return scrollingEl;
      }
    });
    container.innerHTML = '<div scroll-hide="50" scrolling-element=".scrolling"></div>';
    $scrollHideEl = $compile(container)($scope).find('div');
  }));

  afterEach(function() {
    $scrollingEl.remove();
  });

  describe('on relative element scroll', function() {
    
    describe('scrolling within passed scroll limit', function() {
      beforeEach(function() {
        $scrollingEl[0].scrollTop = 50;
        $scrollingEl.triggerHandler('scroll');
      });

      it('should transform the y-position by the scroll amount', function() {
        expect($scrollHideEl.css('transform')).toEqual('translateY(-50px)');
        expect($scrollHideEl.css('webkitTransform')).toEqual('translateY(-50px)');
        expect($scrollHideEl.css('msTransform')).toEqual('translateY(-50px)');
      });

      describe('scrolling back up', function() {

        beforeEach(function() {
          $scrollingEl[0].scrollTop = 49;
          $scrollingEl.triggerHandler('scroll');
        });

        it('should set translateY to 0', function() {
          expect($scrollHideEl.css('transform')).toEqual('translateY(0px)');
          expect($scrollHideEl.css('webkitTransform')).toEqual('translateY(0px)');
          expect($scrollHideEl.css('msTransform')).toEqual('translateY(0px)');
        });

        describe('continue scrolling up', function() {
          it('should maintain the y position at 0', function() {
            $scrollingEl[0].scrollTop = 48;
            $scrollingEl.triggerHandler('scroll');
            expect($scrollHideEl.css('transform')).toEqual('translateY(0px)');
            expect($scrollHideEl.css('webkitTransform')).toEqual('translateY(0px)');
            expect($scrollHideEl.css('msTransform')).toEqual('translateY(0px)');
          });
        });
      });
    });

    describe('scrolling past passed scroll limit', function() {
      it('should not transform the y-position by more than the passed limit', function() {
        $scrollingEl[0].scrollTop = 51;
        $scrollingEl.triggerHandler('scroll');
        expect($scrollHideEl.css('transform')).toEqual('translateY(-50px)');
        expect($scrollHideEl.css('webkitTransform')).toEqual('translateY(-50px)');
        expect($scrollHideEl.css('msTransform')).toEqual('translateY(-50px)');
      });
    });

  });

  describe('on destroy', function() {
    it('should not transform the element', function() {
      $rootScope.$broadcast('$destroy');
      $scrollingEl[0].scrollTop = 50;
      $scrollingEl.triggerHandler('scroll');
      expect($scrollHideEl.css('transform')).not.toEqual('translateY(-50px)');
      expect($scrollHideEl.css('webkitTransform')).not.toEqual('translateY(-50px)');
      expect($scrollHideEl.css('msTransform')).not.toEqual('translateY(-50px)');
    });
  });
});
