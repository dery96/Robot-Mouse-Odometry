import {getData, getJSON, saveJSON} from './request';

export default class drawMap {
  constructor(mapConfig, mapDrawLen, canvas) {
    this.color = {
      0 : '#ffffff', // floor
      1 : '#e1874b', // displacement
      2 : '#455ec6', // obstacle
      3 : '#333333', // robot
      4 : '#e41e65', // click
      5 : '#ffffff', // behind the map
    };
    this.mapConfig = mapConfig
    this.draw = mapDrawLen
    this.canvasList = canvas

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
        return this.color[5]
      } else {return this.color[this.mapConfig.array[x][y]]}
    }

  getMap() {
    var self = this
    getJSON('./src/json/map.json').then(function(response) {
      // response
      self.mapConfig.array = response;
      self.mapConfig.elementsDown = self.mapConfig.array.length
      self.mapConfig.elementsAcross = self.mapConfig.array[0].length

      // console.log(self.mapConfig.elementsDown, self.mapConfig.elementsAcross);
      }).then(getJSON('./src/json/pos.json').then(function(response) {
        self.mapConfig.pos = response;

        self.draw.up = self.mapConfig.pos['x'] - Math.floor(self.mapConfig.viewRange / 2);
        self.draw.down = self.mapConfig.pos['x'] + Math.floor(self.mapConfig.viewRange / 2);
        self.draw.left = self.mapConfig.pos['y'] - Math.floor(self.mapConfig.viewRange / 2);
        self.draw.right = self.mapConfig.pos['y'] + Math.floor(self.mapConfig.viewRange / 2);
      }).then(function() {
        self._getMap()
        // this._mouseHandler()

      })
    )
  }


  _getMap() {
    var oldPos = null
    var canvas = this.canvasList


    var background = function () {
      // To draw "out of Map" space
      var canvas = document.getElementById('canvasBackground')
      if (canvas.getContext) {
        canvas.width = this.mapConfig.mapWidth() - 5
        canvas.height = this.mapConfig.mapHeight() - 5

        var ctx = canvas.getContext('2d');
        ctx.fillStyle = this.color[5]
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }.bind(this)

    background(this)


    if (canvas.getContext) {
      canvas.width = this.mapConfig.mapWidth()
      canvas.height = this.mapConfig.mapHeight()
      var ctx = canvas.getContext('2d');

      localStorage.setItem('pos', JSON.stringify(this.mapConfig.pos));
      localStorage.setItem('map', JSON.stringify(this.mapConfig.array));

      document.getElementById('pos').innerHTML = "X: <strong>" + this.mapConfig.pos['x'] + "</strong> Y: <strong>" + this.mapConfig.pos['y'] + "</strong>" + " na rozmiar:" + this.mapConfig.elementsAcross + "x" + this.mapConfig.elementsDown

      var robotInCenter = function () {
        let x = 0
        let y = 0
        for (var i = self.draw.testUpPos(); i < self.draw.testDownPos(); i++) {
          for (var j = self.draw.testLeftPos(); j < self.draw.testRightPos(); j++) {
            var viewRange = self.mapConfig.viewRange

            let tileWidth = self.mapConfig.tileWidth(viewRange);
            let tileHeight = self.mapConfig.tileHeight(viewRange)
            ctx.fillStyle = self.colorTile(i, j, self.mapConfig.pos);
            ctx.fillRect((x * tileWidth), (y * tileHeight), tileWidth, tileHeight);
            y++;
          };
          x++;
          y = 0
        };
      };

      var globalMap = function () {
        // It just shows full map
          for (var y = 0; y < self.mapConfig.elementsDown; y++) {
            for (var x = 0; x < self.mapConfig.elementsAcross; x++) {
              ctx.fillStyle = self.colorTile(x, y, self.mapConfig.pos)
              ctx.fillRect(Math.ceil(x * self.mapConfig.tileWidth()), Math.ceil(y * self.mapConfig.tileHeight()), self.mapConfig.tileWidth(), self.mapConfig.tileHeight());
            };
          };
        }

      self = this
      if (this.mapConfig.viewRange === 0) {
        globalMap(self)
      } else {
        robotInCenter(self)
      }
    };
    oldPos = this.mapConfig.pos
    // this.getMap(this)
    // setInterval(this.getMap, 100);

  }
}
