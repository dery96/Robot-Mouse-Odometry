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
