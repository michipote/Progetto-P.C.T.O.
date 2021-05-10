<?php
include_once "./config.php";
$_POST = json_decode(file_get_contents("php://input"), true);
$sede = $_POST['sede'];
$sql = "SELECT fiscale, data, data_prenotazione
FROM prenotazione
WHERE prenotazione.fk_sede = '$sede'
AND prenotazione.stato = 0
AND prenotazione.data_prenotazione >= CURRENT_DATE()
";
$stmt = $pdo->query($sql);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));