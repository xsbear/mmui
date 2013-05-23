define(function(require, exports, module) {

    var $ = require('jquery');
    var Position = {};

    Position.pin = function(pinObject, baseObject) {

        var baseElem  = baseObject === 'VIEWPORT' ? $(window) : $(baseObject);
        var pinElem = pinObject.element;

        var posLeft = parseInt((baseElem.width() - pinElem.outerWidth()) / 2,10);
        var posTop = baseElem.height() - pinElem.outerHeight() - 40; //向上偏移 20px
        posTop = (posTop < 0 ? 0 : parseInt(posTop / 2, 10)) + $(document).scrollTop();

        pinElem.css({
            'top' : posTop,
            'left' : posLeft
        });
        // var targetPos = o.posTarget.offset();
        // if (o.position == 'top') {
            // var posTop = targetPos.top - $(document).scrollTop() < o.height ? targetPos.top + o.posTarget.outerHeight() : targetPos.top - o.height;
            // var posLeft = targetPos.left;
        // }
    };

    Position.center = function(pinElem, baseElem) {
        baseElem = baseElem || 'VIEWPORT';
        Position.pin({
            element : pinElem,
            pos : 'center'
        }, baseElem);
    };

    return Position;
})