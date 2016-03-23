import exists from "./mixins";

export class StarRating extends HTMLElement {

    createdCallback(){
        Object.defineProperty(this, "value", { value: 0, writable: true });
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if(exists(oldVal)){
            if(name === "colors" || name === "size" || name === "maxvalue"){
                this.render();
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
                this.setAttribute("value", (indx + 1));
                this.dispatchRatingUpdated();
            };

            item.addEventListener('click', clickHandler.bind(this));

        }, this);
    }

    blueprint() {
        this.starTemplates = this.getColors().map(StarRating.mapTemplates.bind(this));
    }

    render(){
        var count = this.getMaxValue();
        this.innerHTML = "";
        while(count > 0){
            this.renderTemplate();
            count--;
        }
    }

    renderTemplate(){
        let tmpl = this.starTemplates[0];
        this.innerHTML+= tmpl;
    }

    getMaxValue(){
        let maxValue = parseInt(this.getAttribute('maxValue'), 10);
        return exists(maxValue) && !isNaN(maxValue) ? maxValue : 5;
    }

    getColors(){
        return exists(this.getAttribute("colors")) ? this.getAttribute("colors").split(/(\s*)(,{1})(\s*)/) : [ "#CCCCCC"  ,"#F1C40F" ];
    }

    getSize() {
        let sizeAttr = parseInt(this.getAttribute('size'), 10);
        return exists(sizeAttr) && !isNaN(sizeAttr) ? sizeAttr : 18;
    }

    static template(color, size) {
        return `<svg tabindex="0" fill="${color}" height="${size}" viewBox="0 0 ${size} ${size}" width="${size}" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11.3l3.71 2.7-1.42-4.36L15 7h-4.55L9 2.5 7.55 7H3l3.71 2.64L5.29 14z"/>
                    <path d="M0 0h18v18H0z" fill="none"/>
                </svg>`;
    }

    static mapTemplates(color){
        return StarRating.template(color, this.getSize());
    }

}

document.registerElement("star-rating", StarRating);