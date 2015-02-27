'use strict';

angular.module('scrollHide', [])
.directive('scrollHide', function($document) {
  return {
    link: function($scope, $element, attrs) {
      var scrollLimit = parseInt(attrs.scrollHide, 10) * -1;
      var scrollingEl = $document[0].querySelector(attrs.scrollingElement);
      var $scrollingEl = angular.element(scrollingEl);
      var currentYPosition = 0;
      var currentScrollingYPosition = 0;
      
      var translateY = function(pixels) {
        pixels = pixels <= 0 ? pixels : 0;
        currentYPosition = pixels;
        return 'translateY(' + pixels + 'px)';
      };

      var scrollingUp = function(newScrollingYPosition) {
        var isScrollingUp = newScrollingYPosition < currentScrollingYPosition;
        currentScrollingYPosition = newScrollingYPosition;
        return isScrollingUp;
      };

      var addTransform = function(transformValue) {
        $element.css({
          transform: transformValue,
          webkitTransform: transformValue,
          msTransform: transformValue
        });
      };

      var updateScrolling = function() {
        var scrollingYPosition = scrollingEl.scrollTop;
        var pixelsToScroll = scrollingYPosition * -1;

        if (scrollingUp(scrollingYPosition)) {
          addTransform(translateY(0));
        } else if (pixelsToScroll >= scrollLimit) {
          addTransform(translateY(pixelsToScroll));
        } else {
          addTransform(translateY(scrollLimit));
        }
      }

      $scrollingEl.bind('scroll', updateScrolling);

      $scope.$on('$destroy', function() {
        $scrollingEl.unbind('scroll', updateScrolling);
      });
    }
  }
});
