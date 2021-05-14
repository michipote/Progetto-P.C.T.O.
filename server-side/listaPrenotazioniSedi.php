<?php
include_once "./config.php";
$id_sede = $_POST['id_sede'];
$sql = "SELECT fiscale, data, data_prenotazione
FROM prenotazione
WHERE prenotazione.fk_sede = '$id_sede'
AND prenotazione.stato = 0
AND prenotazione.data_prenotazione >= CURRENT_DATE()
";
$stmt = $pdo->query($sql);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));