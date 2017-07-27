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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony export (immutable) */ __webpack_exports__["b"] = getJSON;
/* harmony export (immutable) */ __webpack_exports__["a"] = saveJSON;

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

function saveJSON(object) {
  // Send object to request.php as URL
  var str = JSON.stringify(object);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "request.php?q=" + str, true);
  xmlhttp.send(null);
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setCamera;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__request__ = __webpack_require__(0);


function setCamera(action) {
  var camera = {
    textStatus: document.getElementById('cameraText'),
    container: document.getElementById('cameraContainer'),
    stream: document.getElementById('cameraStream'),
    degrees: null
  };
  var degrees = 0;
  camera.textStatus.innerHTML = camera.degrees + "* stopnii";

  camera.stream.src = document.location.href.slice(0, -1) + ':8081';
  console.log(document.location.href.slice(0, -1) + ':8081');

  camera.stream.style.width = camera.container.offsetWidth + 'px';
  camera.stream.style.height = camera.container.offsetHeight + 'px';

  document.getElementById('cameraLeft').onclick = function () {
    if (action.controlState) {
      action.action = "increase";
      document.getElementById('opis').innerHTML = "Wyslano Akcje Kamera Increase";
      console.log(action);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__request__["a" /* saveJSON */])(action);
    } else {
      document.getElementById('opis').innerHTML = "Aby wykonac [Obrot], musisz byc w trybie kontroli";
    }
  }.bind(this);
  //
  //
  document.getElementById('cameraRight').onclick = function () {
    if (action.controlState) {
      action.action = "decrease";
      document.getElementById('opis').innerHTML = "Wyslano Akcje Kamera Decrease";
      console.log(action);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__request__["a" /* saveJSON */])(action);
    } else {
      document.getElementById('opis').innerHTML = "Aby wykonac [Obrot], musisz byc w trybie kontroli";
    }
  }.bind(this);
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mouseHandler;
/* harmony export (immutable) */ __webpack_exports__["b"] = buttonHandler;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__request__ = __webpack_require__(0);


function mouseHandler(element, mapConfig, mapDrawLen) {
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
    // var mapDrawLen = JSON.parse(localStorage.getItem('mapDrawLen'));
    var pos = JSON.parse(localStorage.getItem('pos'));
    var viewRange = mapConfig.viewRange;
    // (pos['x'] - Math.floor(viewRange / 2)
    //  + (pos['y'] - Math.floor(viewRange / 2)
    currentTile['x'] = Math.floor(e.offsetY / mapConfig.tileHeight());
    currentTile['y'] = Math.floor(e.offsetX / mapConfig.tileWidth());
    currentTile['x'] = mapDrawLen.testUpPos() + currentTile['x'];
    currentTile['y'] = mapDrawLen.testLeftPos() + currentTile['y'];

    console.log();
    if (currentTile['x'] >= 0 && currentTile['x'] <= 1000) {
      if (currentTile['y'] >= 0 && currentTile['y'] <= 1000) {

        // if (currentTile['x'] >= mapDrawLen.testUpPos() && currentTile['x'] <= mapDrawLen.testDownPos()) {
        //   if (currentTile['y'] >= mapDrawLen.testLeftPos() && currentTile['y'] <= mapDrawLen.testRightPos()) {

        var pos_info = document.getElementById("pos_info");
        pos_info.innerHTML = '<strong>' + currentTile['x'] + '</strong>, <strong>' + currentTile['y'] + '</strong>';

        var canvas = document.getElementById('canvasHover');
        if (canvas.getContext) {
          canvas.width = mapConfig.mapWidth();
          canvas.height = mapConfig.mapHeight();

          var ctx = canvas.getContext('2d');
          ctx.fillStyle = "#ffcc00";

          var tmp_x = Math.floor(e.offsetY / mapConfig.tileHeight());
          var tmp_y = Math.floor(e.offsetX / mapConfig.tileWidth());

          localStorage.setItem('tmp_x', JSON.stringify(tmp_x));
          localStorage.setItem('tmp_y', JSON.stringify(tmp_y));

          JSON.parse(localStorage.getItem('clickTile'));
          ctx.fillRect(Math.ceil(tmp_y * mapConfig.tileWidth()), Math.ceil(tmp_x * mapConfig.tileHeight()), mapConfig.tileWidth(), mapConfig.tileHeight());
        };
      }
    }
  };

  element.onclick = function (element) {
    // whenever you click on Tile it show active tile on map
    var e = document.getElementById('clickTile');
    clickTile['x'] = currentTile['x'];
    clickTile['y'] = currentTile['y'];
    e.innerHTML = '<strong>[' + currentTile['x'] + '</strong>, <strong>' + currentTile['y'] + ']</strong>';

    var canvas = document.getElementById('canvasClick');
    if (canvas.getContext) {
      canvas.width = mapConfig.mapWidth();
      canvas.height = mapConfig.mapHeight();

      var ctx = canvas.getContext('2d');
      ctx.fillStyle = "#ffcc00";

      var tmp_x = JSON.parse(localStorage.getItem('tmp_x'));
      var tmp_y = JSON.parse(localStorage.getItem('tmp_y'));

      ctx.fillRect(Math.ceil(tmp_y * mapConfig.tileWidth()), Math.ceil(tmp_x * mapConfig.tileHeight()), mapConfig.tileWidth(), mapConfig.tileHeight());
    };

    localStorage.setItem('clickTile', JSON.stringify(clickTile));
  };

  window.onresize = function () {
    mapConfig.mapWidth();
    mapConfig.mapHeight();
  };
}

