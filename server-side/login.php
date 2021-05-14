<?php
include_once "./config.php";
$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM account WHERE email = '$email'";
$stmt = $pdo->query($sql);
$result = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$result) {
    echo '{"result" : "failed","motivo" : "Email o password errati"}';
    exit(0);
}
$pw_hash = $result['password'];

if (!password_verify($password, $pw_hash)) {
    echo '{"result" : "failed", "motivo" : "Email o password errati"}';
    exit(0);
}

if ($result['tipo'] == 1) {
    $id_account = $result['id'];
    $sql = "SELECT sede.id AS id_sede,nome, indirizzo, data AS data_assegnazione
                FROM sede, assegnato
                WHERE sede.id = assegnato.fk_sede
                  AND assegnato.fk_staff = '$id_account'
                ORDER BY assegnato.data DESC";
    $stmt = $pdo->query($sql);
    $result['sede'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
unset($result['fiscale']);
unset($result['email']);
unset($result['password']);
echo json_encode($result);