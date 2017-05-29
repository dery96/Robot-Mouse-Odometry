window.onload= myFunction; // Wykona sie wtedy kiedy cala strona zostanie wczytana
// document.addEventListener("DOMContentLoaded") = myFunction;
// Wykona po zaladowaniu DOM, ale np przed tym jak obrazki sie załaduja

function myFunction() {
  var input = document.getElementById ("controlSwitchOption");
  input.onclick = checkState;
  sendRequest()
  var requestLoop = setInterval(sendRequest, 1500);
}

function checkState () {
  var input = document.getElementById ("controlSwitchOption")
  if (input.checked) {
    document.getElementById('circle').style.cssText = "background: green"
  }
  else {
    var pending = true
    // if (pending) {
    //   document.getElementById('circle').style.cssText = "background: rgb(227, 135, 25)"
    // }
    // else {
      document.getElementById('circle').style.cssText = "background: rgb(147, 21, 21)"
    // }

  }
}

function sendRequest() {
  // It recive actual mapGrid state from python server
  // console.log("> Time :)");
  if (window.XMLHttpRequest) {
    var req = new XMLHttpRequest();
    req.open('GET', 'map.json', true);
    req.onreadystatechange = function (aEvt) {
      if (req.readyState == 4) {
        if (req.status == 200) {
          var mapConfig = mapConfigInit(JSON.parse(req.responseText));
        }
      }
    }
  }
  req.send(null);
  if (window.XMLHttpRequest) {
    var req = new XMLHttpRequest();
    req.open('GET', 'pos.json', true);
    req.onreadystatechange = function (aEvt) {
      if (req.readyState == 4) {
        if (req.status == 200) {
          var mapPos = JSON.parse(req.responseText);
          console.log(mapPos);
          mapGenerate(mapConfig, mapPos);
        }
      }
    }
  }
  req.send(null);
};

var mapConfigInit = function(positionRobot) {
  this.positionRobot = positionRobot;
  this.blockWidth = document.getElementById("canvasMap").offsetWidth;
  this.blockHeight = document.getElementById("canvasMap").offsetHeight;

  this.elementsAcross = positionRobot[0].length;
  this.elementsDown = positionRobot.length;

  this.mapWidth = Math.ceil(this.blockWidth / (this.elementsAcross));
  this.mapHeight = Math.ceil(this.blockHeight / (this.elementsDown));

  this.ship = new Image();
  this.ship.src = 'ship.jpg';
};

function mapGenerate(mapConfig, mapPos) {
  // Put python list of positions into html by canvas
  // It's auto-adjust to div size that It can resize for browser/window width, height.
  // mapGenerateInfo(mapConfig);
  var pos_x = 0
  var pos_y = 0

  var old_pos_x = 0
  var old_pos_y = 0

  var canvas = document.getElementById('canvasMap');
  canvas.width = blockWidth;
  canvas.height = blockHeight;

  var colors = ['#ffffff', '#333333', '#e41e65', '#455ec6'];
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    for (var y = 0; y < elementsDown; y++) {
      for (var x = 0; x < elementsAcross; x++) {
        tile = positionRobot[y][x];
        if (tile === 3) {
          pos_x = y
          pos_y = x
          console.log(pos_x, pos_y);
          if(pos_x === old_pos_x && pox_y === old_pox_y) {

          }
          pos_info = document.getElementById("pos_info");
          ctx.fillStyle = colors[2];
          old_p
        }
        else {
          ctx.fillStyle = colors[1];
        }
        //Math.floor((Math.random() * 2) + 1)
        ctx.fillRect(Math.ceil(x * mapWidth), Math.ceil(y*mapHeight) , mapWidth, mapHeight);
      }
    }
    // ctx.save();
    // ctx.translate(x+w/2, y+h/2);
    // ctx.rotate(Math.PI/7);
    // ctx.translate(-x-w/2, -y-h/2);
    // if ((pos_x - 2) < 0 || (pos_y - 2) < 0) {
    //   ctx.drawImage( ship, 0,0, 166 , 170, (pos_x) * mapWidth, (pos_y) * mapHeight, 5*mapWidth, 5*mapHeight);
    // } else {
    //   ctx.drawImage( ship, 0,0, 166 , 170, (pos_x - 2) * mapWidth, (pos_y - 2) * mapHeight, 5*mapWidth, 5*mapHeight);
    // }

    // ctx.restore();
  }
  else {
    alert("Your browser doesn't support canvas")
  }
};

function mapGenerateInfo() {
  console.log("Width", blockWidth);
  console.log("Height", blockHeight);
  console.log("elementsDown", elementsDown);
  console.log("elementsAcross", elementsAcross);
  console.log("mapHeight:", mapHeight, "mapWidth:", mapWidth);
  console.log(positionRobot);
};
