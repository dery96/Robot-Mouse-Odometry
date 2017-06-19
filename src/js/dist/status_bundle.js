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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony export (immutable) */ __webpack_exports__["a"] = getJSON;
/* harmony export (immutable) */ __webpack_exports__["b"] = saveJSON;

function getData(url) {
  // simple promise to get file content
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function () {
      reject(Error("Network Error"));
    };
    req.send(null);
  });
}

function getJSON(url) {
  // get JSON file from url and convert to object
  return getData(url).then(JSON.parse).catch(function (err) {
    console.log("getJSON failed for", url, err);
    throw err;
  });
}

function saveJSON(file, object) {
  // Send objecto to request.php as URL
  var str = JSON.stringify(object);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "request.php?q=" + str, true);
  xmlhttp.send();
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mouseHandler;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__request__ = __webpack_require__(0);


function mouseHandler(element, mapConfig) {
  // Read position by specific div, and interact

  var currentTile = {
    // current hover Tile by cursor
    x: null,
    y: null
  };

  var clickTile = {
    // current clicked Tile by cursor
    x: null,
    y: null
  };

  element.onmousemove = function (e) {
    // whenever cursor is moved on div "element" it will show what Tile are you hover
    currentTile['x'] = Math.floor(e.offsetY / mapConfig.tileHeight());
    currentTile['y'] = Math.floor(e.offsetX / mapConfig.tileWidth());

    var pos_info = document.getElementById("pos_info");
    pos_info.innerHTML = '<strong>' + currentTile['x'] + '</strong>, <strong>' + currentTile['y'] + '</strong>';

    var canvas = document.getElementById('canvasHover');
    if (canvas.getContext) {
      canvas.width = mapConfig.mapWidth;
      canvas.height = mapConfig.mapHeight;

      var ctx = canvas.getContext('2d');
      ctx.fillStyle = "#ffcc00";
      ctx.fillRect(Math.ceil(currentTile['y'] * mapConfig.tileWidth()), Math.ceil(currentTile['x'] * mapConfig.tileHeight()), mapConfig.tileWidth(), mapConfig.tileHeight());
    };
  };

  element.onclick = function (element) {
    // whenever you click on Tile it show active tile on map
    var e = document.getElementById('clickTile');
    clickTile['x'] = currentTile['x'];
    clickTile['y'] = currentTile['y'];
    e.innerHTML = '<strong>[' + currentTile['x'] + '</strong>, <strong>' + currentTile['y'] + ']</strong>';

    var canvas = document.getElementById('canvasClick');
    if (canvas.getContext) {
      canvas.width = mapConfig.mapWidth;
      canvas.height = mapConfig.mapHeight;

      var ctx = canvas.getContext('2d');
      ctx.fillStyle = "#ffcc00";
      ctx.fillRect(Math.ceil(clickTile['y'] * mapConfig.tileWidth()), Math.ceil(clickTile['x'] * mapConfig.tileHeight()), mapConfig.tileWidth(), mapConfig.tileHeight());
    };

    localStorage.setItem('clickTile', JSON.stringify(clickTile));
  };

  window.onresize = function () {
    mapConfig.mapWidth = document.getElementById('ctx').offsetWidth - 5;
    mapConfig.mapHeight = document.getElementById('ctx').offsetHeight - 5;
  };
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__request__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__handlers__ = __webpack_require__(1);



var randomnumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var mapConfig = {
  map: null,
  pos: null,
  mapWidth: document.getElementById('ctx').offsetWidth - 5,
  mapHeight: document.getElementById('ctx').offsetHeight - 5,
  elementsAcross: null,
  elementsDown: null,
  tileWidth: function () {
    return Math.ceil(this.mapWidth / this.elementsAcross);
  },
  tileHeight: function () {
    return Math.ceil(this.mapHeight / this.elementsDown);
  }
};

var oldPos = null;

function mapGenerate() {
  // This promise function will get map.json and pos.json into array
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__request__["a" /* getJSON */])('./src/json/map.json').then(function (response) {
    mapConfig.map = response;
    mapConfig.elementsAcross = mapConfig.map[0].length;
    mapConfig.elementsDown = mapConfig.map.length;
  }).then(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__request__["a" /* getJSON */])('./src/json/pos.json').then(function (response) {
    mapConfig.pos = response;
  }).then(function () {
    _mapGenerate(mapConfig);
  }));
}

function _mapGenerate(mapConfig) {
  // Draw map Array
  var colors = ['#ffffff', '#e41e65', '#333333', '#e1874b', '#455ec6'];
  var map = mapConfig.map;
  var pos = mapConfig.pos;

  document.getElementById('pos').innerHTML = "X: <strong>" + pos['x'] + "</strong> Y: <strong>" + pos['y'] + "</strong>";

  var canvas = document.getElementById('canvasMap');
  canvas.width = mapConfig.mapWidth;
  canvas.height = mapConfig.mapHeight;
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    for (var y = 0; y < mapConfig.elementsDown; y++) {
      for (var x = 0; x < mapConfig.elementsAcross; x++) {
        let tile = map[y][x];
        if (tile === 3) {
          if (JSON.stringify(oldPos) === JSON.stringify(pos)) {
            ctx.fillStyle = colors[randomnumber(2, 3)];
          } else {
            ctx.fillStyle = colors[2];
          }
        } else {
          ctx.fillStyle = colors[0];
        }
        ctx.fillRect(Math.ceil(x * mapConfig.tileWidth()), Math.ceil(y * mapConfig.tileHeight()), mapConfig.tileWidth(), mapConfig.tileHeight());
      };
    };
  };
  oldPos = pos;
};

// Init ClickHandler
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__handlers__["a" /* default */])(document.getElementById('ctx'), mapConfig);
mapGenerate();

document.getElementById('clickTileButton').onclick = function () {
  var object = JSON.parse(localStorage.getItem('clickTile'));
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__request__["b" /* saveJSON */])('src/json/clickTile.json', object);
};
var requestLoop = setInterval(mapGenerate, 1000);

/***/ })
/******/ ]);