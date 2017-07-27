// import saveJSON from './request'
// var action = {controlState: false, action: null}
export default function controlState (action, saveJSON) {
  var input = document.getElementById ("controlSwitchOption")
  var explorationInput = document.getElementById('explorationSwitchOption')
  var up = document.getElementById('up')
  var down = document.getElementById('down')
  var left = document.getElementById('left')
  var right = document.getElementById('right')

  input.onclick = function () {

    if (input.checked) {
      if (explorationInput.checked) {
        explorationInput.checked = false;
      }
      document.getElementById('circle').style.cssText = "background: green"
      document.getElementById('akcja').innerHTML = "Tryb kontroli samodzielnej"

      action.controlState = true
      action.exploration = false

      up.onclick = function () {
        if (action.controlState) {
          action.action = document.getElementById('up').id

          console.log(action);
          saveJSON(action);
          document.getElementById('opis').innerHTML = "Wyslano Akcje Gora"
        } else {document.getElementById('opis').innerHTML = "Aby wykonac [Run], musisz byc w trybie kontroli"}
      }

      down.onclick = function () {
        if (action.controlState) {
          action.action = document.getElementById('down').id

          console.log(action);
          saveJSON(action);
          document.getElementById('opis').innerHTML = "Wyslano Akcje Dol"
        } else {document.getElementById('opis').innerHTML = "Aby wykonac [Run], musisz byc w trybie kontroli"}
      }

      left.onclick = function () {
        if (action.controlState) {
          action.action = document.getElementById('left').id

          console.log(action);
          saveJSON(action);
          document.getElementById('opis').innerHTML = "Wyslano Akcje Lewo"
        } else {document.getElementById('opis').innerHTML = "Aby wykonac [Run], musisz byc w trybie kontroli"}
      }

      right.onclick = function () {
        if (action.controlState) {
          action.action = document.getElementById('right').id

          console.log(action);
          saveJSON(action);
          document.getElementById('opis').innerHTML = "Wyslano Akcje Prawo"
        } else {document.getElementById('opis').innerHTML = "Aby wykonac [Run], musisz byc w trybie kontroli"}
      }
    } else {
      action.controlState = false
      document.getElementById('akcja').innerHTML = "Tryb Obserwatora";
      document.getElementById('circle').style.cssText = "background: rgb(147, 21, 21)"
    }

  }.bind(this)

  explorationInput.onclick = function () {
    if (explorationInput.checked) {
      if (input.checked) {
        input.checked = false;
        document.getElementById('circle').style.cssText = "background: rgb(147, 21, 21)"
      }
      document.getElementById('akcja').innerHTML = "Tryb Eksploracji";
      action.exploration = true
      action.controlState = false
      console.log(action);
      saveJSON(action);
    }
  }

  // }.bind(this)
}