function buttonHandler(buttons, mapConfig, element, mapDrawLen) {
  buttons[0].onclick = function () {
    mapConfig.viewRange = 0;
    mouseHandler(element, mapConfig, mapDrawLen);
  };
  buttons[1].onclick = function () {
    mapConfig.viewRange = 30;
    mouseHandler(element, mapConfig, mapDrawLen);
  };
  buttons[2].onclick = function () {
    mapConfig.viewRange = 60;
    mouseHandler(element, mapConfig, mapDrawLen);
  };
  buttons[3].onclick = function () {
    mapConfig.viewRange = 90;
    mouseHandler(element, mapConfig, mapDrawLen);
  };
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = controlState;
// import saveJSON from './request'
// var action = {controlState: false, action: null}
function controlState(action, saveJSON) {
  var input = document.getElementById("controlSwitchOption");
  var explorationInput = document.getElementById('explorationSwitchOption');
  var up = document.getElementById('up');
  var down = document.getElementById('down');
  var left = document.getElementById('left');
  var right = document.getElementById('right');

  input.onclick = function () {

    if (input.checked) {
      if (explorationInput.checked) {
        explorationInput.checked = false;
      }
      document.getElementById('circle').style.cssText = "background: green";
      document.getElementById('akcja').innerHTML = "Tryb kontroli samodzielnej";

      action.controlState = true;
      action.exploration = false;

      up.onclick = function () {
        if (action.controlState) {
          action.action = document.getElementById('up').id;

          console.log(action);
          saveJSON(action);
          document.getElementById('opis').innerHTML = "Wyslano Akcje Gora";
        } else {
          document.getElementById('opis').innerHTML = "Aby wykonac [Run], musisz byc w trybie kontroli";
        }
      };

      down.onclick = function () {
        if (action.controlState) {
          action.action = document.getElementById('down').id;

          console.log(action);
          saveJSON(action);
          document.getElementById('opis').innerHTML = "Wyslano Akcje Dol";
        } else {
          document.getElementById('opis').innerHTML = "Aby wykonac [Run], musisz byc w trybie kontroli";
        }
      };

      left.onclick = function () {
        if (action.controlState) {
          action.action = document.getElementById('left').id;

          console.log(action);
          saveJSON(action);
          document.getElementById('opis').innerHTML = "Wyslano Akcje Lewo";
        } else {
          document.getElementById('opis').innerHTML = "Aby wykonac [Run], musisz byc w trybie kontroli";
        }
      };

      right.onclick = function () {
        if (action.controlState) {
          action.action = document.getElementById('right').id;

          console.log(action);
          saveJSON(action);
          document.getElementById('opis').innerHTML = "Wyslano Akcje Prawo";
        } else {
          document.getElementById('opis').innerHTML = "Aby wykonac [Run], musisz byc w trybie kontroli";
        }
      };
    } else {
      action.controlState = false;
      document.getElementById('akcja').innerHTML = "Tryb Obserwatora";
      document.getElementById('circle').style.cssText = "background: rgb(147, 21, 21)";
    }
  }.bind(this);

  explorationInput.onclick = function () {
    if (explorationInput.checked) {
      if (input.checked) {
        input.checked = false;
        document.getElementById('circle').style.cssText = "background: rgb(147, 21, 21)";
      }
      document.getElementById('akcja').innerHTML = "Tryb Eksploracji";
      action.exploration = true;
      action.controlState = false;
      console.log(action);
      saveJSON(action);
    }
  };

  // }.bind(this)
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__request__ = __webpack_require__(0);


class drawMap {
  constructor(mapConfig, mapDrawLen, canvas) {
    this.color = {
      0: '#ffffff', // floor
      1: '#e1874b', // displacement
      2: '#455ec6', // obstacle
      3: '#333333', // robot
      4: '#e41e65', // click
      5: '#ffffff' };
    this.mapConfig = mapConfig;
    this.draw = mapDrawLen;
    this.canvasList = canvas;

    // this.getMap()
    this.intervalID = setInterval(this.getMap.bind(this), 100);
  }

  colorTile(x, y, pos) {
    // Return HEX color of tile
    if (x >= pos['x'] - 2 && x <= pos['x'] + 2) {
      if (y >= pos['y'] - 2 && y <= pos['y'] + 2) {
        return this.color[3];
      }
    }
    if (x > this.mapConfig.elementsDown || y > this.mapConfig.elementsAcross) {
      return this.color[5];
    } else {
      return this.color[this.mapConfig.array[x][y]];
    }
  }

  getMap() {
    var self = this;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__request__["b" /* getJSON */])('./src/json/map.json').then(function (response) {
      // response
      self.mapConfig.array = response;
      self.mapConfig.elementsDown = self.mapConfig.array.length;
      self.mapConfig.elementsAcross = self.mapConfig.array[0].length;

      // console.log(self.mapConfig.elementsDown, self.mapConfig.elementsAcross);
    }).then(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__request__["b" /* getJSON */])('./src/json/pos.json').then(function (response) {
      self.mapConfig.pos = response;

      self.draw.up = self.mapConfig.pos['x'] - Math.floor(self.mapConfig.viewRange / 2);
      self.draw.down = self.mapConfig.pos['x'] + Math.floor(self.mapConfig.viewRange / 2);
      self.draw.left = self.mapConfig.pos['y'] - Math.floor(self.mapConfig.viewRange / 2);
      self.draw.right = self.mapConfig.pos['y'] + Math.floor(self.mapConfig.viewRange / 2);
    }).then(function () {
      self._getMap();
      // this._mouseHandler()
    }));
  }

  _getMap() {
    var oldPos = null;
    var canvas = this.canvasList;

    var background = function () {
      // To draw "out of Map" space
      var canvas = document.getElementById('canvasBackground');
      if (canvas.getContext) {
        canvas.width = this.mapConfig.mapWidth() - 5;
        canvas.height = this.mapConfig.mapHeight() - 5;

        var ctx = canvas.getContext('2d');
        ctx.fillStyle = this.color[5];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }.bind(this);

    background(this);

    if (canvas.getContext) {
      canvas.width = this.mapConfig.mapWidth();
      canvas.height = this.mapConfig.mapHeight();
      var ctx = canvas.getContext('2d');

      localStorage.setItem('pos', JSON.stringify(this.mapConfig.pos));
      localStorage.setItem('map', JSON.stringify(this.mapConfig.array));

      document.getElementById('pos').innerHTML = "X: <strong>" + this.mapConfig.pos['x'] + "</strong> Y: <strong>" + this.mapConfig.pos['y'] + "</strong>" + " na rozmiar:" + this.mapConfig.elementsAcross + "x" + this.mapConfig.elementsDown;

      var robotInCenter = function () {
        let x = 0;
        let y = 0;
        for (var i = self.draw.testUpPos(); i < self.draw.testDownPos(); i++) {
          for (var j = self.draw.testLeftPos(); j < self.draw.testRightPos(); j++) {
            var viewRange = self.mapConfig.viewRange;

            let tileWidth = self.mapConfig.tileWidth(viewRange);
            let tileHeight = self.mapConfig.tileHeight(viewRange);
            ctx.fillStyle = self.colorTile(i, j, self.mapConfig.pos);
            ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            y++;
          };
          x++;
          y = 0;
        };
      };

      var globalMap = function () {
        // It just shows full map
        for (var y = 0; y < self.mapConfig.elementsDown; y++) {
          for (var x = 0; x < self.mapConfig.elementsAcross; x++) {
            ctx.fillStyle = self.colorTile(x, y, self.mapConfig.pos);
            ctx.fillRect(Math.ceil(x * self.mapConfig.tileWidth()), Math.ceil(y * self.mapConfig.tileHeight()), self.mapConfig.tileWidth(), self.mapConfig.tileHeight());
          };
        };
      };

      self = this;
      if (this.mapConfig.viewRange === 0) {
        globalMap(self);
      } else {
        robotInCenter(self);
      }
    };
    oldPos = this.mapConfig.pos;
    // this.getMap(this)
    // setInterval(this.getMap, 100);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = drawMap;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__request__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__handlers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mapGenerate__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__camera__ = __webpack_require__(1);






var randomnumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var testViewRange = function (n) {
  if (n < 10 || !Number.isInteger(n)) {
    return 30;
  } else return n;
};

var mapConfig = {
  array: null,
  pos: null,
  elementsAcross: null,
  elementsDown: null,
  viewRange: 60,
  // document.getElementById('ctx').offsetWidth
  // document.getElementById('ctx').offsetHeight

  mapWidth: function () {
    return document.getElementById('conv').offsetWidth;
  },
  mapHeight: function () {
    return document.getElementById('conv').offsetHeight;
  },

  tileWidth: function () {
    if (this.viewRange === 0) {
      return this.mapWidth() / this.elementsAcross;
    } else {
      return this.mapWidth() / this.viewRange;
    }
  },

  tileHeight: function () {
    if (this.viewRange === 0) {
      return this.mapHeight() / this.elementsDown;
    } else {
      return this.mapHeight() / this.viewRange;
    }
  }
};

var mapDrawLen = {
  // From every side of robot central point
  up: null,
  down: null,
  left: null,
  right: null,

  testUpPos: function () {
    if (this.up < 0) {
      return 0;
    } else {
      return this.up;
    }
  },

  testDownPos: function () {
    if (this.down > mapConfig.elementsDown) {
      return mapConfig.elementsDown;
    } else {
      return this.down;
    }
  },

  testLeftPos: function () {
    if (this.left < 0) {
      return 0;
    } else {
      return this.left;
    }
  },

  testRightPos: function () {
    if (this.right > mapConfig.elementsAcross) {
      return mapConfig.elementsAcross;
    } else {
      return this.right;
    }
  }
};

// Init ClickHandler
var map = new __WEBPACK_IMPORTED_MODULE_2__mapGenerate__["a" /* default */](mapConfig, mapDrawLen, document.getElementById('canvasMap'));

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__handlers__["a" /* mouseHandler */])(document.getElementById('conv'), map.mapConfig, map.draw);

let tmp = [document.getElementById('sizeMapButtonx'), document.getElementById('sizeMapButton25'), document.getElementById('sizeMapButton50'), document.getElementById('sizeMapButton100')];

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__handlers__["b" /* buttonHandler */])(tmp, mapConfig, document.getElementById('cavasParent'), mapDrawLen);

// Init controlState handler
var action = { controlState: false, exploration: false, action: null };
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__index__["a" /* default */])(action, __WEBPACK_IMPORTED_MODULE_0__request__["a" /* saveJSON */]);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__camera__["a" /* default */])(action);

