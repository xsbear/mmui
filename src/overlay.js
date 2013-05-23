define(function(require, exports, module) {

    var $ = require('jquery');

    var isIE6 = !window.XMLHttpRequest

    /* Overlay CLASS DEFINITION
     * ====================== */
    var Overlay = function(options) {
        this.options = options;
    }

    Overlay.prototype = {
        overlayer : null,
        masklayer : null,
        show : function() {
            if (this.overlayer) {
                this.overlayer.show();
                if (this.masklayer) {
                    this.masklayer.show();
                }
            } else {
                this.overlayer = $('<div id="dm_window_overlay"></div>').appendTo('body');
                if (isIE6) {
                    this.masklayer = $('<iframe id="dm_window_selectmask" frameborder="0" />').appendTo('body');
                }
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