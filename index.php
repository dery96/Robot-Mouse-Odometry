<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="src/css/style.css">
  <script src="src/js/status.js" charset="utf-8"></script>
  <link href="https://fonts.googleapis.com/css?family=Droid+Sans" rel="stylesheet">
  <link rel="icon" href="src/img/favicon.ico"/>
  <title>Control</title>
</head>
<body>
<header class="row col">
    <h1>Centrum Kontroli Robota <p>Projekt z Przedmiotu Systemy Wbudowane</p></h1>
</header>

<section class="row col flex-dir-row con">

  <div class="col info">

    <p style="text-align: left; white-space: pre-line; padding: 5px;">Wpisz: <span style="block"><input style="float: right; width: 80%;" type="text" name="" value=""></span>
    <br><strong>Akcja:</strong> Wyznacza tor ruchu
    <br>Pozycja: X: -- Y: --
    Czas Uruchomiony: 01h:10m:01s
    Przemierzona Odległośc: 1000 m
    Stan Kamery: ----
    Stan Akcelometra: ----
    <br><br></p>

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
    </div>
  </div>

  <div class="row col-8 flex-dir-row map">
    <div class="col row block flex-dir-row chomikos">
      <canvas class="col" id="canvasMap"></canvas>
    </div>
    <div class="col block">a</div>
  </div>

 </section>

 <footer class="row flex-dir-row flex-just-space-bet ali-ite-cent">
  <span>Copyright &copy; 2017</span> <span>dominikszyja.pl</span>
 </footer>
</body>
</html>
