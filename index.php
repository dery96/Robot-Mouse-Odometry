<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="src/css/style.css">
  <link href="https://fonts.googleapis.com/css?family=Droid+Sans" rel="stylesheet">
  <link rel="icon" href="src/img/favicon.ico"/>
  <title>Control</title>
</head>
<body>
<header class="row col">
    <h1>Centrum Kontroli Robota <p>Projekt z Przedmiotu Systemy Wbudowane</p></h1>
</header>

  <section class="row flex-dir-row con">
    <div class="col" style="border: 1px solid;" id="conv">
        <div id="canvasParent">
                <canvas id="canvasBackground"></canvas>
                <canvas id="canvasMap"></canvas>
                <canvas id="canvasHover"></canvas>
                <canvas id="canvasClick"></canvas>
        </div>
    </div>

    <div class="col block map" id="cameraContainer" style="max-height: auto;"><img src="https://i.ytimg.com/vi/5QehNMzbCyY/mqdefault.jpg" id="cameraStream"></img></div>
  </section>

  <!-- BUTTONY ROZMIARU -->
  <section class="row col map con" style="align-items: center !important; justify-content: center !important; margin-top: 0px !important; border-top-style: 0px !important;">
    <div class="row col-12" style="margin-top: 10px !important">
      <p style="text-align: center;">
        <button type="button" name="0" class="myButton" id="sizeMapButtonx" style=" padding: 1px; width: 50px;">x</button>
        <button type="button" name="0.25" class="myButton" id="sizeMapButton25" style=" padding: 1px; width: 50px;">25%</button>
        <button type="button" name="0.5" class="myButton" id="sizeMapButton50" style=" padding: 1px; width: 50px;">50%</button>
        <button type="button" name="1" class="myButton" id="sizeMapButton100" style=" padding: 1px; width: 50px;">100%</button>
      </p>
    </div>
    <p style="text-align: left; margin-top: 10px;">
      <button type="button" name="button" class="myButton stop" id="stop" style="padding: 5px; width: 100px;">STOP</button>
    </p>
  </section>
  <!-- KONIEc -->
  <!-- KONIEC -->

<section class="row col flex-dir-row con" style="margin-top: 0 !important;">
  <div class="col-6 info" style="margin-top: 0px;">
    <p style="text-align: left; white-space: pre-line; padding: 5px;">Wpisz: <span style="block"><input style="width: 60%;" type="text" name="" value="" id="sendText"><button type="button" name="button" id="sendButton">Wyslij</button></span>
    <br><strong>Akcja:</strong> <span id="akcja">Tryb Obserwatora</span>
    <br>Pozycja: <span id="pos"></span>

    <p style="text-align: left">Stan Kamery: <span id="cameraText">Nadawanie</span><br><br></p>
    <p style="margin: 0 auto; text-align: center">
      <button type="button" name="button" class="myButton" id="cameraLeft" style="width: 160px; font-size: 13px">Skret w lewo</button>
      <button type="button" name="button" class="myButton" id="cameraRight" style="width: 160px; font-size: 13px">Skret w prawo</button>
    </p>
    <p style="text-align: left"><br>
    Stan Akcelometra: ----<br>
    Stan Zyroskopu: ----
    <br><br></p>
  </div>

  <div class="col-6 info">
    <span class="controle">
    <p><span style="padding-right: 5px">Tryb Eksploracji:</span>
    <input id="explorationSwitchOption" name="explorationSwitchOption" type="checkbox" style="transform: scale(1.5); "/>
    </p>
    </span>
    <span class="controle row flex-dir-row flex-just-space-bet">
    <p class="checkbox-area">Tryb Kontroli:
    <input id="controlSwitchOption" name="controlSwitchOption" type="checkbox" style="transform: scale(1.5); "/>
    </p>
    <p class="row flex-dir-row controle"><span class="stat">Status:</span><span id="circle"></span></p>
    </span>

    <div class="row col moves">
      <button type="button" name="button" class="myButton" id="up">&uarr;</button>
      <div class="chom row flex-dir-row">
      <button type="button" name="button" class="myButton" id="right">&larr;</button>
      <button type="button" name="button" class="myButton" id="left">&rarr;</button>

      </div>
      <button type="button" name="button" class="myButton" id="down">&darr;</button>
      <button type="button" name="button" class="myButton" id="clickTileButton" style="margin: 0 auto; padding: 5px; width: 100px; margin-top: 20px">Run</button>
    </div>
    <p style="text-align: right; font-size: 12px">Mysz: (<span id="pos_info">x, y</span>)</p>
    <p>Opis: <span id="opis"></span></p>
    <p style="">Zaznaczony Tile <span id="clickTile"></span></p>
    <br><br><br><br>
  </div>

 </section>



 <footer class="row flex-dir-row flex-just-space-bet ali-ite-cent">
  <span>Copyright &copy; 2017</span> <span>dominikszyja.pl</span>
 </footer>
 <script src="src/js/dist/status_bundle.js" charset="utf-8"></script>
 <!-- <script src="src/js/index.js" charset="utf-8"></script> -->
</body>
</html>
