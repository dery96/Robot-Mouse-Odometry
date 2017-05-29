
window.onload= myFunction(); // Gdy HTML zostanie wczytany

function myFunction(a) {
  var input = document.getElementById ("controlSwitchOption");
  // input.onclick = checkState;
  console.log("eeeeee", a);
  // if (a == 1) {
  // setTimeout(mapGenerate(JSON.parse(name), 2));
  // }
  mapGenerate()
  //
  // if (a == 2) {
  //   setTimeout(mapGenerate(name1, 3), 3000);
  // }
  // if (a == 3) {
  //   setTimeout(mapGenerate(name2, 4), 3000);
  // }
  // if (a == 4) {
  //   setTimeout(mapGenerate(name3, 5), 3000);
  // }

  }


function infoDelay () {
  console.log("Delay ;)");
}

function checkState () {
  var input = document.getElementById ("controlSwitchOption")
  // console.log(input.checked);
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

function mapGenerate() {
  // var b = a;
  // var last = name;
  // na zerowym bedzie zawsze pozycja robota
  // var positionRobot = [[1, 1, 1, 2, 1, 1, 2, 1, 1, 1], [1, 0, 0, 1, 1, 0, 0, 1, 0, 1], [1, 0, 1, 1, 1, 0, 1, 1, 0, 0]];
  console.log("Log");
  // var positionRobot = JSON.parse(name);
  var positionRobot = name;
  // var arrej = JSON.parse()

  var blockWidth = document.getElementById("canvasMap").offsetWidth;
  var blockHeight = document.getElementById("canvasMap").offsetHeight;

  console.log("Width", blockWidth);
  console.log("Height", blockHeight);

  var elementsAcross = positionRobot[0].length;
  var elementsDown = positionRobot.length;

  console.log("elementsDown", elementsDown);
  console.log("elementsAcross", elementsAcross);

  var mapWidth = blockWidth / (elementsAcross);
  var mapHeight = blockHeight / (elementsDown);

  console.log("mapHeight:", mapHeight, "mapWidth:", mapWidth);

  var canvas = document.getElementById('canvasMap');

  // Canvas musi miec przydzielone okreslony width i height naszej ramki inaczej
  // wtedy ma wieksze rozmiary w htmlu zachowuje swoje rozmiary tutaj juz nie
  // dlatego to ponizej zachodzi

  canvas.width = blockWidth;
  canvas.height = blockHeight;

  // ctx.fillRect(j * mapWidth, i*mapHeight, mapWidth, mapHeight);
  var colors = ['#ffffff', '#333333', '#e41e65', '#455ec6'];

  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    // ctx.fillRect(1 *mapWidth, 1*mapHeight, mapWidth, mapHeight);

    for (var y = 0; y < elementsDown; y++) {
      for (var x = 0; x < elementsAcross; x++) {
        tile = positionRobot[y][x];
        ctx.fillStyle = colors[tile];
        ctx.fillRect(x * mapWidth, y*mapHeight, mapWidth, mapHeight);
      }

    }

    // console.log("chomikos", mapHeight);
  }
  else {
    alert("Your browser doesn't support canvas")
  }
  // myFunction(b);

  }
