define(function(require, exports, module) {

    var $ = require('jquery');

    var isIE6 = !window.XMLHttpRequest

    /* Overlay CLASS DEFINITION
     * ====================== */
    var Overlay = function(options) {
        var defaults = {
            zIndex: 499,
            opacity: 0.4,
        }
        this.options = $.extend(defaults, options);
        this. init();
    }

    Overlay.prototype = {
        overlayer : null,
        masklayer : null,
        init: function() {
            this.overlayer = $('<div id="dm_window_overlay"></div>').appendTo('body').css({'z-index': this.options.zIndex, 'opacity': this.options.opacity});
            if (isIE6) {
                this.masklayer = $('<iframe id="dm_window_selectmask" frameborder="0" />').appendTo('body').css('z-index', this.options.zIndex - 1);
            }
        },
        show : function() {
            this.overlayer.show();
            if (this.masklayer) {
                this.masklayer.show();
            }
        },
        hide : function() {
            this.overlayer.hide();
            if (this.masklayer) {
                this.masklayer.hide();
            }
        },
        destroy : function() {
            this.overlayer.remove();
            if (this.masklayer) {
                this.masklayer.remove();
            }
        }
    };

    return Overlay;

})