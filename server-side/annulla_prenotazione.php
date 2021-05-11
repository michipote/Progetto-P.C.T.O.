<?php
include_once "./config.php";
$_POST = json_decode(file_get_contents("php://input"), true);
$data = [
    'codice_prenotazione' => $_POST['codice'],
    'fiscale' => $_POST['fiscale']
];
$sql = "UPDATE prenotazione SET stato = 2 WHERE univoco = :codice_prenotazione AND stato = 0 AND fiscale = :fiscale";
echo json_encode($pdo->prepare($sql)->execute($data));
