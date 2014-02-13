define(function(require, exports, module) {

    var $ = require('jquery');
    var Position = {};

    Position.pin = function(pinElem, baseObject) {
        var baseElem = baseObject.elem;
        var basePos = baseElem.offset();
        var posTop, posLeft;

        var pinPos = baseObject.pos;

        if(pinPos.indexOf('top') > -1){
            posTop = basePos.top - pinElem.outerHeight();
        }
        if(pinPos.indexOf('bottom') > -1){
            posTop = basePos.top + baseElem.outerHeight();
        }
        if(pinPos === 'bottom' || pinPos === 'top'){
            posLeft = basePos.left;
        }
        if(pinPos.indexOf('right') > -1){
            posLeft = basePos.left + baseElem.outerWidth();
        }
        if(pinPos.indexOf('left') > -1){
            posLeft = basePos.left - pinElem.outerWidth();
        }
        if(pinPos === 'right' || pinPos === 'left'){
            posTop = basePos.top;
        }

        if(posTop < 0){
            posTop = basePos.top + baseElem.outerHeight();
        }
        if(posTop + pinElem.outerHeight() > $(document).height()){
            posTop = basePos.top - pinElem.outerHeight()
        }
        if(posLeft < 0){
            posLeft = basePos.left + baseElem.outerWidth();
        }
        if(posLeft + pinElem.outerWidth() > $(document).width()){
            posLeft = basePos.left - pinElem.outerWidth();
        }

        if(baseObject.offset){
            var offset = baseObject.offset.split(' ');
            if(offset[0].indexOf('%') > -1){
                posTop -= parseInt(offset[0].slice(0, -1), 10) / 100 * pinElem.outerHeight() - baseElem.outerHeight() / 2
            } else {
                posTop += parseInt(offset[0], 10);
            }
            posTop = posTop < 0 ? 0: posTop;
            if(offset.length > 1){
                if(offset[1].indexOf('%') > -1){
                    posLeft -= parseInt(offset[1].slice(0, -1), 10) / 100 * pinElem.outerWidth() - baseElem.outerWidth() / 2
                } else {
                    posLeft += parseInt(offset[1], 10);
                }
                posLeft = posLeft < 0 ? 0: posLeft;
            }
        }

        pinElem.css({
            'top' : posTop,
            'left' : posLeft
        });
    };

    Position.center = function(pinElem, baseElem) {
        baseElem = baseElem || $(window);
        var posLeft = parseInt((baseElem.width() - pinElem.outerWidth()) / 2, 10);
        var posTop = baseElem.height() - pinElem.outerHeight() - 40; //向上偏移 20px
        posTop = (posTop < 0 ? 0 : parseInt(posTop / 2, 10)) + $(document).scrollTop();

        pinElem.css({
            'top' : posTop,
            'left' : posLeft
        });
    };

    return Position;
})