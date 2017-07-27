<?php
function customError($errno, $errstr) {
  // this function will makes echo of every error
  echo "<b>Error:</b> [$errno] $errstr";
}
//set error handler
set_error_handler("customError");

if (isset($_GET["q"])) {
  // Check if we have parameter q being passed to the script through the URL
  $h = $_GET["q"];

  // Write $h to a file
  $fp = 'src/json/action.json';
  $fp = fopen($fp,"w");
  fwrite($fp, $h);
  fclose($fp);
}
?>
