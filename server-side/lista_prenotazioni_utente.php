<?php
include_once "./config.php";
$fiscale = 'CHPLHG55E48A464T';
$stmt = $pdo->query("
SELECT prenotazione.fiscale, prenotazione.data, prenotazione.data_prenotazione, prenotazione.stato, sede.nome AS zona, sede.indirizzo
FROM prenotazione, sede
WHERE prenotazione.fiscale = '$fiscale' 
  AND prenotazione.fk_sede = sede.id
  ");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

