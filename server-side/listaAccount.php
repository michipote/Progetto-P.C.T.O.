<?php
include_once "./config.php";
$stmt = $pdo->query("SELECT * FROM account WHERE tipo");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));