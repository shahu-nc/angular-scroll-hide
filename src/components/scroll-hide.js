'use strict';

angular.module('scrollHide', [])
.directive('scrollHide', function($window) {
  return {
    link: function($scope, $element, attrs) {
      var scrollLimit = parseInt(attrs.scrollHide, 10) * -1;
      var $$window = angular.element($window);
      var currentYPosition = 0;
      var currentWindowYPosition = 0;
      
      var translateY = function(pixels) {
        currentYPosition = pixels;
        return 'translateY(' + pixels + 'px)';
      };

      var scrollingUp = function(newWindowYPosition) {
        var isScrollingUp = newWindowYPosition < currentWindowYPosition;
        currentWindowYPosition = newWindowYPosition;
        return isScrollingUp;
      };

      $$window.bind('scroll', function() {
        var windowYPosition = $window.pageYOffset;
        var pixelsToScroll = windowYPosition * -1;

        if (scrollingUp(windowYPosition)) {
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
