<?php
include_once "./config.php";
$stmt = $pdo->query("SELECT nome, indirizzo FROM sede");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));