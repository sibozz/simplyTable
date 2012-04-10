<?php
$host = "localhost";
$user = "root";
$pass = "123";
$db   = "simplyData";

$conn    = mysql_connect($host, $user, $pass);
$conn_db = mysql_select_db($db);
