<?php
include_once "./config.php";
$fiscale = $_POST['fiscale'];
$data_prenotazione = $_POST['data_prenotazione'];
$id_sede = $_POST['id_sede'];

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

$univoco = substr(uniqid(uniqid(), true), -30);
$data = [
    'fiscale' => $fiscale,
    'univoco' => $univoco,
    'data_prenotazione' => $data_prenotazione,
    'id_sede' => $id_sede
];

$sql = "INSERT INTO prenotazione (data, fiscale, univoco, data_prenotazione, stato, fk_sede) VALUES (CURRENT_DATE(), :fiscale, :univoco, :data_prenotazione, 0, :id_sede)";
$pdo->prepare($sql)->execute($data);

echo json_encode(['risultato' => 'succ', 'univoco' => $univoco]);
