<?php
include_once "./config.php";
$_POST = json_decode(file_get_contents("php://input"), true);
$data = [
    'codice_prenotazione' => $_POST['codice'],
    'personale' => $_POST['personale']
];
$sql = "UPDATE prenotazione SET stato = 1, fk_personale = :personale WHERE univoco = :codice_prenotazione AND stato = 0";
echo json_encode($pdo->prepare($sql)->execute($data));