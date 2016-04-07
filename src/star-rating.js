import { exists, elementTemplate, starTemplate} from "./helpers";
import { SIZE, ELEMENT_STYLE, STAR_STYLE, SELECTED_IMG_BKG, BASE_IMG_BKG, MAX_VALUE } from "./vars";

export class StarRating extends HTMLElement {

    createdCallback(){
        this._attrs = /(size|maxvalue|src)/i;
        Object.defineProperty(this, "value", { value: 0, writable: true });
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if(this._attrs.test(name)){
            this._update();
            this._toggleStates(newVal ||  0);
        }
    }

    attachedCallback() {
        this._root = this._hasShadow() ? this.createShadowRoot() : this;
        this._update();
    }

    reset(){
        if(this.value !== 0) {
            this._setValue(0);
            this._querySelectorAllStars(removedSelectedState);
            this.dispatchEvent(this._ratingUpdatedEvent());
        }

        function removedSelectedState(item){
            item.classList.remove('selected');
            this._setStateFor(item, this._src()[0], this._size());
        }

        return this;
    }

    rate(value){
        this._setValue(value);
        this._toggleStates(value);
        return this;
    }

    _setStateFor(item, starImg, size){
      if(!this._hasShadow()){
        item.style.backgroundImage = `url(${starImg})`;
        item.style.width = size;
        item.style.height = size;
      }
      return item;
    }

    _update(){
        this._render();
        this._bindEvents();
    }

        // TODO: Update this & relate style attr adjustments to use Shadow DOM &
        // CSS Properties (doing this hack now to get browser support)

    _renderStars(){
      let starArr = [];
      let maxValue = this._maxValue();
      while(maxValue > 0){
        starArr.push(maxValue);
        maxValue--;
      }
      return starArr.map(starTemplate).join('');
    }

    _render(){
        if(this._hasShadow()) {
          // console.log(CSSTemplate(this._size(), this._src()) + this._renderStars());
          this._root.innerHTML = elementTemplate(this._size(), this._src()) + this._renderStars();
        } else{
          this.setAttribute('style', StarRating._style(this._size(), this._src()).element());
          this._root.innerHTML = this._renderStars();
        }
    }

    _ratingUpdatedEvent(){
        return new CustomEvent("ratingUpdated", {
            detail: {
                value: this.value,
                maxValue: this._maxValue()
            }
        });
    }

    _querySelectorAllStars(iterateFn){
        let stars = this._root.querySelectorAll('.star');
        [].forEach.call(stars, iterateFn, this);
        return stars;
    }

    _bindEvents(){
        this._querySelectorAllStars(bindClicks);

        function bindClicks(item, indx){
            updateEventHandlers(this, item, 'click', starHandler);

            function starHandler(evt){
                evt.preventDefault();
                let selectedStars = this._root.querySelectorAll('.selected');

                if(selectedStars.length === indx + 1 && evt.target.classList.contains('selected')){
                    this.reset();
                } else {
                    this._toggleStates(indx);
                }
            }
        }

        function updateEventHandlers(starRating, element, evt, handler){
            element.removeEventListener(evt, handler.bind(starRating));
            element.addEventListener(evt, handler.bind(starRating));
        }

    }

    _updateStar(item, index){
        return this._hasShadow() ? this._toggleStates(index) : item.setAttribute('style', `${StarRating._style(this._size(), this._src()[0]).star()};`);
    }

    _toggleStates(index){
        let _srcs = this._src();
        let stars = this._querySelectorAllStars(toggleStates);
        let size = this._size();
        this.dispatchEvent(this._ratingUpdatedEvent());

        function toggleStates(item, indx){
            let isInRange = indx <= index;
            item.classList[isInRange ? 'add' : 'remove']('selected');
            this._setValue(index + 1);
            this._setStateFor(item, (isInRange ? _srcs[0] : _srcs[1]), size);
        }
    }

    _src(){
        let _src = this.getAttribute('src');
        return exists(_src) ? _src.split(/(\ *),{1}(\ *)/).filter(filterSrc) : StarRating._sources();

        function filterSrc(item){
          if(!(/^(data).*(base64)$/.test(item)) && item.trim() !== ''){
            return item;
          }
        }
    }

    _maxValue(){
        let maxValue = parseInt(this.getAttribute('maxValue'), 10);
        return exists(maxValue) && !isNaN(maxValue) ? maxValue : MAX_VALUE;
    }

    _size() {
        let sizeAttr = this.getAttribute('size');
        return exists(sizeAttr) ? sizeAttr : SIZE;
    }

    _setValue(val){
        this.setAttribute("value", val);
        return this.value = val;
    }

    _hasShadow(){
        return "createShadowRoot" in this;
    }

    static _sources(){
      return [ BASE_IMG_BKG , SELECTED_IMG_BKG ];
    }

    static _style(size, starImg){

        return {
            element: function(){
                return ELEMENT_STYLE;
            },

            star: function(starImg, size){
                return  STAR_STYLE + `height: ${size};width: ${size};background-image: url(${starImg});`;
            }

        }

    }

}



document.registerElement("star-rating", StarRating);
