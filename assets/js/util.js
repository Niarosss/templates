(function($) {
	$.fn.panel = function(userConfig) {
		// Vars.
			var	$this = $(this),
				$body = $('body'),
				$window = $(window),
				id = $this.attr('id'),
				config;
		// Config.
			config = $.extend({
				// Delay.
					delay: 0,
				// Hide panel on link click.
					hideOnClick: true,
				// Hide panel on escape keypress.
					hideOnEscape: true,
				// Hide panel on swipe.
					hideOnSwipe: true,
				// Side of viewport the panel will appear.
					side: null,
				// Target element for "class".
					target: $this,
				// Class to toggle.
					visibleClass: 'visible'
			}, userConfig);
			// Expand "target" if it's not a jQuery object already.
				if (typeof config.target != 'jQuery')
					config.target = $(config.target);
		// Panel.
			// Methods.
				$this._hide = function(event) {
					// Already hidden? Bail.
						if (!config.target.hasClass(config.visibleClass))
							return;
					// If an event was provided, cancel it.
						if (event) {
							event.preventDefault();
							event.stopPropagation();
						}
					// Hide.
						config.target.removeClass(config.visibleClass);
				};
			// Vendor fixes.
				$this
					.css('-ms-overflow-style', '-ms-autohiding-scrollbar')
					.css('-webkit-overflow-scrolling', 'touch');
			// Hide on click.
				if (config.hideOnClick) {
					$this
						.on('click', 'a', function(event) {
							var $a = $(this),
								href = $a.attr('href')
							if (!href || href == '#' || href == '' || href == '#' + id)
								return;
							// Cancel original event.
								event.preventDefault();
								event.stopPropagation();
							// Hide panel.
								$this._hide();
							// Redirect to href.
								window.setTimeout(function() {
										window.location.href = href;
								}, config.delay + 10);
						});
				}
			// Event: Touch stuff.
				$this.on('touchstart', function(event) {
					$this.touchPosX = event.originalEvent.touches[0].pageX;
					$this.touchPosY = event.originalEvent.touches[0].pageY;
				})
				$this.on('touchmove', function(event) {
					if ($this.touchPosX === null
					||	$this.touchPosY === null)
						return;
					var	diffX = $this.touchPosX - event.originalEvent.touches[0].pageX,
						diffY = $this.touchPosY - event.originalEvent.touches[0].pageY,
						th = $this.outerHeight(),
						ts = ($this.get(0).scrollHeight - $this.scrollTop());
					// Hide on swipe?
						if (config.hideOnSwipe) {
							var result = false,
								boundary = 20,
								delta = 50;
							switch (config.side) {
								case 'left':
									result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX > delta);
									break;
								case 'right':
									result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX < (-1 * delta));
									break;
								case 'top':
									result = (diffX < boundary && diffX > (-1 * boundary)) && (diffY > delta);
									break;
								case 'bottom':
									result = (diffX < boundary && diffX > (-1 * boundary)) && (diffY < (-1 * delta));
									break;
								default:
									break;
							}
							if (result) {
								$this.touchPosX = null;
								$this.touchPosY = null;
								$this._hide();
								return false;
							}
						}
				});
			// Event: Prevent certain events inside the panel from bubbling.
				$this.on('click touchend touchstart touchmove', function(event) {
					event.stopPropagation();
				});
		// Body.
			// Event: Hide panel on body click/tap.
				$body.on('click touchend', function(event) {
					$this._hide(event);
				});
			// Event: Toggle.
				$body.on('click', 'a[href="#' + id + '"]', function(event) {
					event.preventDefault();
					event.stopPropagation();
					config.target.toggleClass(config.visibleClass);
				});
		// Window.
			// Event: Hide on ESC.
				if (config.hideOnEscape)
					$window.on('keydown', function(event) {
						if (event.keyCode == 27)
							$this._hide(event);
					});
		return $this;
	};
})(jQuery);