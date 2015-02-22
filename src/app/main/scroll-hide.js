'use strict';

angular.module('scrollHide')
.directive('scrollHide', function($window) {
  return {
    link: function($scope, $element, attrs) {
      var scrollLimit = parseInt(attrs.scrollHide, 10) * -1;
      var $$window = angular.element($window);
      var translateY = function(pixels) {
        return 'translateY(' + pixels + 'px)';
      };

      $$window.bind('scroll', function() {
        var pixelsToScroll = $window.pageYOffset * -1;

        if (pixelsToScroll >= scrollLimit) {
          $element.css({transform: translateY(pixelsToScroll)});
        }
      });
    }
  }
});
