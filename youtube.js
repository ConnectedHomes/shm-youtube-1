
'use strict';

angular.module('shm.youtube', [])


.directive('youtube', ['YoutubeAPI', '$timeout', function (YoutubeAPI, $timeout) {
  return {
    template: '<div></div>',
    restrict: 'E',
    replace: true,
    scope: {
			video: '@',
    },
    link: function (scope, element, attrs) {
			var player;
			// sanitize atrributes
			if(!attrs.video) {
				throw new Error('Youtube directive: missing video attribute.');
			}
			attrs.mercy = attrs.mercy || 333;
			attrs.width = attrs.width || '100%';
			attrs.width = attrs.width.indexOf('%') === -1 ? attrs.width + 'px' : attrs.width;
			attrs.height = attrs.height || '100%';
			attrs.height = attrs.height.indexOf('%') === -1 ? attrs.height + 'px' : attrs.height;

			// DOM container
			element
				.attr('id', attrs.video)
				.css('height', attrs.height)
				.css('width', attrs.width)
				.attr('class', attrs.class);

			element.css('background', 'url(//s.ytimg.com/yts/img/icn_loading_animated-vflff1Mjj.gif) center black no-repeat');

			YoutubeAPI.loadBinary(function() {

				$timeout(function() {
					player = new YT.Player(attrs.video, {
						height: attrs.height,
						width: attrs.width,
						videoId: attrs.video,
					});
				}, attrs.mercy);

			});

			scope.$on('$destroy', function() {
				player.destroy();
				player = null;
			});
    }
  };
}])


.service('YoutubeAPI', ['$window', function ($window) {
  
	var loaded = 0;
  var callbacks = [];

  // Loads youtube async API
  // Throws error in Chrome https://code.google.com/p/google-cast-sdk/issues/detail?id=309 
	this.loadBinary = function(cb) {
		if(loaded === 2) {
      // already loaded
			cb();
			return;
		} else if(loaded === 1) {
      // loading already in progress
      callbacks.push(cb);
      return;
    }
    callbacks.push(cb);
    loaded = 1;
		var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);  
    $window.onYouTubeIframeAPIReady = this._apiReady;
	};

  this._apiReady = function() {
    loaded = 2;
    callbacks.forEach(function(cb) { cb(); });
    callbacks.length = 0;
    callbacks = null;
    delete $window.onYouTubeIframeAPIReady;
  };

}]);
