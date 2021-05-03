<?php

//Esempio di file di configurazione
//Creare un file config.php e inserire le seguenti righe
//adattandole alla propria configurazione

// Dice a livello dello script che gli errori verranno mostrati
// e che non verrano loggati
ini_set('display_errors', 1);
ini_set('log_errors', 0);

// Parametri di configurazione
$host = '<your_host>';
$db = 'tamponi';
$user = '<your_username>';
$pass = '<your_password>';
$charset = 'utf8';

// Data Source Name
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

// Oggetto che rappresenta la connessione al database
$pdo = new PDO($dsn, $user, $pass);

// Trasforma tutti gli errori SQL in eccezioni PHP
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Su qualsiasi pagine parte la sessione
session_start();