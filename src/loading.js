define(function(require, exports, module) {

    var $ = require('jquery');
    var Position = require('./position');
    var Overlay = require('./overlay');

    /* Loading CLASS DEFINITION
     * ====================== */
    var Loading = function(text,options) {
        this.text = text;
        var defaults = {
            zIndex: 1000,
            opacity: 0.4,
            indicator: null,
        }
        this.options = $.extend(defaults, options);
        this.init();
    };

    Loading.prototype = {
        constructor : Loading,
        overlay : null,
        indicator : null,

        init: function(){
            this.overlay = new Overlay({zIndex:  this.options.zIndex, opacity: this.options.opacity});
            this.indicator = this.options.indicator || '<div class="mm-loading"><p>'+ this.text +'</p></div>';
            this.indicator = $(this.indicator).appendTo('body').css('z-index', this.options.zIndex + 1);
            if(this.options.indicator === null){
                Position.center(this.indicator);
            }
        },

        hide: function(){
            this.overlay.destroy();
            this.indicator.remove();
        }
    };

    module.exports = Loading;

});