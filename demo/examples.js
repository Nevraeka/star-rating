var FocusExample = (function(document, window){
    "use strict";

    return {
        init: init
    };

    function init(){
        document.getElementById('focus-trigger').addEventListener('click', setFocus);
        document.getElementById('focus-reset').addEventListener('click', reset);
    }

    function reset(evt){
        evt.preventDefault();
        document.querySelector('#focus-example').reset();
    }

    function setFocus(evt){
        evt.preventDefault();
        document.getElementById('focus-example').focus();
    }

}(document, window));

var CustomImageExample = (function(document, window){
    "use strict";

    var NEW_IMG_SOURCES =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/US-O7_insignia.svg/2000px-US-O7_insignia.svg.png, http://www.elm.org/wp-content/uploads/2014/05/gold-star.jpg';

    return {
        init: init
    };


    function init(){
        document.getElementById('custom-event-trigger').addEventListener('click', changeImages);
        document.getElementById('custom-event-reset').addEventListener('click', reset);
    }

    function changeImages(evt){
        evt.preventDefault();
        document.querySelector('#custom-event').setAttribute('src', NEW_IMG_SOURCES);
    }

    function reset(evt){
        evt.preventDefault();
        var stars = document.querySelector('#custom-event');
        stars.removeAttribute('src');
        stars.reset();
    }

}(document, window));

var MaxvalueExample = (function(window,document){
    "use strict";

    return {
        init: init
    };

    function init(){
        document.querySelector('#maxvalue-trigger').addEventListener('click', maxvalueUpdate);
        document.querySelector('#maxvalue-reset').addEventListener('click', reset);

    }

    function maxvalueUpdate(evt){
        evt.preventDefault();
        document.getElementById('maxvalue-example').setAttribute('maxvalue', 10);
    }

    function reset(evt){
        evt.preventDefault();
        var stars = document.querySelector('#maxvalue-example');
        stars.removeAttribute('maxvalue');
        stars.reset();
    }

}(window, document));

var SizeExample = (function(window,document){
    "use strict";

    return {
        init: init
    };

    function init(){
        document.querySelector('#size-trigger').addEventListener('click', sizeUpdate);
        document.querySelector('#size-reset').addEventListener('click', reset);
    }

    function sizeUpdate(evt){
        evt.preventDefault();
        document.getElementById('size-example').setAttribute('size', '48px');
    }

    function reset(evt){
        evt.preventDefault();
        var stars = document.querySelector('#size-example');
        stars.removeAttribute('size');
        stars.reset();
    }

}(window, document));

var RatingUpdatedEventExample = (function(window,document){
    "use strict";

    return {
        init: init
    };

    function init(){
        document.querySelector('#event-trigger').addEventListener('click', update);
        document.querySelector('#event-reset').addEventListener('click', reset);
        document.querySelector('#event-example').addEventListener('ratingUpdated', ratingUpdated);
    }

    function ratingUpdated(evt){
        evt.preventDefault();
        document.getElementById('event-detail-value').innerHTML = evt.detail.value;
        document.getElementById('event-detail-maxvalue').innerHTML = evt.detail.maxValue;
    }

    function update(evt){
        evt.preventDefault();
        var val = document.getElementById('event-input').value;
        var maxVal = val.replace(/\s+/, '') != "" ? val : 5;
        document.querySelector('#event-example').setAttribute('maxvalue', maxVal);
    }

    function reset(evt){
        evt.preventDefault();
        var stars = document.querySelector('#event-example');
        stars.removeAttribute('maxvalue');
        stars.reset();
    }

}(window, document));

RatingUpdatedEventExample.init();
SizeExample.init();
MaxvalueExample.init();
CustomImageExample.init();
FocusExample.init();
