/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./react/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./react/React.js":
/*!************************!*\
  !*** ./react/React.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * React 对象
 * @func createElement 创建虚拟元素
 * @func render React 入口调用函数
 */
const React = {
  nextReactRootIndex: 0,

  /**
   * @param {*} type 元素的 component 类型
   * @param {*} config 元素配置
   * @param {*} children 元素的子元素
   */
  createElement: function (type, config, children) {},

  /**
   * 接收一个React元素，和一个dom节点
   * @param {*} element React元素
   * @param {*} container 负责装载的dom
   */
  render: function (element, container) {}
};

/* harmony default export */ __webpack_exports__["default"] = (React);

/***/ }),

/***/ "./react/ReactClass.js":
/*!*****************************!*\
  !*** ./react/ReactClass.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 复合元素
 */
function ReactClass() {}

/* harmony default export */ __webpack_exports__["default"] = (ReactClass);

/***/ }),

/***/ "./react/ReactCompositeComponent.js":
/*!******************************************!*\
  !*** ./react/ReactCompositeComponent.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * component 类
 * 复合组件类型
 * @param {*} element 元素
 */
function ReactCompositeComponent(element) {
  this._currentElement = element;
  this._rootNodeID = null;
  this._instance = null;
}

/* harmony default export */ __webpack_exports__["default"] = (ReactCompositeComponent);

/***/ }),

/***/ "./react/ReactDOMComponent.js":
/*!************************************!*\
  !*** ./react/ReactDOMComponent.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * componet 类
 * react 基础标签类型，类似与html中的（'div','span' 等）
 * @param {*} element 基础元素
 */
function ReactDOMComponent(element) {
  this._currentElement = element;
  this._rootNodeID = null;
}

/* harmony default export */ __webpack_exports__["default"] = (ReactDOMComponent);

/***/ }),

/***/ "./react/ReactDOMTextComponent.js":
/*!****************************************!*\
  !*** ./react/ReactDOMTextComponent.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * component 类
 * 文本类型
 * @param {*} text 文本内容
 */
function ReactDOMTextComponent(text) {
  this._currentElement = text;
  this._rootNodeID = null;
}

/* harmony default export */ __webpack_exports__["default"] = (ReactDOMTextComponent);

/***/ }),

/***/ "./react/ReactElement.js":
/*!*******************************!*\
  !*** ./react/ReactElement.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * ReactElement 就是虚拟节点的概念
 * @param {*} key 虚拟节点的唯一标识，后期可以进行优化
 * @param {*} type 虚拟节点类型，type可能是字符串（'div', 'span'），也可能是一个function，function时为一个自定义组件
 * @param {*} props 虚拟节点的属性
 */
function ReactElement(key, type, props) {
  this.key = key;
  this.type = type;
  this.props = props;
}

/* harmony default export */ __webpack_exports__["default"] = (ReactElement);

/***/ }),

/***/ "./react/index.js":
/*!************************!*\
  !*** ./react/index.js ***!
  \************************/
/*! exports provided: React, ReactClass, ReactElement, ReactDOMComponent, ReactDOMTextComponent, ReactCompositeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _React__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./React */ "./react/React.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "React", function() { return _React__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _ReactClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReactClass */ "./react/ReactClass.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReactClass", function() { return _ReactClass__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _ReactElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReactElement */ "./react/ReactElement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReactElement", function() { return _ReactElement__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _ReactDOMComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ReactDOMComponent */ "./react/ReactDOMComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReactDOMComponent", function() { return _ReactDOMComponent__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _ReactDOMTextComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ReactDOMTextComponent */ "./react/ReactDOMTextComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReactDOMTextComponent", function() { return _ReactDOMTextComponent__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _ReactCompositeComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ReactCompositeComponent */ "./react/ReactCompositeComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReactCompositeComponent", function() { return _ReactCompositeComponent__WEBPACK_IMPORTED_MODULE_5__["default"]; });










/***/ })

/******/ });
//# sourceMappingURL=main.js.map