<?php
include_once "./config.php";
$ritorno->codice = substr(uniqid(uniqid(), true), -30);
$_POST = json_decode(file_get_contents("php://input"), true);
$data = [
    'fiscale' => $_POST['fiscale'],
    'univoco' => $ritorno->codice,
    'data_prenotazione' => $_POST['data'],
    'sede' => $_POST['sede']
];
$sql = "INSERT INTO prenotazione (data, fiscale, univoco, data_prenotazione, stato, fk_sede) VALUES (current_date(), :fiscale, :univoco, :data_prenotazione, 0, :sede)";
$pdo->prepare($sql)->execute($data);
echo json_encode($ritorno);
