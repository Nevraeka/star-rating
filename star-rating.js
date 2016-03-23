/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.StarRating = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mixins = __webpack_require__(1);
	
	var _mixins2 = _interopRequireDefault(_mixins);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var StarRating = exports.StarRating = function (_HTMLElement) {
	    _inherits(StarRating, _HTMLElement);
	
	    function StarRating() {
	        _classCallCheck(this, StarRating);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(StarRating).apply(this, arguments));
	    }
	
	    _createClass(StarRating, [{
	        key: "createdCallback",
	        value: function createdCallback() {
	            Object.defineProperty(this, "value", { value: 0, writable: true });
	        }
	    }, {
	        key: "attributeChangedCallback",
	        value: function attributeChangedCallback(name, oldVal, newVal) {
	            if ((0, _mixins2.default)(oldVal)) {
	                if (name === "colors" || name === "size" || name === "maxvalue") {
	                    this.render();
	                }
	            }
	        }
	    }, {
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            this.blueprint();
	            this.render();
	            this.bindEvents();
	        }
	    }, {
	        key: "dispatchRatingUpdated",
	        value: function dispatchRatingUpdated() {
	            var ratingUpated = new CustomEvent("ratingUpdated", {
	                detail: {
	                    value: this.value,
	                    maxValue: this.getMaxValue()
	                }
	            });
	
	            this.dispatchEvent(ratingUpated);
	        }
	    }, {
	        key: "bindEvents",
	        value: function bindEvents() {
	            [].forEach.call(this.querySelectorAll('.star'), function (item, indx) {
	                var clickHandler = function clickHandler(evt) {
	                    evt.preventDefault();
	                    this.setValue(indx + 1);
	                    this.updateStarColor(evt.target, indx);
	                    this.dispatchRatingUpdated();
	                };
	
	                item.addEventListener('click', clickHandler.bind(this));
	            }, this);
	        }
	    }, {
	        key: "updateStarColor",
	        value: function updateStarColor(star, index) {
	            var colors = this.getColors();
	            var normalColor = colors[0];
	            var selectedColor = colors[1];
	            [].forEach.call(this.querySelectorAll('.star'), function (item, indx) {
	                var color = indx <= index ? selectedColor : normalColor;
	                item.setAttribute('fill', color);
	            }, this);
	        }
	    }, {
	        key: "setValue",
	        value: function setValue(val) {
	            this.setAttribute("value", val);
	            this.value = val;
	            return this.value;
	        }
	    }, {
	        key: "blueprint",
	        value: function blueprint() {
	            this.starTemplates = this.getColors().map(StarRating.mapTemplates.bind(this));
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var count = this.getMaxValue();
	            this.innerHTML = "";
	            while (count > 0) {
	                this.renderTemplate();
	                count--;
	            }
	        }
	    }, {
	        key: "renderTemplate",
	        value: function renderTemplate() {
	            var tmpl = this.starTemplates[0];
	            this.innerHTML += tmpl;
	        }
	    }, {
	        key: "getMaxValue",
	        value: function getMaxValue() {
	            var maxValue = parseInt(this.getAttribute('maxValue'), 10);
	            return (0, _mixins2.default)(maxValue) && !isNaN(maxValue) ? maxValue : 5;
	        }
	    }, {
	        key: "getColors",
	        value: function getColors() {
	            return (0, _mixins2.default)(this.getAttribute("colors")) ? this.getAttribute("colors").split(/(\s*)(,{1})(\s*)/) : ["#CCCCCC", "#F1C40F"];
	        }
	    }, {
	        key: "getSize",
	        value: function getSize() {
	            var sizeAttr = parseInt(this.getAttribute('size'), 10);
	            return (0, _mixins2.default)(sizeAttr) && !isNaN(sizeAttr) ? sizeAttr : 18;
	        }
	    }], [{
	        key: "template",
	        value: function template(color, size) {
	            return "<svg tabindex=\"0\" style=\"outline: 0;cursor: pointer;\" class=\"star\" fill=\"" + color + "\" height=\"" + size + "\" viewBox=\"0 0 " + size + " " + size + "\" width=\"" + size + "\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M9 11.3l3.71 2.7-1.42-4.36L15 7h-4.55L9 2.5 7.55 7H3l3.71 2.64L5.29 14z\"/>\n                    <path d=\"M0 0h18v18H0z\" fill=\"none\"/>\n                </svg>";
	        }
	    }, {
	        key: "mapTemplates",
	        value: function mapTemplates(color) {
	            return StarRating.template(color, this.getSize());
	        }
	    }]);
	
	    return StarRating;
	}(HTMLElement);
	
	document.registerElement("star-rating", StarRating);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getCSS = getCSS;
	exports.default = exists;
	function getCSS(path) {
	    var link = document.createElement('link');
	    link.href = path;
	    link.rel = "stylesheet";
	    document.head.appendChild(link);
	}
	
	function exists(testItem) {
	    return typeof testItem !== "undefined" && testItem !== null;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=star-rating.js.map