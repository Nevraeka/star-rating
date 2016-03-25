import exists from "./mixins";

export class StarRating extends HTMLElement {

    createdCallback(){
        this._shadow = this.createShadowRoot();
        Object.defineProperty(this, "value", { value: 0, writable: true });
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if(name === "size" || name === "maxvalue" || name === "hover" || name === "img-paths"){
            this._update();
        }
    }

    attachedCallback() {
        this._update();
    }

    reset(){
        [].forEach.call(this._shadow.querySelectorAll('.star'), removedSelectedState, this);

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
        let _paths = this._getPaths();
        this._shadow.innerHTML = StarRating._css(_paths[0], _paths[1], this._getSize());
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
        [].forEach.call(this._shadow.querySelectorAll('.star'), iterateOverStars, this);

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
        this._shadow.innerHTML += '<div class="star"></div>';
    }

    _toggleStates(star, index){
        [].forEach.call(this._shadow.querySelectorAll('.star'), toggleStates, this);

        function toggleStates(item, indx){
            item.classList[indx <= index ? 'add' : 'remove']('star-selected');
        }
    }

    _getPaths(){
        let _paths = this.getAttribute('img-paths');
        return exists(_paths) ? _paths.split(',')  : [ 'data:image/svg+xml,%3Csvg%20fill%3D%22%23CCCCCC%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20width%3D%2218%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M9%2011.3l3.71%202.7-1.42-4.36L15%207h-4.55L9%202.5%207.55%207H3l3.71%202.64L5.29%2014z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h18v18H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E', 'data:image/svg+xml,%3Csvg%20fill%3D%22%23F1C40F%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20width%3D%2218%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M9%2011.3l3.71%202.7-1.42-4.36L15%207h-4.55L9%202.5%207.55%207H3l3.71%202.64L5.29%2014z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h18v18H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E' ];
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

    static _css(path, overPath, size){
        console.log(path, overPath, size);
        return `<style>
                    :host {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      width: 100%;
                    }

                    .star {
                       width: ${size};
                       height: ${size};
                       background: rgba(255,255,255,0) url(${path}) no-repeat center center;
                       background-size: cover;
                    }

                    .star-selected {
                       background-image: url(${overPath});
                    }
                </style>`;
    }
}

document.registerElement("star-rating", StarRating);