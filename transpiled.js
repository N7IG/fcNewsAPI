"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// config,js
var appConfig = {
  youtubeApiKey: "37bf6eba9005457ca4209b9169ea3828"
}; // news-api.js

var NewsApi =
/*#__PURE__*/
function () {
  function NewsApi(api_key) {
    _classCallCheck(this, NewsApi);

    this.API_KEY = api_key;
    this.baseUrl = "https://newsapi.org/v2/";
  }
  /*
   * Provides live top and breaking headlines
   * Articles are sorted by the earliest date published first.
   * Accepts object with the following request parameters:
   * country, category, sources, q, pageSize, page
   */


  _createClass(NewsApi, [{
    key: "topHeadlines",
    value: function topHeadlines() {
      var queryParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        country: "us",
        pageSize: 10
      };
      return this.makeRequest("top-headlines", queryParams);
    }
    /*
     * Returns the subset of news publishers that top headlines (/v2/top-headlines) are available from
     * Accepts object with the following request parameters:
     * category, language, country
     */

  }, {
    key: "sources",
    value: function sources(queryParams) {
      var response = this.makeRequest("sources", queryParams);
      return response;
    }
  }, {
    key: "makeRequest",
    value: function () {
      var _makeRequest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(endpoint, queryParams) {
        var queryString, response, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryString = "";

                if (queryParams) {
                  queryString = Object.entries(queryParams).map(function (pair) {
                    return pair.join("=");
                  }).join("&");
                }

                _context.next = 4;
                return fetch("".concat(this.baseUrl + endpoint, "?").concat(queryString, "&apiKey=").concat(this.API_KEY));

              case 4:
                response = _context.sent;
                _context.next = 7;
                return response.json();

              case 7:
                json = _context.sent;
                return _context.abrupt("return", json);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function makeRequest(_x, _x2) {
        return _makeRequest.apply(this, arguments);
      };
    }()
  }]);

  return NewsApi;
}(); //template-maker.js


var TemplateMaker =
/*#__PURE__*/
function () {
  function TemplateMaker() {
    _classCallCheck(this, TemplateMaker);
  }

  _createClass(TemplateMaker, [{
    key: "getArticleTemplate",
    value: function getArticleTemplate(article) {
      var charsLeftExp = /\[\+[0-9]+ chars\]/;
      return "<article>\n                    <div class=\"article-title\">\n                        <h2>".concat(article.title, "</h2>\n                        <div class=\"source-name\">").concat(article.source.name, "</div>\n                    </div>\n                    ").concat(article.description ? "<img\n                                src=\"".concat(article.urlToImage, "\"\n                                alt=\"article image\"\n                                class=\"article-image\"\n                            />") : "", "\n                    <p class=\"article-description\">\n                        ").concat(article.description || "", "\n                    </p>\n                    <p class=\"article-content\">\n                        ").concat(article.content ? article.content.replace(charsLeftExp, "") : "", "\n                    </p>\n                    <div class=\"article-footer\">\n                        <div class=\"article-date\">\n                            ").concat(new Date(article.publishedAt).toLocaleString(), "\n                        </div>\n                        <a href=\"").concat(article.url, "\" target=\"_blank\">\n                            <div class=\"default-button\">Go to full article</div>\n                        </a>\n                    </div>\n                </article>");
    }
  }]);

  return TemplateMaker;
}(); //dom-worker.js


