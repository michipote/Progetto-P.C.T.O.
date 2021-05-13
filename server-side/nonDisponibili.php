<?php
include_once "./config.php";
$sede = $_POST['sede'];
$sql = "
SELECT data_prenotazione AS data_disabilitata
FROM prenotazione
WHERE prenotazione.fk_sede = '$sede'
GROUP BY data_disabilitata
HAVING COUNT(*) >= 10
";
$stmt = $pdo->query($sql);

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));