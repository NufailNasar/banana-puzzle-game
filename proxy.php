<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Fetch the puzzle data from Banana API
$puzzleData = file_get_contents("http://marcconrad.com/uob/banana/api.php?out=json");

echo $puzzleData;
?>