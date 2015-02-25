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
        currentYPosition = pixels;
        return 'translateY(' + pixels + 'px)';
      };

      var scrollingUp = function(newScrollingYPosition) {
        var isScrollingUp = newScrollingYPosition < currentScrollingYPosition;
        currentScrollingYPosition = newScrollingYPosition;
        return isScrollingUp;
      };

      $scrollingEl.bind('scroll', function(e) {
        var scrollingYPosition = scrollingEl.scrollTop;
        var pixelsToScroll = scrollingYPosition * -1;

        if (scrollingUp(scrollingYPosition)) {
          $element.css({transform: translateY(0)});
        } else if (pixelsToScroll >= scrollLimit) {
          $element.css({transform: translateY(pixelsToScroll)});
        } else {
          $element.css({transform: translateY(scrollLimit)});
        }
      });
    }
  }
});
