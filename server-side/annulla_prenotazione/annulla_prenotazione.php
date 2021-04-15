<?php
require '../vendor/autoload.php';
include_once "../config.php";

use League\Plates\Engine;

// Viene creato l'oggetto per la gestione dei template
// view e' la cartella che contiene il template file
// tpl e' l'estensione del template file
$templates = new Engine('../view', 'tpl');

// Variabili valorizzate tramite POST
$codice_prenotazione = $_POST['codice_prenotazione'];

// Query di inserimento preparata
$sql_check = "SELECT eseguito, annullato FROM prenotazione WHERE codice_prenotazione = '$codice_prenotazione'";
$sql_update = "UPDATE prenotazione SET annullato = 1 WHERE codice_prenotazione = :codice_prenotazione";

// Invio la query al server MySQL
$stmt_check = $pdo->query($sql_check);

// Estraggo le righe di risposta che finiranno come vettori in $result
$result = $stmt_check->fetchAll(PDO::FETCH_ASSOC);

// Controllo
if(count($result) === 0){
    echo '<h2>Prenotazione inesistente</h2>';
    exit(0);
}
if($result[0]['eseguito']){
    echo '<h2>Il tampone è stato già eseguito</h2>';
    exit(0);
}
if($result[0]['annullato']){
    echo '<h2>La prenotazione è stata già annullata</h2>';
    exit(0);
}

// Aggiorna il database
$stmt_update = $pdo->prepare($sql_update);
$stmt_update->execute(['codice_prenotazione' => $codice_prenotazione]);

echo '<h2>Prenotazione annullato con successo</h2>';