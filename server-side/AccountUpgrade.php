<?php
include_once "./config.php";
$_POST = json_decode(file_get_contents("php://input"), true);
$data = [
    'fiscale' => $_POST['codice']
];
$sql = "UPDATE account SET tipo = 1 WHERE fiscale = :fiscale AND tipo = 0";
$pdo->prepare($sql)->execute($data);