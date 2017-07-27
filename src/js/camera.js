import {getData, getJSON, saveJSON} from './request';

export default function setCamera(action) {
  var camera = {
    textStatus: document.getElementById('cameraText'),
    container: document.getElementById('cameraContainer'),
    stream: document.getElementById('cameraStream'),
    degrees: null
  };
  var degrees = 0
  camera.textStatus.innerHTML = camera.degrees + "* stopnii"

  camera.stream.src = (document.location.href.slice(0, -1) + ':8081')
  console.log(document.location.href.slice(0, -1) + ':8081');

  camera.stream.style.width = camera.container.offsetWidth + 'px'
  camera.stream.style.height = camera.container.offsetHeight + 'px'

  document.getElementById('cameraLeft').onclick = function () {
    if (action.controlState) {
      action.action = "increase"
      document.getElementById('opis').innerHTML = "Wyslano Akcje Kamera Increase"
      console.log(action);
      saveJSON(action);
    } else {
      document.getElementById('opis').innerHTML = "Aby wykonac [Obrot], musisz byc w trybie kontroli"}
  }.bind(this)
  //
  //
  document.getElementById('cameraRight').onclick = function () {
    if (action.controlState) {
      action.action = "decrease"
      document.getElementById('opis').innerHTML = "Wyslano Akcje Kamera Decrease"
      console.log(action);
      saveJSON(action);
    } else {document.getElementById('opis').innerHTML = "Aby wykonac [Obrot], musisz byc w trybie kontroli"}
  }.bind(this)


}
