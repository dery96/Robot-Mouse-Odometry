import saveJSON from './request'

export function mouseHandler(element, mapConfig, mapDrawLen) {
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
    // var mapDrawLen = JSON.parse(localStorage.getItem('mapDrawLen'));
    var pos = JSON.parse(localStorage.getItem('pos'));
    var viewRange = mapConfig.viewRange
    // (pos['x'] - Math.floor(viewRange / 2)
    //  + (pos['y'] - Math.floor(viewRange / 2)
    currentTile['x'] = Math.floor(e.offsetY / mapConfig.tileHeight()) ;
    currentTile['y'] = Math.floor(e.offsetX / mapConfig.tileWidth());
    currentTile['x'] = mapDrawLen.testUpPos() + currentTile['x']
    currentTile['y'] = mapDrawLen.testLeftPos() + currentTile['y']

    console.log();
    if (currentTile['x'] >= 0 && currentTile['x'] <= 1000) {
      if (currentTile['y'] >= 0 && currentTile['y'] <= 1000) {

    // if (currentTile['x'] >= mapDrawLen.testUpPos() && currentTile['x'] <= mapDrawLen.testDownPos()) {
    //   if (currentTile['y'] >= mapDrawLen.testLeftPos() && currentTile['y'] <= mapDrawLen.testRightPos()) {

        var pos_info = document.getElementById("pos_info");
        pos_info.innerHTML = '<strong>' + currentTile['x'] + '</strong>, <strong>' + currentTile['y'] + '</strong>'

        var canvas = document.getElementById('canvasHover')
        if (canvas.getContext){
          canvas.width = mapConfig.mapWidth()
          canvas.height = mapConfig.mapHeight()

          var ctx = canvas.getContext('2d');
          ctx.fillStyle = "#ffcc00";

          var tmp_x = Math.floor(e.offsetY / mapConfig.tileHeight())
          var tmp_y = Math.floor(e.offsetX / mapConfig.tileWidth())

          localStorage.setItem('tmp_x', JSON.stringify(tmp_x));
          localStorage.setItem('tmp_y', JSON.stringify(tmp_y));

          JSON.parse(localStorage.getItem('clickTile'))
          ctx.fillRect(Math.ceil(tmp_y * mapConfig.tileWidth()), Math.ceil(tmp_x * mapConfig.tileHeight()) , mapConfig.tileWidth(), mapConfig.tileHeight());
        };
      }
    }
  };

  element.onclick = function (element) {
    // whenever you click on Tile it show active tile on map
    var e = document.getElementById('clickTile')
    clickTile['x'] = currentTile['x']
    clickTile['y'] = currentTile['y']
    e.innerHTML = '<strong>[' + currentTile['x'] + '</strong>, <strong>' + currentTile['y'] + ']</strong>'

    var canvas = document.getElementById('canvasClick')
    if (canvas.getContext){
      canvas.width = mapConfig.mapWidth()
      canvas.height = mapConfig.mapHeight()

      var ctx = canvas.getContext('2d');
      ctx.fillStyle = "#ffcc00";

      var tmp_x = JSON.parse(localStorage.getItem('tmp_x'))
      var tmp_y = JSON.parse(localStorage.getItem('tmp_y'))

      ctx.fillRect(Math.ceil(tmp_y * mapConfig.tileWidth()), Math.ceil(tmp_x * mapConfig.tileHeight()) , mapConfig.tileWidth(), mapConfig.tileHeight());
    };

    localStorage.setItem('clickTile', JSON.stringify(clickTile));
  };

  window.onresize = function () {
    mapConfig.mapWidth()
    mapConfig.mapHeight()
  };

}

export function buttonHandler(buttons, mapConfig, element, mapDrawLen) {
    buttons[0].onclick = function () {
      mapConfig.viewRange = 0;
      mouseHandler(element, mapConfig, mapDrawLen);
    };
    buttons[1].onclick = function () {
      mapConfig.viewRange = 30
      mouseHandler(element, mapConfig, mapDrawLen);
    };
    buttons[2].onclick = function () {
      mapConfig.viewRange = 60
      mouseHandler(element, mapConfig, mapDrawLen);
    };
    buttons[3].onclick = function () {
      mapConfig.viewRange = 90
      mouseHandler(element, mapConfig, mapDrawLen);
    };
  }