var sendButton = document.getElementById('sendButton');

sendButton.onclick = function () {
  // sendButton for text input commands
  if (action.controlState) {
    // If you're in controlState you can send command to server
    var sendText = document.getElementById('sendText').value;
    action.action = sendText;

    console.log(action);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__request__["a" /* saveJSON */])(action);
    document.getElementById('opis').innerHTML = "Wyslano Akcje Wyslij";
  } else {
    document.getElementById('opis').innerHTML = "Aby wykonac [Run], musisz byc w trybie kontroli";
  }
}.bind(this);

document.getElementById('stop').onclick = function () {
  document.getElementById('opis').innerHTML = "Stop!";
  action.action = "stop";
  console.log(action);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__request__["a" /* saveJSON */])(action);
}.bind(this);

document.getElementById('clickTileButton').onclick = function () {
  if (action.controlState) {
    var clickPos = JSON.parse(localStorage.getItem('clickTile'));

    if (Number.isInteger(clickPos['x']) && Number.isInteger(clickPos['y'])) {
      action.action = clickPos;

      console.log(action);
      document.getElementById('opis').innerHTML = "Wyslano Akcje Run";
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__request__["a" /* saveJSON */])(action);
    } else {
      document.getElementById('opis').innerHTML = "Najpierw zaznacz miejsce do ktorego Robot ma jechac.";
    }
  } else {
    document.getElementById('opis').innerHTML = "Aby wykonac [Run], musisz byc w trybie kontroli";
  }
}.bind(this);

/***/ })
/******/ ]);