import exists from "./mixins";

export class StarRating extends HTMLElement {

    createdCallback(){
        Object.defineProperty(this, "value", { value: 0, writable: true });
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if(exists(oldVal)){
            if(name === "colors" || name === "size" || name === "maxvalue"){
                this.blueprint();
                this.render();
                this.bindEvents();
            }
        }

    }

    attachedCallback() {
        this.blueprint();
        this.render();
        this.bindEvents();
    }

    dispatchRatingUpdated(){
        let ratingUpated = new CustomEvent("ratingUpdated", {
            detail: {
                value: this.value,
                maxValue: this.getMaxValue()
            }
        });

        this.dispatchEvent(ratingUpated);
    }

    bindEvents(){
        [].forEach.call(this.querySelectorAll('.star'), function(item, indx){
            let clickHandler = function(evt){
                evt.preventDefault();
                this.setValue(indx + 1);
                this.updateStar(evt.target, indx);
                this.dispatchRatingUpdated();
            };
            item.removeEventListener('click', clickHandler.bind(this));
            item.addEventListener('click', clickHandler.bind(this));

        }, this);
    }

    updateStar(star, index){
        [].forEach.call(this.querySelectorAll('.star'), function(item, indx){
            if (indx <= index) {
                item.classList.add('star-selected');
            } else {
                item.classList.remove('star-selected');
            }
        }, this);
    }

    setValue(val){
        this.setAttribute("value", val);
        this.value = val;
        return this.value;
    }

    blueprint() {
        this.starTemplates = this.getColors().map(StarRating.mapTemplates.bind(this));
    }

    render(){
        var count = this.getMaxValue();
        this.innerHTML = StarRating.css(this.getPaths(), this.getSize());
        while(count > 0){
            this.renderTemplate();
            count--;
        }
    }

    renderTemplate(){
        let tmpl = this.starTemplates[0];
        this.innerHTML+= tmpl;
    }

    getPaths(){
        return exists(this.getAttribute('paths')) ? this.getAttribute('paths').split(/(\s*)(,{1})(\s*)/)  : [ 'star.svg', 'star-selected.svg' ];
    }

    getMaxValue(){
        let maxValue = parseInt(this.getAttribute('maxValue'), 10);
        return exists(maxValue) && !isNaN(maxValue) ? maxValue : 5;
    }

    getColors(){
        return exists(this.getAttribute("colors")) ? this.getAttribute("colors").split(/(\s*)(,{1})(\s*)/) : [ "#CCCCCC"  ,"#F1C40F" ];
    }

    getSize() {
        let sizeAttr = this.getAttribute('size');
        return exists(sizeAttr) ? sizeAttr : "36px";
    }

    static template(color, size, maxvalue) {
        return `<div class="star"></div>`;
    }

    static mapTemplates(color){
        return StarRating.template(color, this.getSize());
    }

    static css(path, size){
        return   `<style>
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