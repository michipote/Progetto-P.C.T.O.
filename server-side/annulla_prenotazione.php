<?php
include_once "./config.php";
$_POST = json_decode(file_get_contents("php://input"), true);
$data = [
    'codice_prenotazione' => $_POST['codice'],
];
$sql = "UPDATE prenotazione SET stato = 2 WHERE univoco = :codice_prenotazione AND stato = 0";
$pdo->prepare($sql)->execute($data);