var DOMWorker =
/*#__PURE__*/
function () {
  function DOMWorker() {
    _classCallCheck(this, DOMWorker);

    this.domMain = document.querySelector("main");
    this.domChannels = document.querySelector(".channels");
    this.domChannelsList = document.querySelector(".channels-list");
    this.domChannelSelect = document.querySelector(".select-channel");
    this.domCurrentChannel = document.querySelector(".current-channel");
    this.templateMaker = new TemplateMaker();
  }

  _createClass(DOMWorker, [{
    key: "insertArticle",
    value: function insertArticle(article) {
      this.domMain.innerHTML += this.templateMaker.getArticleTemplate(article);
    }
  }, {
    key: "insertArticles",
    value: function insertArticles(articles) {
      var _this = this;

      this.domMain.innerHTML = "";
      articles.forEach(function (article) {
        return _this.insertArticle(article);
      });
    }
  }, {
    key: "showArticesError",
    value: function showArticesError(errorMessage) {
      this.domMain.innerHTML = errorMessage;
    }
  }, {
    key: "displaySources",
    value: function displaySources(response) {
      var _this2 = this;

      var sources = response.sources;
      this.domChannelsList.innerHTML = "";
      splitUp(sources, 20).forEach(function (sources) {
        return _this2.insertSourcesColumn(sources);
      });
    }
  }, {
    key: "showSourcesError",
    value: function showSourcesError(errorMessage) {
      this.domChannelsList.innerHTML = "<div class='channel-column'>".concat(errorMessage, "</div>");
    }
  }, {
    key: "channelStatus",
    value: function channelStatus(currentChannel) {
      this.domCurrentChannel.innerHTML = "Current channel: \n            <span class=\"channel\">".concat(currentChannel, "</span>");
    }
  }, {
    key: "insertSourcesColumn",
    value: function insertSourcesColumn(sources) {
      var column = "<ul class='channel-column'>";
      sources.forEach(function (source) {
        column += "<li data-id=\"".concat(source.id, "\" \n                           data-name=\"").concat(source.name, "\">\n                               ").concat(source.name, "\n                        </li>");
      });
      column += "</ul>";
      this.domChannelsList.innerHTML += column;
    }
  }, {
    key: "toggleSourceBar",
    value: function toggleSourceBar() {
      if (this.domChannels.style.height === "auto") {
        this.domChannels.style.height = 0;
        this.domChannelSelect.innerHTML = "Select channel\n                <i class=\"fas fa-chevron-circle-down\"></i>";
      } else {
        this.domChannels.style.height = "auto";
        this.domChannelSelect.innerHTML = "Cancel\n                <i class=\"fas fa-chevron-circle-up\"></i>";
      }
    }
  }]);

  return DOMWorker;
}();
/*
 * Transforms array into array of arrays of length n
 */


function splitUp(arr) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var result = [];
  arr.forEach(function (element, idx) {
    if (idx % n === 0) {
      result.push(arr.slice(idx, idx + n));
    }
  });
  return result;
} //main.js


var apiKey = appConfig.youtubeApiKey;
var newsapi = new NewsApi(apiKey);
var domWorker = new DOMWorker();
var domChannelSelect = document.querySelector(".select-channel");
var domChannelsList = document.querySelector(".channels-list");

function onChannelsClick(event) {
  if (event.target.tagName === "LI") {
    var sourceName = event.target.getAttribute("data-name");
    var sourceId = event.target.getAttribute("data-id");
    insertTopHeadlines({
      sources: sourceId
    });
    domWorker.toggleSourceBar();
    domWorker.channelStatus(sourceName);
  }
}

function insertTopHeadlines(_x3) {
  return _insertTopHeadlines.apply(this, arguments);
}

function _insertTopHeadlines() {
  _insertTopHeadlines = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(params) {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return newsapi.topHeadlines(params);

          case 3:
            response = _context2.sent;
            domWorker.insertArticles(response.articles);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            domWorker.showArticesError("Looks like you have problems with your internet connection. No news right now :(");

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 7]]);
  }));
  return _insertTopHeadlines.apply(this, arguments);
}

function insertSources() {
  return _insertSources.apply(this, arguments);
}

function _insertSources() {
  _insertSources = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return newsapi.sources();

          case 3:
            response = _context3.sent;
            domWorker.displaySources(response);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            domWorker.showSourcesError("Looks like you have problems with your internet connection. No channels to choose from :(");

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 7]]);
  }));
  return _insertSources.apply(this, arguments);
}

domChannelSelect.addEventListener("click", function (event) {
  return domWorker.toggleSourceBar(event);
});
domChannelsList.addEventListener("click", function (event) {
  return onChannelsClick(event);
});
insertTopHeadlines();
insertSources();
