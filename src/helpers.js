export default function helpers(){
  return {
    exists:          exists,
    starTemplate:    starTemplate,
    elementTemplate: elementTemplate
  };
}

export function exists(testItem) {
    return typeof testItem !== "undefined" && testItem !== null;
}

export function starTemplate(){
  return '<div tabindex="0" class="star"></div>';
}

export function elementTemplate(size, starImgs){

  return `<style>
           :host {
             display: flex;
             -webkit-align-items: center;
             -ms-align-items: center;
             -moz-align-items: center;
             align-items: center;
             -webkit-justify-content: center;
             -ms-justify-content: center;
             -moz-justify-content: center;
             justify-content: center;
             width: 100%;
             outline-width: 1px;
           }

           .star {
              height: ${size};
              width: ${size};
              outline: 0;
              cursor: pointer;
              background: rgba(255,255,255,0) url(${starImgs[0]}) no-repeat center center;
              background-size: cover;
           }

           .star.selected {
             background-image: url(${starImgs[1]});
           }

        </style>`;
}
