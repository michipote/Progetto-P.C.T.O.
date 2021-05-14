<?php
include_once "./config.php";
$univoco = $_POST['codice'];
$id_personale = $_POST['personale'];
$id_sede = $_POST['sede'];

$stmt = $pdo->query("SELECT univoco FROM prenotazione WHERE univoco = '$univoco' AND DATEDIFF(data_prenotazione, CURRENT_DATE()) = 0");
if (count($stmt->fetchAll(PDO::FETCH_ASSOC)) === 0) {
    echo '{ "risultato" : "failed", 
    "motivo" : "Codice univoco della prenotazione errato o non presente nella giornata odierna" }';
    exit(0);
}

$data = [
    'codice_prenotazione' => $univoco,
    'id_personale' => $id_personale,
    'id_sede' => $id_sede
];
$sql = "
UPDATE prenotazione 
SET stato = 1, fk_personale = :id_personale 
WHERE univoco = :codice_prenotazione 
  AND stato = 0
  AND fk_sede = :id_sede";

$pdo->prepare($sql)->execute($data);
echo '{ "risultato" : "succ" }';