'use strict';

angular.module('scrollHide')
.directive('scrollHide', function($window) {
  return {
    link: function($scope, $element, attrs) {
      var scrollLimit = parseInt(attrs.scrollHide, 10) * -1;
      var $$window = angular.element($window);
      var currentYPosition = 0;
      
      var translateY = function(pixels) {
        currentYPosition = pixels;
        return 'translateY(' + pixels + 'px)';
      };

      $$window.bind('scroll', function() {
        var pixelsToScroll = $window.pageYOffset * -1;

        if (pixelsToScroll > currentYPosition) {
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
