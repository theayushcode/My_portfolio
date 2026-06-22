<?php

$servername = "sql309.infinityfree.com";
$username = "if0_42179053";
$password = "Ayushnara123";
$database = "if0_42179053_portfolio_db";

$conn = mysqli_connect(
    $servername,
    $username,
    $password,
    $database
);

if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}

?>