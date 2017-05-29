
<?php
  if (isset($_GET['map']) && $_GET['map'] == '12afqeDEf') {
    $file_content = file_get_contents('map.json');
    echo json_encode($file_content);
  }
?>
