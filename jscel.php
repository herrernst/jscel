<?php
$logfilename = "jscel.csv";
$ajaxRefUrl = "http://www.example.com/";
if ($_SERVER['REQUEST_METHOD'] === "GET") {
  $err = array(date("r"), $_SERVER['HTTP_REFERER'], $_SERVER['HTTP_USER_AGENT'], $_GET["script"], $_GET["msg"], $_GET["num"], $_GET["ref"], $_GET["timestamp"], $_GET["extra"]);
} else if ($_SERVER['REQUEST_METHOD'] === "POST") {
  header("Access-Control-Allow-Origin: ".$ajaxRefUrl);
  $err = array(date("r"), $_SERVER['HTTP_REFERER'], $_SERVER['HTTP_USER_AGENT'], $_POST["script"], $_POST["msg"], $_POST["num"], $_POST["ref"], $_POST["timestamp"], $_POST["extra"]);
}
$f = fopen($logfilename, "a");
fputcsv($f, $err, ";");
header( 'Content-type: image/gif' );
# The transparent, beacon image
echo chr(71).chr(73).chr(70).chr(56).chr(57).chr(97).
     chr(1).chr(0).chr(1).chr(0).chr(128).chr(0).
     chr(0).chr(0).chr(0).chr(0).chr(0).chr(0).chr(0).
     chr(33).chr(249).chr(4).chr(1).chr(0).chr(0).
     chr(0).chr(0).chr(44).chr(0).chr(0).chr(0).chr(0).
     chr(1).chr(0).chr(1).chr(0).chr(0).chr(2).chr(2).
     chr(68).chr(1).chr(0).chr(59);
?>
