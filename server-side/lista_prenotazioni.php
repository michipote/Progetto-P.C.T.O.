<?php
require './vendor/autoload.php';
include_once "config.php";

use League\Plates\Engine;

// Viene creato l'oggetto per la gestione dei template
// view e' la cartella che contiene il template file
// tpl e' l'estensione del template file
$templates = new Engine('./view', 'tpl');

// Query di inserimento preparata
$sql = "SELECT * FROM prenotazione";

// Invio la query al server MySQL
$stmt = $pdo->query($sql);

// Estraggo le righe di risposta che finiranno come vettori in $result
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if(isset($_SESSION['username'])){ // Se sei una utente che ha fatto il login
    $username = $_SESSION['username'];

    //Rendo un template che mi visualizza la tabella
    echo $templates->render('lista_prenotazioni', ['result' => $result, 'username' => $username]);
}


