<?php
include_once "./config.php";
$_POST = json_decode(file_get_contents("php://input"), true);
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