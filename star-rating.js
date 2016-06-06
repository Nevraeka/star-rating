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
	
	var _helpers = __webpack_require__(1);
	
	var _vars = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
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
	
	var StarRating = exports.StarRating = function (_HTMLElement) {
	    _inherits(StarRating, _HTMLElement);
	
	    function StarRating() {
	        _classCallCheck(this, StarRating);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(StarRating).apply(this, arguments));
	    }
	
	    _createClass(StarRating, [{
	        key: "createdCallback",
	        value: function createdCallback() {
	            this._attrs = /(size|maxvalue|src)/i;
	            Object.defineProperty(this, "value", { value: 0, writable: true });
	        }
	    }, {
	        key: "attributeChangedCallback",
	        value: function attributeChangedCallback(name, oldVal, newVal) {
	            if (this._attrs.test(name)) {
	                this._update();
	                if (newVal === parseInt(newVal, 10)) {
	                    this._toggleStates(newVal);
	                } else {
	                    this.reset();
	                }
	            }
	        }
	    }, {
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            this._root = this._hasShadow() ? this.createShadowRoot() : this;
	            this._update();
	        }
	    }, {
	        key: "reset",
	        value: function reset() {
	            this._setValue(0);
	            this._allAnd(removedSelectedState.bind(this));
	            this.dispatchEvent(this._ratingUpdatedEvent());
	
	            function removedSelectedState(item) {
	                item.classList.remove('selected');
	                this._setStateFor(item, this._src()[0], this._size());
	            }
	
	            return this;
	        }
	    }, {
	        key: "rateAs",
	        value: function rateAs(value) {
	            if (!(0, _helpers.exists)(value) || typeof value !== 'number') {
	                return this;
	            }
	            var max = this._maxValue();
	            this._toggleStates((value < 1 ? 0 : value > max ? max : value) - 1);
	            return this;
	        }
	    }, {
	        key: "_keyboard",
	        value: function _keyboard(evt) {
	            var rating = this;
	            var value = rating.value;
	            var code = evt.which || evt.keyCode;
	
	            if (code == 37 || code == 39) {
	                if (code == 37) {
	                    rating.rateAs(value - 1);
	                }
	                if (code == 39) {
	                    rating.rateAs(value + 1);
	                }
	            }
	        }
	    }, {
	        key: "_setStateFor",
	        value: function _setStateFor(item, starImg, size) {
	            item.style.backgroundImage = "url(" + starImg + ")";
	            item.style.width = size;
	            item.style.height = size;
	            return item;
	        }
	    }, {
	        key: "_update",
	        value: function _update() {
	            this._render();
	            this._applyEvents();
	        }
	
	        // TODO: Update this & relate style attr adjustments to use Shadow DOM &
	        // CSS Properties (doing this hack now to get browser support)
	
	    }, {
	        key: "_renderStars",
	        value: function _renderStars() {
	            var starArr = [];
	            var maxValue = this._maxValue();
	
	            while (maxValue > 0) {
	                starArr.push(maxValue);
	                maxValue--;
	            }
	            return starArr.map(_helpers.starTemplate).join('');
	        }
	    }, {
	        key: "_render",
	        value: function _render() {
	            this._root.innerHTML = (0, _helpers.elementTemplate)(this._size(), this._src()) + this._renderStars();
	        }
	    }, {
	        key: "_ratingUpdatedEvent",
	        value: function _ratingUpdatedEvent() {
	            return new CustomEvent("ratingUpdated", {
	                detail: {
	                    value: this.value,
	                    maxValue: this._maxValue()
	                }
	            });
	        }
	    }, {
	        key: "_selected",
	        value: function _selected() {
	            return this._root.querySelectorAll('.selected');
	        }
	    }, {
	        key: "_allAnd",
	        value: function _allAnd(iterateFn) {
	            return [].forEach.call(this._root.querySelectorAll('.star'), iterateFn, this);
	        }
	    }, {
	        key: "_indexPlusOneEqualsCurrentValue",
	        value: function _indexPlusOneEqualsCurrentValue(target, indx) {
	            return this._selected().length === indx + 1 && target.classList.contains('selected');
	        }
	    }, {
	        key: "_applyDOMEvents",
	        value: function _applyDOMEvents(item, indx) {
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
	    }, {
	        key: "_applyEvents",
	        value: function _applyEvents() {
	            this.removeEventListener('keyup', this._keyboard);
	            this.addEventListener('keyup', this._keyboard);
	            this._allAnd(this._applyDOMEvents);
	        }
	    }, {
	        key: "_updateStar",
	        value: function _updateStar(item, index) {
	            return this._hasShadow() ? this._toggleStates(index) : item.setAttribute('style', StarRating._style(this._size(), this._src()[0]).star() + ";");
	        }
	    }, {
	        key: "_toggleStates",
	        value: function _toggleStates(index) {
	            var _srcs = this._src();
	            var size = this._size();
	
	            this._allAnd(toggleStates);
	            this.dispatchEvent(this._ratingUpdatedEvent());
	
	            function toggleStates(item, indx) {
	                var isInRange = indx <= index;
	                if (indx == index) {
	                    this._setValue(indx + 1);
	                }
	                item.classList[isInRange ? 'add' : 'remove']('selected');
	                this._setStateFor(item, isInRange ? _srcs[1] : _srcs[0], size);
	            }
	        }
	    }, {
	        key: "_src",
	        value: function _src() {
	            var _src = this.getAttribute('src');
	            return (0, _helpers.exists)(_src) ? _src.split(/(\ *),{1}(\ *)/).filter(filterSrc) : StarRating._sources();
	
	            function filterSrc(item) {
	                if (!/^(data).*(base64)$/.test(item) && item.trim() !== '') {
	                    return item;
	                }
	            }
	        }
	    }, {
	        key: "_maxValue",
	        value: function _maxValue(val) {
	            var maxValue = parseInt(val ? val : this.getAttribute('maxvalue'), 10);
	            return (0, _helpers.exists)(maxValue) && !isNaN(maxValue) ? maxValue : _vars.MAX_VALUE;
	        }
	    }, {
	        key: "_size",
	        value: function _size() {
	            var sizeAttr = this.getAttribute('size');
	            return (0, _helpers.exists)(sizeAttr) ? sizeAttr : _vars.SIZE;
	        }
	    }, {
	        key: "_setValue",
	        value: function _setValue(val) {
	            return this.value = val;
	        }
	    }, {
	        key: "_hasShadow",
	        value: function _hasShadow() {
	            return "createShadowRoot" in this;
	        }
	    }], [{
	        key: "_sources",
	        value: function _sources() {
	            return [_vars.BASE_IMG_BKG, _vars.SELECTED_IMG_BKG];
	        }
	    }, {
	        key: "_style",
	        value: function _style(size, starImg) {
	
	            return {
	                element: function element() {
	                    return _vars.ELEMENT_STYLE;
	                }
	            };
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
	exports.default = helpers;
	exports.exists = exists;
	exports.starTemplate = starTemplate;
	exports.elementTemplate = elementTemplate;
	function helpers() {
	  return {
	    exists: exists,
	    starTemplate: starTemplate,
	    elementTemplate: elementTemplate
	  };
	}
	
	function exists(testItem) {
	  return typeof testItem !== "undefined" && testItem !== null;
	}
	
	function starTemplate() {
	  return '<div tabindex="0" class="star"></div>';
	}
	
	function elementTemplate(size, starImgs) {
	  return "<style>\n           :host {\n             display: flex;\n             -webkit-align-items: center;\n             -ms-align-items: center;\n             -moz-align-items: center;\n             align-items: center;\n             -webkit-justify-content: center;\n             -ms-justify-content: center;\n             -moz-justify-content: center;\n             justify-content: center;\n             width: 100%;\n             outline-width: 1px;\n           }\n\n           .star {\n             display: inline-block;\n              height: " + size + ";\n              width: " + size + ";\n              outline: 0;\n              cursor: pointer;\n              background: rgba(255,255,255,0) url(" + starImgs[0] + ") no-repeat center center;\n              background-size: cover;\n           }\n\n           .star.selected {\n             background-image: url(" + starImgs[1] + ");\n           }\n\n        </style>";
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Vars;
	function Vars() {
	
	  return {
	    size: SIZE,
	    maxValue: MAX_VALUE,
	    icon: {
	      base: BASE_IMG_BKG,
	      selected: SELECTED_IMG_BKG
	    },
	    styles: {
	      element: ELEMENT_STYLE
	    },
	    templates: {
	      css: elementTemplate,
	      html: starTemplate
	    }
	
	  };
	}
	
	var SIZE = exports.SIZE = "36px";
	var MAX_VALUE = exports.MAX_VALUE = 5;
	var BASE_IMG_BKG = exports.BASE_IMG_BKG = 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjQ0NDQ0NDIiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHdpZHRoPSIxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik05IDExLjNsMy43MSAyLjctMS40Mi00LjM2TDE1IDdoLTQuNTVMOSAyLjUgNy41NSA3SDNsMy43MSAyLjY0TDUuMjkgMTR6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDE4djE4SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==';
	var SELECTED_IMG_BKG = exports.SELECTED_IMG_BKG = 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRjFDNDBGIiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHdpZHRoPSIxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik05IDExLjNsMy43MSAyLjctMS40Mi00LjM2TDE1IDdoLTQuNTVMOSAyLjUgNy41NSA3SDNsMy43MSAyLjY0TDUuMjkgMTR6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDE4djE4SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==';
	var ELEMENT_STYLE = exports.ELEMENT_STYLE = 'display: flex;\n                                 display: -webkit-flex;\n                                 -webkit-align-items: center;\n                                 -ms-align-items: center;\n                                 -moz-align-items: center;\n                                 align-items: center;\n                                 -webkit-justify-content: center;\n                                 -ms-justify-content: center;\n                                 -moz-justify-content: center;\n                                 justify-content: center;\n                                 width: 100%;';

/***/ }
/******/ ]);
//# sourceMappingURL=star-rating.js.map