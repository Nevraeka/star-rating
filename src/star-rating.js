import {exists, elementTemplate, starTemplate} from "./helpers";
import {SIZE, ELEMENT_STYLE, STAR_STYLE, SELECTED_IMG_BKG, BASE_IMG_BKG, MAX_VALUE} from "./vars";

/*

 A vanilla web component that provides a number based rating value

 ##### Examples
 <star-rating></star-rating>
 <star-rating maxvalue="10"></star-rating>
 <star-rating size="2em"></star-rating>
 <star-rating src="/path/to/default-image-state, /path/to/selected-image-state"></star-rating>
 @demo
 @element star-rating
 @author Erik Isaksen

 */
export class StarRating extends HTMLElement {

    createdCallback() {
        this._attrs = /(size|maxvalue|src)/i;
        Object.defineProperty(this, "value", { value: 0, writable: true});
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (this._attrs.test(name)) {
            this._update();
            this._toggleStates(newVal || 0);
        }
        if(name == 'value'){
            this.value = newVal;
        }
    }

    attachedCallback() {
        this._root = this._hasShadow() ? this.createShadowRoot() : this;
        this._update();
    }

    reset() {
        if (this.value !== 0) {
            this._setValue(0);
            this._allAnd(removedSelectedState);
            this.dispatchEvent(this._ratingUpdatedEvent());
        }

        function removedSelectedState(item) {
            item.classList.remove('selected');
            this._setStateFor(item, this._src()[0], this._size());
        }

        return this;
    }

    rateAs(value) {
        if(!exists(value) || typeof value !== 'number'){ return this; }
        const max = this._maxValue();
        this._toggleStates((value < 1 ? 0 : value > max ? max : value) -1);
        return this;
    }

    _keyboard(evt){
          const val = this.value;
          if(this === document.activeElement){
            let code = (evt.which || evt.keyCode);
            if(code == 37 || code == 39){
                if(code === 37){
                    this.rateAs(val - 1);
                }
                if(code === 39){
                    this.rateAs(val + 1);
                }
            }
        }

    }

    _setStateFor(item, starImg, size) {
        if (!this._hasShadow()) {
            item.style.backgroundImage = `url(${starImg})`;
            item.style.width = size;
            item.style.height = size;
        }
        return item;
    }

    _update() {
        this._render();
        this._applyEvents();
    }

    // TODO: Update this & relate style attr adjustments to use Shadow DOM &
    // CSS Properties (doing this hack now to get browser support)

    _renderStars() {
        let starArr = [];
        let maxValue = this._maxValue();

        while (maxValue > 0) {
            starArr.push(maxValue);
            maxValue--;
        }
        return starArr.map(starTemplate).join('');
    }

    _render() {
        if (this._hasShadow()) {
            this._root.innerHTML = elementTemplate(this._size(), this._src()) + this._renderStars();
        } else {
            this.setAttribute('style', StarRating._style(this._size(), this._src()).element());
            this._root.innerHTML = this._renderStars();
        }
    }

    _ratingUpdatedEvent() {
        return new CustomEvent("ratingUpdated", {
            detail: {
                value: this.value,
                maxValue: this._maxValue()
            }
        });
    }

    _selected(){
       return this._root.querySelectorAll('.selected');
    }

    _allAnd(iterateFn) {
        return [].forEach.call(this._root.querySelectorAll('.star'), iterateFn, this);
    }

    _indexPlusOneEqualsCurrentValue(target, indx){
        return this._selected().length === indx + 1
                   && target.classList.contains('selected');
    }

    _applyDOMEvents(item, indx) {
          item.removeEventListener('click', starHandler.bind(this));
          item.addEventListener('click', starHandler.bind(this));

          function starHandler(evt) {
              evt.preventDefault();
              if (this._indexPlusOneEqualsCurrentValue(evt.target, indx)) {
                  this.reset();
              } else {
                  this._toggleStates(indx);
              }
          }
    }

    _applyEvents() {
        this.removeEventListener('keyup', this._keyboard.bind(this));
        this.addEventListener('keyup', this._keyboard.bind(this));
        this._allAnd(this._applyDOMEvents);
    }

    _updateStar(item, index) {
        return this._hasShadow() ? this._toggleStates(index) : item.setAttribute('style', `${StarRating._style(this._size(), this._src()[0]).star()};`);
    }

    _toggleStates(index) {
        let _srcs = this._src();
        let size = this._size();

        this._allAnd(toggleStates);
        this.dispatchEvent(this._ratingUpdatedEvent());

        function toggleStates(item, indx) {
            let isInRange = indx <= index;
            item.classList[isInRange ? 'add' : 'remove']('selected');
            this._setValue(index + 1);
            this._setStateFor(item, (isInRange ? _srcs[0] : _srcs[1]), size);
        }
    }

    _src() {
        let _src = this.getAttribute('src');
        return exists(_src) ? _src.split(/(\ *),{1}(\ *)/).filter(filterSrc) : StarRating._sources();

        function filterSrc(item) {
            if (!(/^(data).*(base64)$/.test(item)) && item.trim() !== '') {
                return item;
            }
        }
    }

    _maxValue(val) {
        let maxValue = parseInt(val ? val : this.getAttribute('maxvalue'), 10);
        return exists(maxValue) && !isNaN(maxValue) ? maxValue : MAX_VALUE;
    }

    _size() {
        let sizeAttr = this.getAttribute('size');
        return exists(sizeAttr) ? sizeAttr : SIZE;
    }

    _setValue(val) {
        this.setAttribute("value", val);
        return this.value = val;
    }

    _hasShadow() {
        return "createShadowRoot" in this;
    }

    static _sources() {
        return [BASE_IMG_BKG, SELECTED_IMG_BKG];
    }

    static _style(size, starImg) {

        return {
            element: function () {
                return ELEMENT_STYLE;
            },

            star: function (starImg, size) {
                return STAR_STYLE + `height: ${size};width: ${size};background-image: url(${starImg});`;
            }

        }

    }

}


document.registerElement("star-rating", StarRating);
