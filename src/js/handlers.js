import saveJSON from './request'

export default function mouseHandler(element, mapConfig) {
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

  element.onmousemove = function(e) {
    // whenever cursor is moved on div "element" it will show what Tile are you hover
    currentTile['x'] = Math.floor(e.offsetY / mapConfig.tileHeight());
    currentTile['y'] = Math.floor(e.offsetX / mapConfig.tileWidth());

    var pos_info = document.getElementById("pos_info");
    pos_info.innerHTML = '<strong>' + currentTile['x'] + '</strong>, <strong>' + currentTile['y'] + '</strong>'

    var canvas = document.getElementById('canvasHover')
    if (canvas.getContext){
      canvas.width = mapConfig.mapWidth
      canvas.height = mapConfig.mapHeight

      var ctx = canvas.getContext('2d');
      ctx.fillStyle = "#ffcc00";
      ctx.fillRect(Math.ceil(currentTile['y'] * mapConfig.tileWidth()), Math.ceil(currentTile['x'] * mapConfig.tileHeight()) , mapConfig.tileWidth(), mapConfig.tileHeight());
    };
  };

  element.onclick = function (element) {
    // whenever you click on Tile it show active tile on map
    var e = document.getElementById('clickTile')
    clickTile['x'] = currentTile['x']
    clickTile['y'] = currentTile['y']
    e.innerHTML = '<strong>[' + currentTile['x'] + '</strong>, <strong>' + currentTile['y'] + ']</strong>'

    var canvas = document.getElementById('canvasClick')
    if (canvas.getContext){
      canvas.width = mapConfig.mapWidth
      canvas.height = mapConfig.mapHeight

      var ctx = canvas.getContext('2d');
      ctx.fillStyle = "#ffcc00";
      ctx.fillRect(Math.ceil(clickTile['y'] * mapConfig.tileWidth()), Math.ceil(clickTile['x'] * mapConfig.tileHeight()) , mapConfig.tileWidth(), mapConfig.tileHeight() );
    };

    localStorage.setItem('clickTile', JSON.stringify(clickTile));
  };

  window.onresize = function () {
    mapConfig.mapWidth = document.getElementById('ctx').offsetWidth - 5
    mapConfig.mapHeight = document.getElementById('ctx').offsetHeight - 5
  };

}
