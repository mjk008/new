;( function( $, window, document, undefined ) {

	'use strict';

		var pluginName = 'firstScreen',
			_elHeight,
			$_window = $(window),
			defaults = {
				navEl : '#navbar-main',
				navStickyClass: 'navbar-main-fixed',
				navAbsClass: 'navbar-main-abs',
				navSmallAction: 'navbar-sm',
				navDataAction: 'action'
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
				if(!$(this.settings.navEl).hasClass(this.settings.navStickyClass) && !$(this.settings.navEl).hasClass(this.settings.navAbsClass)) {
					this.setScreen();
					var that = this;
					$(window).resize(function(e){
						that.setScreen();
					});
				}
			},
			setScreen: function(){
				this.calcHeight();
				this.$el.height(_elHeight);
			},
			calcHeight : function() {
				// also need to calc if it's going to be small after first-screen
				var navEl = this.settings.navEl;
				_elHeight = $_window.height() - $(navEl).height();
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