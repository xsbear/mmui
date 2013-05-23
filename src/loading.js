define(function(require, exports, module) {

    var $ = require('jquery');
    var Position = require('./position');
    var Overlay = require('./overlay');

    /* Loading CLASS DEFINITION
     * ====================== */
    var Loading = function(text,options) {
        this.text = text;
        this.options = options;
        this.init();
    };

    Loading.prototype = {
        constructor : Loading,
        overlay : null,
        indicator : null,

        init: function(){
            this.overlay = new Overlay();
            this.overlay.show();
            this.indicator = $('<div class="mm-loading"><p>'+ this.text +'</p><img src="/static/images/loading-bars.gif"></div>').appendTo('body');
            Position.center(this.indicator);
        },

        hide: function(){
            this.overlay.destroy();
            this.indicator.remove();
        }
    };

    module.exports = Loading;

});