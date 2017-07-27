import {getData, getJSON, saveJSON} from './request';
import {mouseHandler, buttonHandler} from './handlers';
import drawMap from './mapGenerate';
import controlState from './index';
import setCamera from './camera'

var randomnumber = function(min, max) {return Math.floor(Math.random() * (max - min + 1)) + min}
var testViewRange = function (n) {if (n < 10 || !Number.isInteger(n)) {return 30} else return n};

var mapConfig = {
    array: null,
    pos: null,
    elementsAcross: null,
    elementsDown: null,
    viewRange: 60,
    // document.getElementById('ctx').offsetWidth
    // document.getElementById('ctx').offsetHeight

    mapWidth: function () {return document.getElementById('conv').offsetWidth},
    mapHeight: function () {return document.getElementById('conv').offsetHeight},

    tileWidth:  function () {
      if (this.viewRange === 0) {
        return this.mapWidth() / (this.elementsAcross)
      } else {return this.mapWidth() / (this.viewRange)}
    },

    tileHeight: function () {
      if (this.viewRange === 0) {
        return this.mapHeight() / (this.elementsDown)
      } else {return this.mapHeight() / (this.viewRange)}
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
      return 0
    } else {return this.up}
  },

  testDownPos: function () {
    if (this.down > mapConfig.elementsDown) {
      return mapConfig.elementsDown
    } else {return this.down}
    },

  testLeftPos: function () {
    if (this.left < 0) {
      return 0
    } else {return this.left}
  },

  testRightPos: function () {
    if (this.right > mapConfig.elementsAcross) {
      return mapConfig.elementsAcross
    } else {return this.right}
  },
};


// Init ClickHandler
var map = new drawMap(mapConfig, mapDrawLen, document.getElementById('canvasMap'))

mouseHandler(document.getElementById('conv'), map.mapConfig, map.draw)

let tmp = [document.getElementById('sizeMapButtonx'), document.getElementById('sizeMapButton25'), document.getElementById('sizeMapButton50'), document.getElementById('sizeMapButton100')];

buttonHandler(tmp, mapConfig, document.getElementById('cavasParent'), mapDrawLen)

// Init controlState handler
var action = {controlState: false,  exploration: false, action: null}
controlState(action, saveJSON)
setCamera(action)

var sendButton = document.getElementById('sendButton')

sendButton.onclick = function () {
  // sendButton for text input commands
  if (action.controlState) {
    // If you're in controlState you can send command to server
    var sendText = document.getElementById('sendText').value
    action.action = sendText

    console.log(action);
    saveJSON(action);
    document.getElementById('opis').innerHTML = "Wyslano Akcje Wyslij"
  } else {
    document.getElementById('opis').innerHTML = "Aby wykonac [Run], musisz byc w trybie kontroli"
  }
}.bind(this)

document.getElementById('stop').onclick = function () {
  document.getElementById('opis').innerHTML = "Stop!"
  action.action = "stop"
  console.log(action);
  saveJSON(action);

}.bind(this)

document.getElementById('clickTileButton').onclick = function() {
  if (action.controlState) {
    var clickPos = JSON.parse(localStorage.getItem('clickTile'))

    if (Number.isInteger(clickPos['x']) && Number.isInteger(clickPos['y'])) {
        action.action = clickPos

        console.log(action);
        document.getElementById('opis').innerHTML = "Wyslano Akcje Run"
        saveJSON(action);
    } else {document.getElementById('opis').innerHTML = "Najpierw zaznacz miejsce do ktorego Robot ma jechac."}
  } else {document.getElementById('opis').innerHTML = "Aby wykonac [Run], musisz byc w trybie kontroli"}
}.bind(this)
