/* =========================================================
 * mmui.js v1.1.0
 * author huangwenping@maimiaotech.com
 * ========================================================= */
define(function(require, exports, module) {

	var $ = require('jquery');
    var Position = require('./position');
    var Overlay = require('./overlay');

	/* Popup CLASS DEFINITION
	 * ====================== */
	var Popup = function(element, options) {
		this.options = options;
		this.$element = $(element);
	}

	Popup.prototype = {
		constructor : Popup,
		overlay : null,
		init : function() {
			var o = this.options, $this = this;

			if (o.modal) {
				this.overlay = new Overlay();
				this.overlay.show();
			}

			var _popup = $('<div class="mm-popup"></div>').appendTo('body').addClass(o.themeClass).css('z-index', o.zIndex);

			if (o.title != '') {
				var _head = $('<div class="hd"><span class="title">' + o.title + '</span></div>').appendTo(_popup);
				if(o.closeIcon){
					$('<span class="close" title="关闭">&times;</span>').appendTo(_head).click(function() {
						if(o.closeMode === 'destroy'){
							$this.destroy()
						} else {
							$this.hide();
						}
					});
				}
			}
			var _body = this.$element.appendTo(_popup).addClass('bd');

			if (o.buttons) {
				var _foot = $('<div class="ft"></div>').appendTo(_popup);

				if (!$.isArray(o.buttons)) {
					o.buttons = new Array(o.buttons);
				}
				for (var i = 0; i < o.buttons.length; i++) {
					var iBtn = o.buttons[i];
					oBtns = {};
					if (!iBtn.hasOwnProperty('text')) {
						for (var key in iBtn) {
							oBtns.text = key;
							oBtns.classname = 'confirm';
							oBtns.trigger = 'click';
							oBtns.handler = iBtn[key];
						}
					}
					if ( typeof (oBtns.handler) === 'string' && oBtns.handler === 'close') {
						$('<span class="button cancel-button">' + oBtns.text + '</span>').appendTo(_foot).click(function() {
							if(o.closeMode === 'destroy'){
								$this.destroy()
							} else {
								$this.hide();
							}
						});
					} else {
						$('<span class="button ' + oBtns.classname + '-button">' + oBtns.text + '</span>').appendTo(_foot).on(oBtns.trigger, oBtns.handler);
					}
				}
			}

			if (!o.width) {
				o.width = this.$element.outerWidth();
			}
			_popup.css('width', o.width);

			if (!o.height) {
				o.height = this.$element.outerHeight() + ( _head ? _head.outerHeight() : 0) + ( _foot ? _foot.outerHeight() : 0);
			}
			//_popup.css('height', o.height);

			Position.center(_popup);

			this.popuper = _popup;
		},
		show : function(options) {
			this.popuper.show();
			if (this.options.modal) {
				this.overlay.show();
			}
			this.popuper.show();
		},
		hide : function() {
			this.popuper.hide();
			if (this.options.modal) {
				this.overlay.hide();
			}
			//TODO 使用自定义事件方式实现
			if(this.options.hideHandler){
				this.options.hideHandler();
			}
		},
		destroy : function() {
			if(this.options.beforeClose){
				this.options.beforeClose();
			}
			this.popuper.remove();
			if (this.options.modal) {
				this.overlay.destroy();
			}
			this.$element.removeData('popup');
		},
		rePosition: function(){
			Position.center(this.popuper);
		}
	}

	/* Popup PLUGIN DEFINITION
	 * ======================= */
	$.fn.Popup = function(option) {
		return this.each(function() {
			var $this = $(this), data = $this.data('popup'), options = $.extend({}, $.fn.Popup.defaults, $this.data(), typeof option == 'object' && option)
			if (!data)
				$this.data('popup', ( data = new Popup(this, options)))
			if ( typeof option == 'string')
				data[option]()
			else if (options.show)
				data.init()
		})
	}

	$.fn.Popup.defaults = {
		show : true,
		modal : false,
		themeClass : 'mmpop-aero',
		position : null,
		posTarget : null,
		title : '',
		closeIcon: true,
		zIndex: 500,
		closeMode: 'destroy'
	}

	//$.fn.Popup.Constructor = Popup

	module.exports = Popup;

})
