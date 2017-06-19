import {getData, getJSON, saveJSON} from './request';
import mouseHandler from './handlers';

var randomnumber = function(min, max) {return Math.floor(Math.random() * (max - min + 1)) + min}

var mapConfig = {
    map: null,
    pos: null,
    mapWidth: document.getElementById('ctx').offsetWidth - 5,
    mapHeight: document.getElementById('ctx').offsetHeight - 5,
    elementsAcross: null,
    elementsDown: null,
    tileWidth:  function () {return Math.ceil(this.mapWidth / (this.elementsAcross))},
    tileHeight: function () {return Math.ceil(this.mapHeight / (this.elementsDown))},
};

var oldPos = null

function mapGenerate() {
  // This promise function will get map.json and pos.json into array
  getJSON('./src/json/map.json').then(function(response) {
    mapConfig.map = response;
    mapConfig.elementsAcross = mapConfig.map[0].length;
    mapConfig.elementsDown = mapConfig.map.length;

  }).then(getJSON('./src/json/pos.json').then(function(response) {
    mapConfig.pos = response
  }).then(function() {
    _mapGenerate(mapConfig);
  })
)}

function _mapGenerate(mapConfig) {
  // Draw map Array
  var colors = ['#ffffff', '#e41e65', '#333333', '#e1874b', '#455ec6'];
  var map = mapConfig.map
  var pos = mapConfig.pos

  document.getElementById('pos').innerHTML = "X: <strong>" + pos['x'] + "</strong> Y: <strong>" + pos['y'] + "</strong>"

  var canvas = document.getElementById('canvasMap')
  canvas.width = mapConfig.mapWidth
  canvas.height = mapConfig.mapHeight
  if (canvas.getContext){
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
        }
        else {
          ctx.fillStyle = colors[0];
        }
        ctx.fillRect(Math.ceil(x * mapConfig.tileWidth()), Math.ceil(y * mapConfig.tileHeight()) , mapConfig.tileWidth(), mapConfig.tileHeight());
      };
    };
  };
  oldPos = pos
};

// Init ClickHandler
mouseHandler(document.getElementById('ctx'), mapConfig)
mapGenerate()

document.getElementById('clickTileButton').onclick = function() {
  var object = JSON.parse(localStorage.getItem('clickTile'))
  saveJSON('src/json/clickTile.json', object);
};
var requestLoop = setInterval(mapGenerate, 1000);
