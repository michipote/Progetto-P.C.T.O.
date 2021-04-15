<?php
include_once "../config.php";

// Variabili valorizzate tramite POST
$username = $_POST['username'];
$password = $_POST['password'];

// Controllo
$sql = "SELECT username FROM utenti WHERE username = '$username'";
$stmt = $pdo->query($sql);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if(count($result) !== 0){
    echo '<h2>Utente già registrato</h2><h3>Usare un username differente</h3>';
    exit(0);
}

// Query di inserimento preparata
$sql = "INSERT INTO utenti SET utenti.username = :username, password = :password";

// Password "criptata"
$hash = password_hash($password, PASSWORD_DEFAULT);

// Invio la query al server MySQL
$stmt = $pdo->prepare($sql);
$stmt->execute(['username' => $username, 'password' => $hash]);

echo '<h2>Registrazione effettuata con successo</h2>';