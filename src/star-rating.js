import exists from "./mixins";

export class StarRating extends HTMLElement {

    createdCallback(){
        Object.defineProperty(this, "value", { value: 0, writable: true });
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if(name === "size" || name === "maxvalue" || name === "hover"){
            this._update();
        }
    }

    attachedCallback() {
        this._update();
    }

    reset(){
        [].forEach.call(this.querySelectorAll('.star'), removedSelectedState, this);

        function removedSelectedState(item, indx){
            item.classList.remove('star-selected');
        }
        this._setValue(0);
        this.dispatchEvent(this._ratingUpdatedEvent());
    }

    _update(){
        this._render();
        this._bindEvents();
    }

    _render(){
        var count = this._getMaxValue();
        this.innerHTML = StarRating._css(this._getPaths(), this._getSize());
        while(count > 0){
            this._addStar();
            count--;
        }
    }

    _ratingUpdatedEvent(){
        return new CustomEvent("ratingUpdated", {
            detail: {
                value: this.value,
                maxValue: this._getMaxValue()
            }
        });
    }

    _bindEvents(){
        [].forEach.call(this.querySelectorAll('.star'), iterateOverStars, this);

        function iterateOverStars(item, indx){
            if(this.getAttribute('hover') === 'true') {
                updateEventHandlers(this, item, 'mouseover', starHandler);
            }
            updateEventHandlers(this, item, 'click', starHandler);

            function starHandler(evt){
                evt.preventDefault();
                this._setValue(indx + 1);
                this._toggleStates(evt.target, indx);
                this.dispatchEvent(this._ratingUpdatedEvent());
            }
        }

        function updateEventHandlers(starRating, element, evt, handler){
            element.removeEventListener(evt, handler.bind(starRating));
            element.addEventListener(evt, handler.bind(starRating));
        }

    }

    _addStar(){
        this.innerHTML += '<div class="star"></div>';
    }

    _toggleStates(star, index){
        [].forEach.call(this.querySelectorAll('.star'), toggleStates, this);

        function toggleStates(item, indx){
            item.classList[indx <= index ? 'add' : 'remove']('star-selected');
        }
    }

    _getPaths(){
        return exists(this.getAttribute('paths')) ? this.getAttribute('paths').split(/(\s*)(,{1})(\s*)/)  : [ 'star.svg', 'star-selected.svg' ];
    }

    _getMaxValue(){
        let maxValue = parseInt(this.getAttribute('maxValue'), 10);
        return exists(maxValue) && !isNaN(maxValue) ? maxValue : 5;
    }

    _getSize() {
        let sizeAttr = this.getAttribute('size');
        return exists(sizeAttr) ? sizeAttr : "36px";
    }

    _setValue(val){
        this.setAttribute("value", val);
        this.value = val;
        return this.value;
    }

    static _css(path, size){
        return `<style>
                    :host,
                    star-rating {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      width: 100%;
                    }
                    .star {
                       width: ${size};
                       height: ${size};
                       background: rgba(255,255,255,0) url(${path[0]}) no-repeat center center;
                       background-size: cover;
                    }

                    .star-selected {
                       background-image: url(${path[1]});
                    }
                </style>`;
    }
}

document.registerElement("star-rating", StarRating);