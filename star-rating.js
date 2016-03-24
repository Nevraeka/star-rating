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
	                    this.blueprint();
	                    this.render();
	                    this.bindEvents();
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
	                    this.updateStar(evt.target, indx);
	                    this.dispatchRatingUpdated();
	                };
	                item.removeEventListener('click', clickHandler.bind(this));
	                item.addEventListener('click', clickHandler.bind(this));
	            }, this);
	        }
	    }, {
	        key: "updateStar",
	        value: function updateStar(star, index) {
	            [].forEach.call(this.querySelectorAll('.star'), function (item, indx) {
	                if (indx <= index) {
	                    item.classList.add('star-selected');
	                } else {
	                    item.classList.remove('star-selected');
	                }
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
	            this.innerHTML = StarRating.css(this.getPaths(), this.getSize());
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
	        key: "getPaths",
	        value: function getPaths() {
	            return (0, _mixins2.default)(this.getAttribute('paths')) ? this.getAttribute('paths').split(/(\s*)(,{1})(\s*)/) : ['star.svg', 'star-selected.svg'];
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
	            var sizeAttr = this.getAttribute('size');
	            return (0, _mixins2.default)(sizeAttr) ? sizeAttr : "36px";
	        }
	    }], [{
	        key: "template",
	        value: function template(color, size, maxvalue) {
	            return "<div class=\"star\"></div>";
	        }
	    }, {
	        key: "mapTemplates",
	        value: function mapTemplates(color) {
	            return StarRating.template(color, this.getSize());
	        }
	    }, {
	        key: "css",
	        value: function css(path, size) {
	            return "<style>\n                    :host,\n                    star-rating {\n                      display: flex;\n                      align-items: center;\n                      justify-content: center;\n                      width: 100%;\n                    }\n                    .star {\n                       width: " + size + ";\n                       height: " + size + ";\n                       background: rgba(255,255,255,0) url(" + path[0] + ") no-repeat center center;\n                       background-size: cover;\n                    }\n\n                    .star-selected {\n                       background-image: url(" + path[1] + ");\n                    }\n                </style>";
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