<?php
include_once "./config.php";
$stmt = $pdo->query("SELECT prenotazione.*, sede.nome, sede.indirizzo FROM prenotazione, sede WHERE prenotazione.fk_sede = sede.id");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));


