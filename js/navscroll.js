
;( function( $, window, document, undefined ) {

	'use strict';

		var pluginName = 'navScroll',
			_window = $(window),
			_body = $('body'),
			_windowHeight = _window.height(),
			_triggersDown = [],
			_triggersUp = [],
			_actions = [],
			_elHeight,
			_animateDown,
			_animateUp,
			defaults = {
				windowRange: 0.8,
				prefix : 'navbar-main',
				actionAttr : 'action'
			};

		function Plugin ( element, options ) {
			var self = this;
			this.element = element;
			this.$el = $(this.element);
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {
				this.getActions();
				if(_actions) {
					this.setAnimateClasses();
					this.windowScroll();
					this.elHeight();
					this.getTriggers();
				}
			},
			elHeight : function() {
				_elHeight = this.$el.height();
			},
			windowScroll: function() {
				var self = this;
				_window.on('scroll', function(){
					self.scrollSwitch();
				})
			},
			padded: function() {
				return _window.scrollTop() >= _windowHeight * this.settings.windowRange;
			},
			scrollSwitch: function() {
				if(this.padded()) {
					this.moveDownAction();
				} else {
					this.moveUpAction();
				}
			},
			moveDownAction: function() {
				this.applyTriggers(_triggersDown, this, false);
				this.applyTriggers(_triggersUp, this, true);
			},
			moveUpAction: function() {
				this.applyTriggers(_triggersDown, this, true);
				this.applyTriggers(_triggersUp, this, false);
			},
			applyTriggers: function(arr, obj, add) {
				$.each(arr, function(){
					if(add) {
						obj.$el.addClass(obj.getClassName(this));
						if(this == 'fixed') {
							obj.offsetBody();
							obj.stickyAnimate(true);
						}
					} else {
						if(this == 'fixed') {
							if(obj.$el.hasClass(obj.getClassName(this))) {
								obj.stickyAnimate(false);
								setTimeout(function() { 
								   obj.$el.removeClass(obj.getClassName('fixed'));
								   obj.resetBody();
								}, 200);
							}
						} else {
							obj.$el.removeClass(obj.getClassName(this));
						}
					}
				})
			},
			offsetBody: function() {
				// add animation on fixed position
				_body.css('margin-top', _elHeight + 'px');
			},
			resetBody: function() {
				_body.css('margin-top', '0px');
			},
			getActions: function() {
				if(this.$el.data(this.settings.actionAttr) != undefined) {
					_actions = this.$el.data(this.settings.actionAttr).split(' ');
				}
			},
			getTriggers: function() {
				var self = this;
				$.each(_actions, function(){
					var triggerDown,
						triggerUp
					switch(this) {
						case 'removeOpacity':
							// self.addTrigger(self.getOpacityClass());
							triggerDown = self.getOpacityClass();
							break;
						case 'sticky':
							triggerUp = 'fixed';
							break;
						case 'dark':
							triggerUp = 'dark';
							break;
						case 'white':
							triggerDown = 'dark';
							break;
					}
					self.addTrigger(triggerDown, triggerUp);
				});					 
			},
			getOpacityClass: function() {
				if(this.$el.hasClass(this.getClassName('transparent'))) {
					return 'transparent';
				} else {
					return 'transparent-darken';
				}
			},
			getClassName: function(item) {
				return this.settings.prefix + '-' + item;
			},
			addTrigger: function(itemDown, itemUp) {
				if(itemDown) {
					_triggersDown.push(itemDown);
				}
				if(itemUp) {
					_triggersUp.push(itemUp);
				}
			},
			setAnimateClasses: function() {
				var animateClass = this.settings.prefix + '-scroll-animate';
				_animateDown = animateClass + '-down';
				_animateUp = animateClass + '-up';
			},
			stickyAnimate: function(down) {
				if(down) {
					this.$el.addClass(_animateDown);
					this.$el.removeClass(_animateUp);
				} else {
					this.$el.addClass(_animateUp);
					this.$el.removeClass(_animateDown);
				}
			}
		});

		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, 'plugin_' + pluginName ) ) {
					$.data( this, 'plugin_' +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );