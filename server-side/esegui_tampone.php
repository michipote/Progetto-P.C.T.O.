<?php
include_once "./config.php";
$univoco = $_POST['univoco'];
$id_operatore = $_POST['id_operatore'];
$id_sede = $_POST['id_sede'];

$stmt = $pdo->query("SELECT univoco, stato FROM prenotazione WHERE univoco = '$univoco' AND DATEDIFF(data_prenotazione, CURRENT_DATE()) = 0");
$result = $stmt->fetch(PDO::FETCH_ASSOC);
if ($result === false) {
    echo '{ "risultato" : "failed", 
    "motivo" : "Codice univoco della prenotazione errato o non presente nella giornata odierna" }';
    exit(0);
}
if($result['stato'] != 0){
    echo '{"risultato":"failed", "motivo":"Tampone già effettuato o prenotazione annullata"}';
    exit(0);
}

$data = [
    'codice_prenotazione' => $univoco,
    'id_personale' => $id_operatore,
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