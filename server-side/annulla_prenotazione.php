<?php
include_once "./config.php";
$fiscale = $_POST['fiscale'];
$univoco = $_POST['codice'];

$stmt = $pdo->query("SELECT fiscale FROM prenotazione WHERE fiscale = '$fiscale'");
if (count($stmt->fetchAll(PDO::FETCH_ASSOC)) === 0) {
    echo '{ "risultato" : "failed", "motivo" : "Nessun prenotazione registrata su questo codice fiscale"}';
    exit(0);
}

$stmt = $pdo->query("SELECT univoco FROM prenotazione WHERE univoco = '$univoco'");
if (count($stmt->fetchAll(PDO::FETCH_ASSOC)) === 0) {
    echo '{ "risultato" : "failed", "motivo" : "Codice univoco della prenotazione errato"}';
    exit(0);
}

$data = [
    'codice_prenotazione' => $univoco,
    'fiscale' => $fiscale
];
$sql = "UPDATE prenotazione SET stato = 2 WHERE univoco = :codice_prenotazione AND stato = 0 AND fiscale = :fiscale";
$pdo->prepare($sql)->execute($data);
echo '{ "risultato" : "succ"}';
