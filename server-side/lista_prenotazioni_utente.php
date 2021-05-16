<?php
include_once "./config.php";
$fiscale = $_POST['fiscale'];
$stmt = $pdo->query("
SELECT prenotazione.data, prenotazione.data_prenotazione, prenotazione.stato, sede.nome, sede.indirizzo
FROM prenotazione, sede
WHERE prenotazione.fiscale = '$fiscale'
  AND prenotazione.fk_sede = sede.id
  ");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

