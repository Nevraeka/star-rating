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
	            this._shadow = this.createShadowRoot();
	            Object.defineProperty(this, "value", { value: 0, writable: true });
	        }
	    }, {
	        key: "attributeChangedCallback",
	        value: function attributeChangedCallback(name, oldVal, newVal) {
	            if (name === "size" || name === "maxvalue" || name === "hover" || name === "paths") {
	                this._update();
	            }
	        }
	    }, {
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            this._update();
	        }
	    }, {
	        key: "reset",
	        value: function reset() {
	            [].forEach.call(this._shadow.querySelectorAll('.star'), removedSelectedState, this);
	
	            function removedSelectedState(item, indx) {
	                item.classList.remove('star-selected');
	            }
	            this._setValue(0);
	            this.dispatchEvent(this._ratingUpdatedEvent());
	        }
	    }, {
	        key: "_update",
	        value: function _update() {
	            this._render();
	            this._bindEvents();
	        }
	    }, {
	        key: "_render",
	        value: function _render() {
	            var count = this._getMaxValue();
	            var _paths = this._getPaths();
	            console.log(_paths, _paths[0], _paths[1]);
	            this._shadow.innerHTML = StarRating._css(_paths[0], _paths[1], this._getSize());
	            while (count > 0) {
	                this._addStar();
	                count--;
	            }
	        }
	    }, {
	        key: "_ratingUpdatedEvent",
	        value: function _ratingUpdatedEvent() {
	            return new CustomEvent("ratingUpdated", {
	                detail: {
	                    value: this.value,
	                    maxValue: this._getMaxValue()
	                }
	            });
	        }
	    }, {
	        key: "_bindEvents",
	        value: function _bindEvents() {
	            [].forEach.call(this._shadow.querySelectorAll('.star'), iterateOverStars, this);
	
	            function iterateOverStars(item, indx) {
	                if (this.getAttribute('hover') === 'true') {
	                    updateEventHandlers(this, item, 'mouseover', starHandler);
	                }
	                updateEventHandlers(this, item, 'click', starHandler);
	
	                function starHandler(evt) {
	                    evt.preventDefault();
	                    this._setValue(indx + 1);
	                    this._toggleStates(evt.target, indx);
	                    this.dispatchEvent(this._ratingUpdatedEvent());
	                }
	            }
	
	            function updateEventHandlers(starRating, element, evt, handler) {
	                element.removeEventListener(evt, handler.bind(starRating));
	                element.addEventListener(evt, handler.bind(starRating));
	            }
	        }
	    }, {
	        key: "_addStar",
	        value: function _addStar() {
	            this._shadow.innerHTML += '<div class="star"></div>';
	        }
	    }, {
	        key: "_toggleStates",
	        value: function _toggleStates(star, index) {
	            [].forEach.call(this._shadow.querySelectorAll('.star'), toggleStates, this);
	
	            function toggleStates(item, indx) {
	                item.classList[indx <= index ? 'add' : 'remove']('star-selected');
	            }
	        }
	    }, {
	        key: "_getPaths",
	        value: function _getPaths() {
	            var _paths = this.getAttribute('paths');
	            return (0, _mixins2.default)(_paths) ? _paths.split(',') : ['data:image/svg+xml,%3Csvg%20fill%3D%22%23CCCCCC%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20width%3D%2218%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M9%2011.3l3.71%202.7-1.42-4.36L15%207h-4.55L9%202.5%207.55%207H3l3.71%202.64L5.29%2014z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h18v18H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E', 'data:image/svg+xml,%3Csvg%20fill%3D%22%23F1C40F%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20width%3D%2218%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M9%2011.3l3.71%202.7-1.42-4.36L15%207h-4.55L9%202.5%207.55%207H3l3.71%202.64L5.29%2014z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h18v18H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E'];
	        }
	    }, {
	        key: "_getMaxValue",
	        value: function _getMaxValue() {
	            var maxValue = parseInt(this.getAttribute('maxValue'), 10);
	            return (0, _mixins2.default)(maxValue) && !isNaN(maxValue) ? maxValue : 5;
	        }
	    }, {
	        key: "_getSize",
	        value: function _getSize() {
	            var sizeAttr = this.getAttribute('size');
	            return (0, _mixins2.default)(sizeAttr) ? sizeAttr : "36px";
	        }
	    }, {
	        key: "_setValue",
	        value: function _setValue(val) {
	            this.setAttribute("value", val);
	            this.value = val;
	            return this.value;
	        }
	    }], [{
	        key: "_css",
	        value: function _css(path, overPath, size) {
	            console.log(path, overPath, size);
	            return "<style>\n                    :host {\n                      display: flex;\n                      align-items: center;\n                      justify-content: center;\n                      width: 100%;\n                    }\n\n                    .star {\n                       width: " + size + ";\n                       height: " + size + ";\n                       background: rgba(255,255,255,0) url(" + path + ") no-repeat center center;\n                       background-size: cover;\n                    }\n\n                    .star-selected {\n                       background-image: url(" + overPath + ");\n                    }\n                </style>";
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