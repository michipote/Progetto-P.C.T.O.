<?php
include_once "../config.php";
require '../vendor/autoload.php';

use League\Plates\Engine;

// Viene creato l'oggetto per la gestione dei template
$templates = new Engine('../view', 'tpl');

// Variabili valorizzate tramite POST
$codice_prenotazione = $_POST['codice_prenotazione'];
$note = $_POST['note'];

// Query
$sql = 'UPDATE prenotazione SET eseguito = true, note = :note WHERE codice_prenotazione = :codice_prenotazione';

// Invio della query al database che la tiene in memoria (pronta per essere utilizzata)
$stmt = $pdo->prepare($sql);

// Esecuzione della query
$stmt->execute(['codice_prenotazione' => $codice_prenotazione, 'note' => $note]);

// Renderizzazione
echo $templates->render('esegui_tampone', ['codice_prenotazione' => $codice_prenotazione, 'note' => $note]);