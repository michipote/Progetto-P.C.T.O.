<?php
include_once "./config.php";
$_POST = json_decode(file_get_contents("php://input"), true);
$fiscale = 'pio';//$_POST['fiscale'];
$password = 'dio';//$_POST['password'];

$sql = "SELECT fiscale ,password, tipo FROM account WHERE fiscale = :fiscale";
$stmt = $pdo->prepare($sql);
$stmt->execute(['fiscale' => $fiscale]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$result) {
    echo '{"result" : "failed"}';
    exit(0);
}
$pw_hash = $result['password'];

// Verifica se e' corretta
if (password_verify($password, $pw_hash)) {
    echo $result['tipo'];
} else {
    echo '{"result" : "failed"}';
}