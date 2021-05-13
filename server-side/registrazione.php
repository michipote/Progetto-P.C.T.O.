<?php
include_once "./config.php";
$_POST = json_decode(file_get_contents("php://input"), true);
$nome = $_POST['nome'];
$cognome = $_POST['cognome'];
$fiscale = $_POST['fiscale'];
$email = $_POST['email'];
$password = $_POST['password'];
$sql = "SELECT fiscale FROM account WHERE fiscale = '$fiscale'";
$stmt = $pdo->query($sql);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if(count($result) !== 0){
    echo '{"result" : "failed",
            "motivo" : "fiscale"}';
    exit(0);
}
$sql = "SELECT email FROM account WHERE email = '$email'";
$stmt = $pdo->query($sql);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if(count($result) !== 0){
    echo '{"result" : "failed",
            "motivo" : "email"}';
    exit(0);
}
$hash = password_hash($password, PASSWORD_DEFAULT);
$sql = "INSERT INTO account SET nome = :nome, cognome = :cognome, fiscale = :fiscale, password = :password, email = :email, tipo = :tipo";
$stmt = $pdo->prepare($sql);
$stmt->execute(['nome' => $nome, 'password' => $hash, 'cognome' => $cognome, 'fiscale' => $fiscale, 'email' => $email, 'tipo' => 0]);

echo '{"result" : "succ"}';