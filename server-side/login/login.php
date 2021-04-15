<?php
include_once "../config.php";

// Variabili valorizzate tramite POST
$username = $_POST['username'];
$password = $_POST['password'];

// Controllo
$sql = "SELECT username,password FROM utenti WHERE username = :username";
$stmt = $pdo->prepare($sql);
$stmt->execute(['username' => $username]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

// Lo username non e' presente nel database
if (!$result) {
    echo "<h2>Login non avenuto l'utente non esiste</h3>";
    // Si deve stare attenti a questo in quanto qualsiasi persona saprebbe se un utente e' registrato o meno
    exit(0);
}

// Se lo username e' presente, si controlla la password
$pw_hash = $result['password'];

// Verifica se e' corretta
if (password_verify($password, $pw_hash)) { // Password e' corretta
    $_SESSION['username'] = $username; // la sessione permette di avere delle informazioni condivise fra varie pagine
    // La pagina si occupa di controllare e sfruttare questa informazione

    // L'utente e' autenticato, far vedere le proprie prenotazioni
    echo "<h2>Login effettuato con successo</h3>";
} else { // Password e' sbagliata
    // Login fallito
    echo "<h2>Login Fallito</h3>";
}