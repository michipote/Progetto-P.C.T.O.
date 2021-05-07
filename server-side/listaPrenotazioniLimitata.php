<?php
include_once "./config.php";
$_POST = json_decode(file_get_contents("php://input"), true);
$data = [
    'fiscale' => $_POST['codice'],
    'sede' => $_POST['sede']
];
$sql = "SELECT prenotazione.* 
FROM account, assegnato, sede, prenotazione
WHERE account.fiscale = :fiscale
AND account.id = assegnato.fk_staff 
AND sede.id = assegnato.fk_sede
AND sede.id = prenotazione.fk_sede
AND sede.id = :sede
AND prenotazione.stato = 0
AND prenotazione.data_prenotazione = CURRENT_DATE()";
$stmt = $pdo->prepare($sql)->execute($data);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));