(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./scripts/config.js":
/*!***************************!*\
  !*** ./scripts/config.js ***!
  \***************************/
/*! exports provided: appConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"appConfig\", function() { return appConfig; });\nvar appConfig = {\n  youtubeApiKey: \"37bf6eba9005457ca4209b9169ea3828\",\n  baseUrl: \"https://newsapi.org/v2/\"\n};\n\n//# sourceURL=webpack:///./scripts/config.js?");

/***/ }),

/***/ "./scripts/news-api.js":
/*!*****************************!*\
  !*** ./scripts/news-api.js ***!
  \*****************************/
/*! exports provided: NewsApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NewsApi\", function() { return NewsApi; });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./scripts/config.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\nconsole.log(\"news-api loaded\");\nvar NewsApi =\n/*#__PURE__*/\nfunction () {\n  function NewsApi() {\n    _classCallCheck(this, NewsApi);\n\n    this.API_KEY = _config__WEBPACK_IMPORTED_MODULE_0__[\"appConfig\"].youtubeApiKey;\n    this.baseUrl = _config__WEBPACK_IMPORTED_MODULE_0__[\"appConfig\"].baseUrl;\n  }\n  /*\r\n   * Provides live top and breaking headlines\r\n   * Articles are sorted by the earliest date published first.\r\n   * Accepts object with the following request parameters:\r\n   * country, category, sources, q, pageSize, page\r\n   */\n\n\n  _createClass(NewsApi, [{\n    key: \"topHeadlines\",\n    value: function topHeadlines() {\n      var queryParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {\n        country: \"us\",\n        pageSize: 10\n      };\n      return this.makeRequest(\"top-headlines\", queryParams);\n    }\n    /*\r\n     * Returns the subset of news publishers that top headlines (/v2/top-headlines) are available from\r\n     * Accepts object with the following request parameters:\r\n     * category, language, country\r\n     */\n\n  }, {\n    key: \"sources\",\n    value: function sources(queryParams) {\n      return this.makeRequest(\"sources\", queryParams);\n    }\n  }, {\n    key: \"makeRequest\",\n    value: function () {\n      var _makeRequest = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee(endpoint, queryParams) {\n        var queryString, response, json;\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                queryString = \"\";\n\n                if (queryParams) {\n                  queryString = Object.entries(queryParams).map(function (pair) {\n                    return pair.join(\"=\");\n                  }).join(\"&\");\n                }\n\n                _context.next = 4;\n                return fetch(\"\".concat(this.baseUrl + endpoint, \"?\").concat(queryString, \"&apiKey=\").concat(this.API_KEY));\n\n              case 4:\n                response = _context.sent;\n                _context.next = 7;\n                return response.json();\n\n              case 7:\n                json = _context.sent;\n                return _context.abrupt(\"return\", json);\n\n              case 9:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      return function makeRequest(_x, _x2) {\n        return _makeRequest.apply(this, arguments);\n      };\n    }()\n  }]);\n\n  return NewsApi;\n}();\n\n//# sourceURL=webpack:///./scripts/news-api.js?");

/***/ })

}]);