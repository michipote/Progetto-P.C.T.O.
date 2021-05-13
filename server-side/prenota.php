<?php
include_once "./config.php";
//$fiscale = $_POST['fiscale'];
//$data_prenotazione = $_POST['data_prenotazione'];
//$id_sede = $_POST['sede'];
$fiscale = 'VGDLPP74S14A564T';
$data_prenotazione = '2021-05-20';
$id_sede = 1;

$sql = "
SELECT data_prenotazione AS data_disabilitata
FROM prenotazione
WHERE prenotazione.fk_sede = '$id_sede'
GROUP BY data_disabilitata
HAVING COUNT(*) >= 10";
$stmt = $pdo->query($sql);

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    if ($data_prenotazione === $row['data_disabilitata']) {
        echo '{ "risultato" : "failed", "motivo" : "Data con limite di prenotazioni raggiunto" }';
        exit(0);
    }
}

$data = [
    'fiscale' => $fiscale,
    'univoco' => substr(uniqid(uniqid(), true), -30),
    'data_prenotazione' => $data_prenotazione,
    'id_sede' => $id_sede
];

$sql = "INSERT INTO prenotazione (data, fiscale, univoco, data_prenotazione, stato, fk_sede) VALUES (CURRENT_DATE(), :fiscale, :univoco, :data_prenotazione, 0, :id_sede)";
$pdo->prepare($sql)->execute($data);
echo '{"risultato" : "succ"}';
